import { collapseLightDark, formatLightDarkValue, parseLightDarkValue } from './light-dark-value.helper';

describe('light-dark value helper', () => {
  it('splits a light-dark() pair of bare token references', () => {
    expect(parseLightDarkValue('light-dark({surface.100}, {surface.800})')).toEqual({
      light: '{surface.100}',
      dark: '{surface.800}',
    });
  });

  it('splits a light-dark() pair of literal colors', () => {
    expect(parseLightDarkValue('light-dark(#fff, #000)')).toEqual({ light: '#fff', dark: '#000' });
  });

  it('keeps a nested function call in one half intact', () => {
    expect(parseLightDarkValue('light-dark({primary.50}, color-mix(in srgb, {primary.color}, transparent 96%))')).toEqual({
      light: '{primary.50}',
      dark: 'color-mix(in srgb, {primary.color}, transparent 96%)',
    });
  });

  it('returns null for a plain literal, a single reference, or a non-light-dark function', () => {
    expect(parseLightDarkValue('0.5rem')).toBeNull();
    expect(parseLightDarkValue('{primary.color}')).toBeNull();
    expect(parseLightDarkValue('color-mix(in srgb, {a}, {b})')).toBeNull();
  });

  it('returns null for malformed or wrong-arity light-dark() calls', () => {
    expect(parseLightDarkValue('light-dark(#fff)')).toBeNull();
    expect(parseLightDarkValue('light-dark(#fff, #000, #ccc)')).toBeNull();
    expect(parseLightDarkValue('light-dark(#fff, #000')).toBeNull();
  });

  it('formats a pair back into a light-dark() call', () => {
    expect(formatLightDarkValue({ light: '{surface.100}', dark: '{surface.800}' }))
      .toBe('light-dark({surface.100}, {surface.800})');
  });

  it('collapses a plain light-dark() pair to the picked half', () => {
    expect(collapseLightDark('light-dark(#e2e8f0, #1e293b)', false)).toBe('#e2e8f0');
    expect(collapseLightDark('light-dark(#e2e8f0, #1e293b)', true)).toBe('#1e293b');
  });

  it('collapses a light-dark() nested inside another light-dark() half', () => {
    const value = 'light-dark(light-dark(#f1f5f9, #f4f4f5), light-dark(#1e293b, #27272a))';
    expect(collapseLightDark(value, false)).toBe('#f1f5f9');
    expect(collapseLightDark(value, true)).toBe('#27272a');
  });

  it('collapses a light-dark() nested inside a wrapping function', () => {
    expect(collapseLightDark('color-mix(in srgb, light-dark(#BFDBFE, #cbe2fe), transparent 96%)', false))
      .toBe('color-mix(in srgb, #BFDBFE, transparent 96%)');
    expect(collapseLightDark('color-mix(in srgb, light-dark(#BFDBFE, #cbe2fe), transparent 96%)', true))
      .toBe('color-mix(in srgb, #cbe2fe, transparent 96%)');
  });

  it('collapses more than one independent light-dark() occurrence in the same string', () => {
    expect(collapseLightDark('1px solid light-dark(#fff, #000), 2px light-dark(#aaa, #bbb)', true))
      .toBe('1px solid #000, 2px #bbb');
  });

  it('leaves a value with no light-dark() untouched', () => {
    expect(collapseLightDark('#e2e8f0', false)).toBe('#e2e8f0');
    expect(collapseLightDark('color-mix(in srgb, #10b981, transparent 96%)', true))
      .toBe('color-mix(in srgb, #10b981, transparent 96%)');
  });
});
