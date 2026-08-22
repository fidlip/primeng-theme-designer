import { Injectable } from '@angular/core';
import { Json, JsonPropertyType } from './json.model';
import { detailedDiff } from 'deep-object-diff';
import { BehaviorSubject, map } from 'rxjs';
import { TreeNode } from 'primeng/api';
import { buildTokenTree, flattenTokenTree, ThemeTokenOption } from './token-tree-builder';
import { PresetOption } from './preset-option.model';
import { cloneTheme } from './theme-clone.helper';
import { countChangedLeaves } from './theme-diff.helper';

@Injectable({
  providedIn: 'root'
})
export class ThemeStateService {
  readonly availableTokensTree = new BehaviorSubject<TreeNode[]>([]);
  readonly availableTokens = this.availableTokensTree.pipe(
    map((tokenTree: TreeNode[]): ThemeTokenOption[] => flattenTokenTree(tokenTree))
  );

  /** The stock preset the working theme was derived from; used as the export/diff baseline. */
  private basePreset?: PresetOption;

  /** The stock preset (`basePreset`, before the host app's own customizations or any saved/local edits); used to detect and undo per-field edits. */
  private defaultTheme?: Json;

  /** The theme as it was last pushed live via `Theme.setTheme` (either on load or via the Apply button); used to count pending unapplied edits. */
  private lastAppliedTheme?: Json;

  /** The theme as the host app itself defines it (`initialTheme`, before any locally-saved edits are merged in); used to count changes for the Download badge. */
  private appLoadTheme?: Json;

  setTheme(theme: Json): void {
    this.availableTokensTree.next(buildTokenTree(theme));
  }

  /**
   * Sets the baseline theme that per-field reset buttons compare against and restore from.
   * Must be the raw stock preset (`basePreset.preset`), not the host app's `initialTheme` -
   * otherwise reverting a field would only undo the designer's own edits, not the app's
   * customizations layered onto the stock preset via `definePreset`. Clones the given theme so
   * later in-place edits to the working theme can't also mutate this baseline.
   */
  setDefaultTheme(theme: Json): void {
    this.defaultTheme = cloneTheme(theme);
  }

  /** Looks up the default value at a dot-path (e.g. `"components.button.root.paddingX"`) in the baseline theme set via `setDefaultTheme`. */
  getDefaultValue(path: string): JsonPropertyType | undefined {
    if (!this.defaultTheme) {
      return undefined;
    }
    let current: unknown = this.defaultTheme;
    for (const segment of path.split('.')) {
      if (current === null || typeof current !== 'object') {
        return undefined;
      }
      current = (current as Record<string, unknown>)[segment];
    }
    return current as JsonPropertyType | undefined;
  }

  /** Records the theme snapshot most recently pushed live, so `countChangesSinceLastApply` has a baseline. Clones defensively, same as `setDefaultTheme`. */
  setLastAppliedTheme(theme: Json): void {
    this.lastAppliedTheme = cloneTheme(theme);
  }

  /** Number of leaf token values that differ from the theme's default (baseline set via `setDefaultTheme`). */
  countChangesFromDefault(theme: Json): number {
    return this.defaultTheme ? countChangedLeaves(theme, this.defaultTheme) : 0;
  }

  /** Records the theme snapshot as the host app itself defines it, so `countChangesFromAppLoad` has a baseline. Clones defensively, same as `setDefaultTheme`. */
  setAppLoadTheme(theme: Json): void {
    this.appLoadTheme = cloneTheme(theme);
  }

  /** Number of leaf token values that differ from what was last pushed live (baseline set via `setLastAppliedTheme`). */
  countChangesSinceLastApply(theme: Json): number {
    return this.lastAppliedTheme ? countChangedLeaves(theme, this.lastAppliedTheme) : 0;
  }

