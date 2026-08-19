import { cloneTheme } from './theme-clone.helper';
import { EventEmitter } from '@angular/core';
import { ThemeDesignerComponent } from './theme-designer.component';

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

describe('ThemeDesignerComponent visibility', () => {
  it('collapses itself and emits the public closed event', () => {
    const component = Object.create(ThemeDesignerComponent.prototype) as ThemeDesignerComponent;
    component.closed = new EventEmitter<void>();
    let closeEvents = 0;
    component.closed.subscribe(() => closeEvents++);

    component.onClose();

    expect((component as unknown as {collapsed: boolean}).collapsed).toBeTrue();
    expect(closeEvents).toBe(1);
  });
});
