import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaletteDesignToken } from '@primeng/themes/types';
import { IsJsonPipe } from '../is-json.pipe';
import {hexToRgb, mixRGB, PaletteKey, RGB, rgbToHex} from '../palette.helpers';

@Component({
  selector: 'png-palette-section',
  imports: [CommonModule, FormsModule, IsJsonPipe],
  templateUrl: './palette-section.component.html',
  styleUrl: './palette-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaletteSectionComponent {
  @Input({ required: true }) palette?: PaletteDesignToken;
  @Input({ required: true }) keyBase?: string;
  @Input({ required: true }) header?: string;
  protected readonly PaletteKey = PaletteKey;

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
