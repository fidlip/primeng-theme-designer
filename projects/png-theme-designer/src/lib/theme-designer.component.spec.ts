import { cloneTheme } from './theme-clone.helper';

describe('cloneTheme', () => {
  it('deep-clones PrimeNG presets while preserving css callbacks', () => {
    const css = ({ dt }: { dt: (token: string) => string }) => `.test { color: ${dt('primary.color')}; }`;
    const source = {
      primitive: { blue: { 500: '#336699' } },
      components: { accordion: { css } },
    };

    const clone = cloneTheme(source);

    expect(clone).not.toBe(source);
    expect(clone.primitive).not.toBe(source.primitive);
    expect(clone.primitive.blue).not.toBe(source.primitive.blue);
    expect(clone.components.accordion.css).toBe(css);
    expect(clone.components.accordion.css({ dt: token => `{${token}}` }))
      .toBe('.test { color: {primary.color}; }');
  });

  it('supports cyclic objects', () => {
    const source: { self?: unknown } = {};
    source.self = source;

    const clone = cloneTheme(source);

    expect(clone).not.toBe(source);
    expect(clone.self).toBe(clone);
  });
});
