/**
 * Describes a selectable PrimeNG theme preset (e.g. Material, Aura, Lara, Nora).
 * `name` doubles as the `@primeng/themes/<name>` import path segment, so it must
 * match the lowercase package name of the preset it points to.
 *
 * `preset` is typed as `object` rather than `Json` because stock PrimeNG presets carry
 * function-valued `css` callbacks (per-component and top-level), which `Json` disallows.
 */
export interface PresetOption {
  name: string;
  label: string;
  preset: object;
}
