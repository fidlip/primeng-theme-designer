/**
 * Describes a selectable PrimeNG theme preset (e.g. Material, Aura, Lara, Nora).
 * `name` doubles as the `@primeuix/themes/<name>` import path segment, so it must
 * match the lowercase package name of the preset it points to.
 *
 * `preset` is typed as `Record<string, unknown>` rather than `Json` because stock PrimeNG presets
 * carry function-valued `css` callbacks (per-component and top-level), which `Json` disallows.
 * `Record<string, unknown>` also matches `definePreset`'s `T extends Record<string, unknown>`
 * generic constraint, unlike the bare `object` type used before PrimeNG v20's typings tightened.
 */
export interface PresetOption {
  name: string;
  label: string;
  preset: Record<string, unknown>;
}
