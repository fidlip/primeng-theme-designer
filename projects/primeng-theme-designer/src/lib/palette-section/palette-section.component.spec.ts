import { PaletteDesignToken } from '@primeng/themes/types';
import { PaletteSectionComponent } from './palette-section.component';

describe('PaletteSectionComponent', () => {
  it('generates only numeric PrimeNG palette shades', () => {
    const component = new PaletteSectionComponent();
    const palette = {} as PaletteDesignToken;

    component.updatePalette(palette, '#336699');

    expect(palette[500]).toBe('#336699');
    expect(palette[50]).toMatch(/^#[0-9a-f]{6}$/);
    expect(palette[950]).toMatch(/^#[0-9a-f]{6}$/);
    expect((palette as Record<string, unknown>)['_50']).toBeUndefined();
  });
});
