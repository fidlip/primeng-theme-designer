import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaletteDesignToken } from '@primeng/themes/types';
import { IsJsonPipe } from '../is-json.pipe';
import {hexToRgb, isPalette, mixRGB, PaletteKey, RGB, rgbToHex} from '../palette.helpers';
import { PtdTranslatePipe } from '../i18n/translate.pipe';
import { ThemeStateService } from '../theme-state.service';

const PALETTE_KEYS = Object.values(PaletteKey).filter((key): key is PaletteKey => typeof key === 'number');

@Component({
  selector: 'ptd-palette-section',
  imports: [CommonModule, FormsModule, IsJsonPipe, PtdTranslatePipe],
  templateUrl: './palette-section.component.html',
  styleUrl: './palette-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaletteSectionComponent {
  @Input({ required: true }) palette?: PaletteDesignToken;
  @Input({ required: true }) keyBase?: string;
  @Input({ required: true }) header?: string;
  protected readonly PaletteKey = PaletteKey;

  private readonly themeState = inject(ThemeStateService);

  /** Whether any shade of the palette differs from the theme's default; drives the reset button's visibility. */
  protected get showResetButton(): boolean {
    const defaultPalette = this.getDefaultPalette();
    if (!this.palette || !defaultPalette) {
      return false;
    }
    return PALETTE_KEYS.some(key => this.palette![key] !== defaultPalette[key]);
  }

  /** "current → default" tooltip shown on the reset button, based on the base (500) shade; only meaningful while `showResetButton` is true. */
  protected get resetTooltip(): string {
    const defaultPalette = this.getDefaultPalette();
    const currentBase = this.palette?.[PaletteKey._500] ?? '';
    const defaultBase = defaultPalette?.[PaletteKey._500] ?? '';
    return `${currentBase} → ${defaultBase}`;
  }

  protected resetToDefault(event: Event): void {
    event.preventDefault();
    const defaultPalette = this.getDefaultPalette();
    if (!this.palette || !defaultPalette) {
      return;
    }
    for (const key of PALETTE_KEYS) {
      this.palette[key] = defaultPalette[key];
    }
  }

  private getDefaultPalette(): PaletteDesignToken | undefined {
    if (!this.keyBase) {
      return undefined;
    }
    const defaultValue = this.themeState.getDefaultValue(this.keyBase);
    return isPalette(defaultValue) ? defaultValue : undefined;
  }

  /**
   * Updates the theme palette with the selected base color
   */
  updatePalette(palette: PaletteDesignToken, middleValue: string | object): void {
    let baseHex = typeof middleValue === 'object' ? ((middleValue as any).hex as string) : (middleValue as string);

    palette[PaletteKey._500] = baseHex;

    const baseRgb = hexToRgb(baseHex);
    const white: RGB = { r: 255, g: 255, b: 255 };
    const black: RGB = { r: 0, g: 0, b: 0 };

    const paletteKeys = Object.values(PaletteKey).filter((key): key is PaletteKey => typeof key === 'number');
    for (const key of paletteKeys) {
      if (key === PaletteKey._500) {
        continue;
      }
      const pos = Number(key);
      let outRgb: RGB;
      if (pos < PaletteKey._500) {
        const t = pos / PaletteKey._500;
        outRgb = mixRGB(white, baseRgb, t);
      } else {
        const t = (pos - PaletteKey._500) / PaletteKey._500;
        outRgb = mixRGB(baseRgb, black, t);
      }
      palette[key] = rgbToHex(outRgb);
    }
  }

  /**
   * Handles color changes from the color picker
   * @param color The new color
   */
  onColorChange(color: string): void {
    if (!this.palette) {
      return;
    }
    this.updatePalette(this.palette, color);
  }
}
