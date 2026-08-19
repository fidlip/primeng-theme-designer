import { Injectable } from '@angular/core';
import { Json } from './json.model';
import { detailedDiff } from 'deep-object-diff';
import Material from '@primeng/themes/material';
import { BehaviorSubject, map } from 'rxjs';
import { TreeNode } from 'primeng/api';
import { buildTokenTree, flattenTokenTree, ThemeTokenOption } from './token-tree-builder';
import { MaterialBaseDesignTokens } from '@primeng/themes/material/base';

@Injectable({
  providedIn: 'root'
})
export class ThemeStateService {
  readonly availableTokensTree = new BehaviorSubject<TreeNode[]>([]);
  readonly availableTokens = this.availableTokensTree.pipe(
    map((tokenTree: TreeNode[]): ThemeTokenOption[] => flattenTokenTree(tokenTree))
  );

  setTheme(theme: MaterialBaseDesignTokens): void {
    this.availableTokensTree.next(buildTokenTree(theme));
  }

  /**
   * Generates a downloadable theme file
   * @param themeConfig The theme configuration
   * @returns A blob URL for the generated file
   */
  private generateThemeBlob(themeConfig: Json): string {
    let themeContent = `import { definePreset } from '@primeng/themes';\n`;
    themeContent += `import Material from '@primeng/themes/material';\n\n`;
    themeContent += `export const MyPreset = definePreset(Material, ${JSON.stringify(themeConfig, null, 2)
      .replace(/"([^"]+)":/g, "$1:")
      .replace(/"__REF__([^"]+)"/g, "{$1}")
    });\n`;

    const blob = new Blob([themeContent], { type: 'text/plain' });
    return URL.createObjectURL(blob);
  }

  private generateThemeDiffBlob(themeConfig: Json): string {
    const diff = detailedDiff(Material, themeConfig);
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

  getSavedTheme(): MaterialBaseDesignTokens | undefined {
    const savedTheme = localStorage.getItem('primeng-theme-designer-saved-theme');
    if (!savedTheme) {
      return undefined;
    }
    try {
      return JSON.parse(savedTheme) as MaterialBaseDesignTokens;
    } catch {
      this.clearThemeInLocalStorage();
      return undefined;
    }
  }

  clearThemeInLocalStorage(): void {
    localStorage.removeItem('primeng-theme-designer-saved-theme');
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