  /**
   * Number of leaf token values that differ from the theme as the host app itself defines it
   * (baseline set via `setAppLoadTheme`, unaffected by any locally-saved edits merged onto it) -
   * so a value restored from local storage still counts, since it isn't in that definition yet.
   */
  countChangesFromAppLoad(theme: Json): number {
    return this.appLoadTheme ? countChangedLeaves(theme, this.appLoadTheme) : 0;
  }

  /**
   * Sets the stock preset (e.g. Material, Aura, Lara, Nora) that `downloadThemeFile` /
   * `downloadThemeDiffFile` should use as their baseline.
   */
  setBasePreset(basePreset: PresetOption): void {
    this.basePreset = basePreset;
  }

  /**
   * Generates a downloadable theme file
   * @param themeConfig The theme configuration
   * @returns A blob URL for the generated file
   */
  private generateThemeBlob(themeConfig: Json): string {
    const { importName, importPath } = this.getBasePresetImport();
    let themeContent = `import { definePreset } from '@primeng/themes';\n`;
    themeContent += `import ${importName} from '${importPath}';\n\n`;
    themeContent += `export const MyPreset = definePreset(${importName}, ${JSON.stringify(themeConfig, null, 2)
      .replace(/"([^"]+)":/g, "$1:")
      .replace(/"__REF__([^"]+)"/g, "{$1}")
    });\n`;

    const blob = new Blob([themeContent], { type: 'text/plain' });
    return URL.createObjectURL(blob);
  }

  private generateThemeDiffBlob(themeConfig: Json): string {
    const diff = detailedDiff(this.getBasePreset().preset, themeConfig);
    const diffJson = mergeJson(diff.added as Json, diff.updated as Json);

    const themeContent = `export const PngThemeDiff = ${JSON.stringify(diffJson, null, 2)
      .replace(/"([^"]+)":/g, "$1:")
      .replace(/"__REF__([^"]+)"/g, "{$1}")
    };\n`;

    const blob = new Blob([themeContent], { type: 'text/plain' });
    return URL.createObjectURL(blob);
  }

  downloadThemeFile(themeConfig: Json): void {
    const themeBlob = this.generateThemeBlob(themeConfig);
    this.downloadFile('theme.ts', themeBlob);
  }

  downloadThemeDiffFile(themeConfig: Json): void {
    const themeDiffBlob = this.generateThemeDiffBlob(themeConfig);
    this.downloadFile('theme-diff.ts', themeDiffBlob);
  }

  /**
   * Generate a downloadable theme file
   */
  private downloadFile(fileName: string, blobUrl: string): void {
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    window.URL.revokeObjectURL(blobUrl);
    document.body.removeChild(link);
  }

  saveToLocalStorage(themeJson: Json): void {
    localStorage.setItem('primeng-theme-designer-saved-theme', JSON.stringify(themeJson));
  }

  getSavedTheme(): Json | undefined {
    const savedTheme = localStorage.getItem('primeng-theme-designer-saved-theme');
    if (!savedTheme) {
      return undefined;
    }
    try {
      return JSON.parse(savedTheme) as Json;
    } catch {
      this.clearThemeInLocalStorage();
      return undefined;
    }
  }

  clearThemeInLocalStorage(): void {
    localStorage.removeItem('primeng-theme-designer-saved-theme');
  }

  private getBasePreset(): PresetOption {
    if (!this.basePreset) {
      throw new Error('ThemeStateService: basePreset is not set. Pass a `basePreset` input to <primeng-theme-designer> before exporting a theme.');
    }
    return this.basePreset;
  }

  private getBasePresetImport(): { importName: string; importPath: string } {
    const { name } = this.getBasePreset();
    return {
      importName: name.charAt(0).toUpperCase() + name.slice(1),
      importPath: `@primeng/themes/${name}`,
    };
  }
}

function mergeJson(base: Json, override: Json): Json {
  const result: Json = { ...base };
  for (const [key, value] of Object.entries(override)) {
    const current = result[key];
    result[key] = isPlainJson(current) && isPlainJson(value)
      ? mergeJson(current, value)
      : value;
  }
  return result;
}

function isPlainJson(value: unknown): value is Json {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
