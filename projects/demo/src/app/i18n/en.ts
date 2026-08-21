import { TranslationObject } from '@ngx-translate/core';

/**
 * Default (English) translations for the demo app, loaded synchronously by `StaticTranslateLoader`
 * (see `static-translate-loader.ts`). Two namespaces:
 *  - `ptd.*` mirrors the theme designer library's own translation keys - including its bundled
 *    `ComponentShowcaseComponent`/`ShowcaseSectionComponent` (see
 *    `primeng-theme-designer/src/lib/i18n/translations`) - and is consumed by
 *    `NgxPtdTranslateAdapter`, which forwards the library's `PtdTranslateService` lookups here.
 *  - `demo.*` covers this app's own copy that isn't part of the library (hero header, preset
 *    selector label, language switcher, the "CustomTest" example section).
 */
export const TRANSLATIONS_EN: TranslationObject = {
  ptd: {
    designer: {
      title: 'Designer',
      tooltip: {
        demoPage: 'Demo page',
        download: 'Download',
        apply: 'Apply',
        resetTheme: 'Reset to the default theme',
        toggleDarkMode: 'Toggle dark mode',
        close: 'Close',
      },
      confirmReset: {
        header: 'Confirmation',
        message: 'Do you want to discard the current theme and restore the default theme?',
        accept: 'Discard',
        reject: 'Back',
      },
    },
    section: { primitive: 'Primitive', semantic: 'Semantic', components: 'Components' },
    valuePicker: {
      placeholder: 'Value or {token.path}',
      selectValueFor: 'Select a value for {{name}}',
      copyTokenPath: 'Double-click to copy the token path',
      noTokens: 'No tokens to display',
    },
    palette: { invalid: 'Invalid palette' },
    presetSelector: { label: 'Theme preset', empty: 'No presets available' },
    showcaseSection: {
      viewInDocs: 'View {{title}} in the PrimeNG docs',
      editTheme: 'Edit {{title}} theme',
      openInDesigner: 'Open {{title}} in theme designer',
    },
    showcase: {
      shared: {
        selectACity: 'Select a city',
        themeName: 'Theme name',
        applyThemeConfirm: 'Apply this theme?',
        altMountain: 'Mountain',
        actions: { new: 'New', edit: 'Edit', delete: 'Delete', save: 'Save' },
      },
      chart: { primary: 'Primary', surface: 'Surface', accent: 'Accent' },
      accordion: { header: 'Theme details', content: 'Mock accordion content.' },
      blockui: { target: 'Theme workspace' },
      breadcrumb: { themes: 'Themes', components: 'Components' },
      button: { primary: 'Primary', secondary: 'Secondary' },
      card: { header: 'Material preset', subheader: 'Mock theme card', content: 'Explore component design tokens.', open: 'Open' },
      checkbox: { label: 'Use semantic tokens' },
      chip: { darkMode: 'Dark mode' },
      dialog: { header: 'Theme dialog', content: 'Mock dialog content.' },
      divider: { primitiveTokens: 'Primitive tokens', to: 'to', componentTokens: 'Component tokens' },
      drawer: { header: 'Mock drawer', content: 'Drawer content.' },
      editor: { content: 'Edit this themed content.' },
      fieldset: { legend: 'Semantic colors', content: 'Primary, surface and text palettes.' },
      fileupload: { chooseLabel: 'Choose theme file' },
      galleria: { altLandscape: 'Landscape' },
      iconfield: { placeholder: 'Search tokens' },
      inputgroup: { placeholder: 'Username' },
      imagecompare: { altBefore: 'Before', altAfter: 'After' },
      inplace: { display: 'Click to edit theme name' },
      megamenu: { themes: 'Themes', designer: 'Designer' },
      message: { success: 'Theme compiled successfully.', warn: 'Unsaved token changes.' },
      metergroup: { primary: 'Primary', surface: 'Surface' },
      multiselect: { placeholder: 'Select cities' },
      panel: { header: 'Component tokens', content: 'Panel content with mock data.' },
      panelmenu: { colors: 'Colors', primary: 'Primary', surface: 'Surface', typography: 'Typography' },
      password: { promptLabel: 'Choose a secure token' },
      picklist: { source: 'Available', target: 'Selected' },
      popover: { anchor: 'Primary color preview', title: 'Primary color' },
      scrollpanel: {
        content: 'PrimeNG theme tokens provide a consistent visual language. This scrollable mock content demonstrates track and thumb styling. Edit this themed content. PrimeNG theme tokens provide a consistent visual language. This scrollable mock content demonstrates track and thumb styling.',
      },
      scrolltop: {
        p1: 'Scroll this box to reveal the global control. It sticks to the bottom-right corner once you pass the threshold.',
        p2: 'PrimeNG theme tokens cascade from primitive values through semantic aliases down to per-component overrides.',
        p3: 'The theme designer lets you edit any of those layers live and preview the result across the whole component set.',
        p4: 'Once the scroll position clears the configured threshold, the ScrollTop button fades in and stays pinned in view.',
        p5: 'Palettes, radii and spacing scales all flow from the same primitive layer, keeping every component visually consistent.',
        p6: 'Semantic tokens map those primitives to roles like primary, surface and text, so a single edit ripples everywhere.',
        p7: 'Component-level overrides let you fine-tune one widget without touching the shared semantic layer underneath.',
        p8: 'Keep scrolling to see it settle near the middle of this panel, right where the default scroll position lands.',
      },
      selectbutton: { light: 'Light', dark: 'Dark', system: 'System' },
      splitbutton: { saveTheme: 'Save theme' },
      splitter: { preview: 'Preview', tokens: 'Tokens' },
      stepper: { preset: 'Preset', tokens: 'Tokens', export: 'Export', selectPreset: 'Select a preset.', next: 'Next', editTokens: 'Edit component tokens.' },
      table: { code: 'Code', name: 'Name', price: 'Price' },
      tabs: { light: 'Light', dark: 'Dark', lightPreview: 'Light theme preview', darkPreview: 'Dark theme preview' },
      tag: { stable: 'Stable', draft: 'Draft' },
      terminal: { welcome: 'Theme designer terminal' },
      tieredmenu: { components: 'Components', semantic: 'Semantic' },
      togglebutton: { onLabel: 'Dark mode', offLabel: 'Light mode' },
      toggleswitch: { label: 'Enable animations' },
      toolbar: { center: 'Theme Designer' },
      tooltip: { hoverMe: 'Hover me', text: 'A themed PrimeNG tooltip' },
      treeselect: { placeholder: 'Select a file' },
      treetable: { name: 'Name', type: 'Type' },
      tree: { documents: 'Documents', images: 'Images', folder: 'Folder' },
      org: { designLead: 'Design lead', engineeringLead: 'Engineering lead' },
      timeline: { themeCreated: 'Theme created', reviewCompleted: 'Review completed' },
      toast: {
        success: 'Success', info: 'Info', warn: 'Warn', error: 'Error', secondary: 'Secondary', contrast: 'Contrast',
        detail: 'Mock notification',
      },
    },
  },
  demo: {
    hero: {
      eyebrow: 'PrimeNG 19 theme playground',
      title: 'Component showcase',
      description: 'All visual PrimeNG components with mock data, ordered alphabetically. Use the palette icon to edit the matching component tokens.',
    },
    presetSelector: { label: 'Choose theme preset' },
    openDesigner: 'Open theme designer',
    langSwitcher: { label: 'Language' },
    customTest: { content: '... custom content' },
  },
};
