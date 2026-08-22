import { Injectable } from '@angular/core';
import { Json } from './json.model';
import { detailedDiff } from 'deep-object-diff';
import { BehaviorSubject, map } from 'rxjs';
import { TreeNode } from 'primeng/api';
import { buildTokenTree, flattenTokenTree, ThemeTokenOption } from './token-tree-builder';
import { PresetOption } from './preset-option.model';

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

  setTheme(theme: Json): void {
    this.availableTokensTree.next(buildTokenTree(theme));
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
    let themeContent = `import { definePreset } from '@primeuix/themes';\n`;
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
      importPath: `@primeuix/themes/${name}`,
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
