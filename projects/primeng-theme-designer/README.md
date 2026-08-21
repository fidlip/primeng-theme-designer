# primeng-theme-designer

A standalone visual theme editor for [PrimeNG](https://primeng.org) design tokens. Drop `<primeng-theme-designer>` into any Angular app, hand it a PrimeNG preset, and let users tweak primitive, semantic, and per-component tokens live — with instant preview, `{token.path}` references, and an exportable theme file.

**[Live demo](https://fidlip.github.io/primeng-theme-designer/)**

![Theme designer screenshot](https://raw.githubusercontent.com/fidlip/primeng-theme-designer/main/img.png)

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

## Versioning

This package's major version tracks the PrimeNG major version it targets (the same way Angular Material tracks Angular) — install the major that matches your PrimeNG version:

| primeng-theme-designer | PrimeNG |
| --- | --- |
| `^21.0.0` | `^21.0.0` |
| `^20.0.0` | `^20.0.0` |
| `^19.0.0` | `^19.1.3` |

```bash
# PrimeNG 21
npm install primeng-theme-designer@^21 primeng@^21 @primeng/themes@^21

# PrimeNG 20
npm install primeng-theme-designer@^20 primeng@^20 @primeng/themes@^20

# PrimeNG 19
npm install primeng-theme-designer@^19 primeng@^19 @primeng/themes@^19
```

Because the major version is dictated by PrimeNG compatibility rather than this library's own API, a major bump doesn't necessarily mean breaking changes here — check the [releases](https://github.com/fidlip/primeng-theme-designer/releases) for what actually changed. Older majors are maintained on their own `release/<major>.x` branch for backports; `main` tracks the latest supported PrimeNG major.

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
| `title` | `string` | `undefined` | Panel header text. Falls back to a translated "Designer" (see [Internationalization](#internationalization-i18n)) when not set. |
| `activeSection` | `string` | — | Dot-separated section to open and scroll to, e.g. `components.button`. |
| `collapsed` | `boolean` | `false` | Whether the panel is collapsed to a small tab. Supports two-way binding: `[(collapsed)]`. |

### Outputs

| Output | Payload | Description |
| --- | --- | --- |
| `closed` | `void` | Emitted when the user clicks the close button. |
| `openDemoPage` | `void` | Emitted when the user clicks the "demo page" button — wire this up to navigate back to your own preview. |
| `componentSectionSelected` | `string` | Emitted with a component key (e.g. `'button'`) when the user opens a `components.*` section — handy for syncing a showcase anchor. |
| `collapsedChange` | `boolean` | Companion to `[(collapsed)]`. |

## Component showcase

> **Developer tool, not for production end-user UI.** `ComponentShowcaseComponent` and
> `ShowcaseSectionComponent` — like the theme designer itself — are meant for previewing a theme
> while you build it, not for shipping to your app's users. The showcase force-opens overlays
> (popovers, confirm dialogs, ...) that would otherwise render nothing until interacted with,
> temporarily patches `HTMLElement.prototype.focus` to stop that from stealing scroll position, and
> renders one instance of nearly every PrimeNG component at once — none of which is a trade-off you
> want in a real page.

```ts
import { Component } from '@angular/core';
import { ComponentShowcaseComponent, ShowcaseSectionComponent } from 'primeng-theme-designer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ComponentShowcaseComponent, ShowcaseSectionComponent],
  template: `
    <primeng-component-showcase (editTheme)="openDesignerFor($event)">
      <primeng-showcase-section title="MyComponent" anchor="mycomponent" (editTheme)="openDesignerFor($event)">
        <!-- your own component, previewed alongside the built-in PrimeNG ones -->
      </primeng-showcase-section>
    </primeng-component-showcase>
  `,
})
export class AppComponent {
  openDesignerFor(anchor: string) { /* e.g. sync with ThemeDesignerComponent's activeSection */ }
}
```

`editTheme` emits the clicked section's anchor string — wire it up the same way as
`componentSectionSelected` above to jump the designer to the matching `components.*` section.

## Internationalization (i18n)

Every string the designer and showcase render is looked up through `PtdTranslateService`
(`translate(key, params?)`), bundled with built-in English and Czech dictionaries — no i18n library
is a hard dependency of this package. To use a different language your app already has translations
for, provide the `PTD_TRANSLATE_ADAPTER` injection token with an object implementing
`translate(key, params?): string` (and, optionally, a reactive `lang: Signal<string>`) to redirect
lookups to your own i18n solution (ngx-translate, Transloco, ...). See the `demo` project's
`app.config.ts` and `i18n/ngx-ptd-translate-adapter.ts` for a complete example.

## Demo

See the `demo` project in the [GitHub repository](https://github.com/fidlip/primeng-theme-designer/tree/main/projects/demo) for a full example, including a language switcher and the component showcase above wired up to the designer.

## License

MIT. If you find this useful, you can [buy me a coffee](https://coff.ee/fidlip).
