# primeng-theme-designer

A standalone visual theme editor for [PrimeNG](https://primeng.org) design tokens. Drop `<primeng-theme-designer>` into any Angular app, hand it a PrimeNG preset, and let users tweak primitive, semantic, and per-component tokens live — with instant preview, `{token.path}` references, and an exportable theme file.

![Theme designer screenshot](https://raw.githubusercontent.com/fidlip/png-theme-designer/main/img.png)

## Features

- **Live editing** of primitive, semantic, and per-component design tokens, organized in the same shape as a PrimeNG preset.
- **Token references** — type `{` in any value field to autocomplete a reference to another token, with the resolved value previewed inline.
- **Palette editor** — pick a base color and the whole 50–950 palette scale is generated automatically.
- **Apply instantly** to `Theme.setTheme(...)` so changes are visible in the running app without a reload.
- **Persistence** — edits are saved to `localStorage` and restored automatically; "Reset to default" clears them.
- **Export** the current theme as a ready-to-use `definePreset(...)` TypeScript file, either in full or as a diff against the stock preset.
- **Dark mode toggle**, collapsible panel, and deep-linkable sections (jump straight to `components.button`, for example).

## Installation

```bash
npm install primeng-theme-designer primeng @primeng/themes
```

`@angular/core`, `@angular/common`, and `@angular/forms` are expected to already be present in an Angular app; PrimeNG's own peer dependencies (such as animations support) apply as usual.

## Usage

```ts
import { Component } from '@angular/core';
import { ThemeDesignerComponent } from 'primeng-theme-designer';
import Material from '@primeng/themes/material';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ThemeDesignerComponent],
  template: `
    <primeng-theme-designer
      [initialTheme]="theme"
      (closed)="showDesigner = false" />
  `,
})
export class AppComponent {
  theme = Material;
  showDesigner = true;
}
```

Pass any object built with `@primeng/themes`' `definePreset(...)` (or a stock preset like `Material`) as `initialTheme` — that's the only required input.

## API

### Inputs

| Input | Type | Default | Description |
| --- | --- | --- | --- |
| `initialTheme` | `MaterialBaseDesignTokens` | *required* | The PrimeNG preset to edit. |
| `title` | `string` | `'Designer'` | Panel header text. |
| `activeSection` | `string` | — | Dot-separated section to open and scroll to, e.g. `components.button`. |
| `collapsed` | `boolean` | `false` | Whether the panel is collapsed to a small tab. Supports two-way binding: `[(collapsed)]`. |

### Outputs

| Output | Payload | Description |
| --- | --- | --- |
| `closed` | `void` | Emitted when the user clicks the close button. |
| `openDemoPage` | `void` | Emitted when the user clicks the "demo page" button — wire this up to navigate back to your own preview. |
| `componentSectionSelected` | `string` | Emitted with a component key (e.g. `'button'`) when the user opens a `components.*` section — handy for syncing a showcase anchor. |
| `collapsedChange` | `boolean` | Companion to `[(collapsed)]`. |

## Demo

See the `demo` project in the [GitHub repository](https://github.com/fidlip/png-theme-designer) for a full example, including a complete PrimeNG component showcase wired up to the designer.

## License

MIT. If you find this useful, you can [buy me a coffee](https://coff.ee/fidlip).
