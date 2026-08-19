import { Pipe, PipeTransform } from '@angular/core';
import { isPalette } from './palette.helpers';
import { PaletteDesignToken } from '@primeng/themes/types';

@Pipe({ name: 'isPalette', pure: true })
export class IsPalettePipe implements PipeTransform {
  transform(value: unknown): value is PaletteDesignToken {
    return isPalette(value);
  }
}
