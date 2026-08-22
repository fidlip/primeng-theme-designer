export interface LightDarkValue {
  light: string;
  dark: string;
}

const LIGHT_DARK_REGEX = /^light-dark\(([\s\S]*)\)$/;

/**
 * Splits a `light-dark(light, dark)` value into its two halves, purely by structure — the
 * arguments aren't checked for being actual colors, so `light-dark({a}, {b})` (bare token
 * references) matches just as well as `light-dark(#fff, #000)`. Anything else (a literal, a
 * single `{ref}`, another CSS function, a `light-dark(...)` with more or fewer than two
 * top-level arguments) returns `null` so callers fall back to plain single-value editing.
 */
export function parseLightDarkValue(value: string): LightDarkValue | null {
  const match = value.trim().match(LIGHT_DARK_REGEX);
  if (!match) {
    return null;
  }
  const parts = splitTopLevelArgs(match[1]);
  return parts.length === 2 ? { light: parts[0].trim(), dark: parts[1].trim() } : null;
}

export function formatLightDarkValue({ light, dark }: LightDarkValue): string {
  return `light-dark(${light}, ${dark})`;
}

/**
 * Collapses every `light-dark(light, dark)` occurrence in a (fully reference-resolved) value
 * down to just its `light` or `dark` half, picked by `darkMode` — including ones nested inside
 * another `light-dark(...)` or a wrapping function like `color-mix(...)`, and more than one
 * independent occurrence in the same string. Used to turn a resolved preview into a single
 * concrete color for the current mode instead of leaving the CSS function for the browser to
 * evaluate (which previews can't rely on, since they aren't inside the live app's own DOM).
 */
export function collapseLightDark(value: string, darkMode: boolean): string {
  const start = value.indexOf('light-dark(');
  if (start === -1) {
    return value;
  }

  const argsStart = start + 'light-dark('.length;
  let depth = 1;
  let i = argsStart;
  for (; i < value.length && depth > 0; i++) {
    if (value[i] === '(') {
      depth++;
    } else if (value[i] === ')') {
      depth--;
    }
  }
  if (depth !== 0) {
    return value;
  }
  const argsEnd = i - 1;
  const parts = splitTopLevelArgs(value.slice(argsStart, argsEnd));

  const replacement = parts.length === 2
    ? collapseLightDark((darkMode ? parts[1] : parts[0]).trim(), darkMode)
    : `light-dark(${collapseLightDark(value.slice(argsStart, argsEnd), darkMode)})`;

  return value.slice(0, start) + replacement + collapseLightDark(value.slice(argsEnd + 1), darkMode);
}

/** Splits on top-level commas only, so a nested call like `color-mix(in srgb, ...)` stays intact. */
function splitTopLevelArgs(input: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (char === '(') {
      depth++;
    } else if (char === ')') {
      depth--;
      if (depth < 0) {
        return [];
      }
    } else if (char === ',' && depth === 0) {
      parts.push(input.slice(start, i));
      start = i + 1;
    }
  }
  if (depth !== 0) {
    return [];
  }
  parts.push(input.slice(start));
  return parts;
}
