# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`png-theme-designer` is an Angular library (Angular 19) that provides a standalone visual theme editor component (`<png-theme-designer>`) for PrimeNG design tokens. It's an Angular CLI workspace with two projects:

- `projects/png-theme-designer` — the publishable library (buildable with `ng-packagr`).
- `projects/demo` — an Angular app that consumes the library and doubles as a live example/showcase (`projects/demo/src/app/component-showcase`) of PrimeNG components styled by the designer's output.

The library reads a PrimeNG `MaterialBaseDesignTokens` preset object and lets a user edit it live (colors, palettes, per-component tokens) through a tabbed, tree-shaped UI, with the changes applied immediately via `Theme.setTheme()` and optionally persisted to `localStorage` or exported as a TypeScript preset diff file.

## Commands

All commands run from the repo root (the workspace, not `projects/demo`).

- `npm start` — serves the `demo` app (`ng serve demo`) at `http://localhost:4200`.
- `npm run build` — builds the `demo` app (`ng build demo`) into `dist/demo`.
- `npm run watch` — builds `demo` in watch mode with the development configuration.
- `npm test` — runs Karma/Jasmine unit tests (`ng test`, defaults to the `demo` project).
- `ng build png-theme-designer` — builds the publishable library (via `ng-packagr`) into `dist/png-theme-designer`.
- `ng test png-theme-designer` — runs unit tests for the library project only.
- Run a single spec file: use Karma's `--include` or narrow with Jasmine's `fdescribe`/`fit` in the spec, since `ng test` doesn't take a file path directly.

There is no configured lint script in `package.json`.

## Architecture

### Token model

PrimeNG themes are nested plain objects (primitive tokens, semantic tokens, per-color-scheme tokens, per-component tokens) where any leaf can be a literal value or a `{dot.path}` reference to another token. The library's core job is turning that nested object into an editable, reference-aware tree:

- `token-tree-builder.ts` — walks the raw theme object into a `PrimeNG TreeNode[]`, computing a normalized dot-path (`standardizePath`) for every leaf, and flattens it into `ThemeTokenOption[]` for autocomplete.
- `tokenizer.helper.ts` — converts arbitrary keys (camelCase, punctuation, etc.) into normalized dot-path segments.
- `token-resolver.ts` — resolves `{path}` references (including chained/nested references and partial-in-string references like `"{a} {b}"`) against the tree, either by matching the computed path or by walking the tree by key segments; used to render "resolved value" previews next to raw token expressions.
- `theme-clone.helper.ts` — deep-clones a theme object so edits never mutate the input preset.

When adding features that touch tokens, keep this pipeline in mind: raw theme object → tree (`token-tree-builder`) → path resolution (`token-resolver`) → editable UI (`theme-value-picker`).

### Component hierarchy (editor UI)

`ThemeDesignerComponent` (`theme-designer.component.ts`) is the library's single public entry point (see `public-api.ts`). It owns the top-level state: the cloned/working theme, loading state, active tab, and collapsed/drawer state. It delegates rendering per top-level theme key to nested components:

`ThemeDesignerComponent` → `TabSectionComponent` (one PrimeNG tab per top-level theme section, e.g. `primitive`, `semantic`, `components`) → `FirstLevelSectionComponent` / `NextLevelSectionComponent` (recursive descent into nested object keys) → `SectionContentComponent` (renders leaf editors) → `ThemeValuePickerComponent` (the actual input, with `{token}` autocomplete via a `Popover`) and `ValuePreviewComponent` (shows the resolved/computed value, with special handling for palettes via `PaletteSectionComponent` / `palette.helpers.ts` and `IsPalettePipe`).

`ThemeValuePickerComponent` implements `ControlValueAccessor` so it plugs into template-driven forms (`FormsModule`) throughout the tree; `writeValue`/`onChange` carry the raw string (which may contain `{token.path}` references), not the resolved value.

### State and persistence

`PngThemeService` (`png-theme.service.ts`) is a root-provided singleton that:
- Maintains the `availableTokensTree` / `availableTokens` streams (used for the `{token}` autocomplete across the whole editor) via `setTheme()`.
- Generates downloadable preset files: a full preset (`downloadThemeFile`) or a diff against the stock `@primeng/themes/material` preset (`downloadThemeDiffFile`, using `deep-object-diff`), both serialized as TypeScript `definePreset(...)` source via string templates (not an AST — be careful with the `JSON.stringify` + regex post-processing if changing the output format, especially the `"__REF__..."` → `{...}` unwrapping for token references).
- Persists/restores the working theme to/from `localStorage` under the key `png-theme-designer-saved-theme`, and merges it onto the caller-supplied `initialTheme` via PrimeNG's `definePreset` on load.

`TrackUserInteractionsDirective` is used on the root template to trigger the localStorage save whenever the user edits something.

### Consuming app (`projects/demo`)

`demo` composes a custom PrimeNG preset in `projects/demo/src/app/theme.ts` via `definePreset(Material, DemoPNgDiffTheme, DemoPNgCSSTheme)` and passes it to `<png-theme-designer [initialTheme]="pngTheme">`. `component-showcase/` renders one PrimeNG component per section as a live target for the designer's `activeSection` input / `componentSectionSelected` output, so edits in the designer can be checked against real components immediately — useful when verifying changes to the picker or resolver visually rather than just via unit tests.

### Styling

Both projects use SCSS (`inlineStyleLanguage: "scss"`) plus Tailwind (`tailwind.config.js`, `tailwindcss-primeui`) for the demo's own layout; the library's own component styles are plain SCSS per-component (`*.component.scss`), not Tailwind.