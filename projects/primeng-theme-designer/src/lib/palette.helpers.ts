import {PaletteDesignToken} from '@primeng/themes/types';

export enum PaletteKey {
  _50 = 50,
  _100 = 100,
  _200 = 200,
  _300 = 300,
  _400 = 400,
  _500 = 500,
  _600 = 600,
  _700 = 700,
  _800 = 800,
  _900 = 900,
  _950 = 950,
}

export function isPalette(x: unknown): x is PaletteDesignToken {
  if (typeof x !== 'object' || x === null) {
    return false;
  }
  const obj = x as Record<string, unknown>;
  return Object.values(PaletteKey)
    .filter((v) => typeof v === 'number')
    .every((key) => typeof obj[key] === 'string');
}

export type RGB = { r: number; g: number; b: number };

export function hexToRgb(hexColor: string): RGB {
  let hex = hexColor.replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((c) => c + c)
      .join('');
  }
  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16)
  };
}

export function rgbToHex({ r, g, b }: RGB): string {
  const toHex = (n: number) => {
    return Math.round(n).toString(16).padStart(2, '0');
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function mixRGB(a: RGB, b: RGB, t: number): RGB {
  return {
    r: a.r + (b.r - a.r) * t,
    g: a.g + (b.g - a.g) * t,
    b: a.b + (b.b - a.b) * t
  };
}
