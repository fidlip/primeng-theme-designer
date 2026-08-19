# png-theme-designer

A standalone visual theme editor for [PrimeNG](https://primeng.org) design tokens. Drop it into any Angular app and let users tweak primitive, semantic, and per-component tokens live, with instant preview and an exportable theme file.

If you like it, you can buy me a [coffee](https://coff.ee/fidlip).

![img.png](img.png)

This repository is an Angular CLI workspace with two projects:

- **[`projects/png-theme-designer`](projects/png-theme-designer)** — the publishable library. See its [README](projects/png-theme-designer/README.md) for installation, usage, and the full API reference.
- **`projects/demo`** — a demo app that consumes the library and doubles as a live showcase of PrimeNG components styled by the designer's output.

## Quick start

```bash
npm install
npm start
```

Then open `http://localhost:4200` — the demo app shows a full PrimeNG component gallery with the theme designer available via the palette button in the top-right corner.

## Installing the library in your own app

```bash
npm install png-theme-designer primeng @primeng/themes
```

```ts
import { ThemeDesignerComponent } from 'png-theme-designer';
import Material from '@primeng/themes/material';
```

```html
<png-theme-designer [initialTheme]="theme" (closed)="showDesigner = false" />
```

See the [library README](projects/png-theme-designer/README.md) for the full API and more usage details.

----

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.1.

## Development server

To start the demo app's dev server, run:

```bash
npm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building the library

```bash
ng build png-theme-designer
```

This compiles the library and writes the publishable package to `dist/png-theme-designer`.

## Building the demo app

```bash
npm run build
```

This compiles the demo app into `dist/demo`.

## Running unit tests

```bash
ng test
```

Runs Karma/Jasmine tests for the `demo` project. Use `ng test png-theme-designer` to test the library project instead.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
