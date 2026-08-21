import { TranslationObject } from '@ngx-translate/core';

/**
 * Static translation dictionaries for the demo app, loaded synchronously by `StaticTranslateLoader`
 * (see `static-translate-loader.ts`). Two namespaces:
 *  - `ptd.*` mirrors the theme designer library's own translation keys - including its bundled
 *    `ComponentShowcaseComponent`/`ShowcaseSectionComponent` (see
 *    `primeng-theme-designer/src/lib/i18n/translations`) - and is consumed by
 *    `NgxPtdTranslateAdapter`, which forwards the library's `PtdTranslateService` lookups here.
 *  - `demo.*` covers this app's own copy that isn't part of the library (hero header, preset
 *    selector label, language switcher, the "CustomTest" example section).
 *
 * German intentionally only has the `ptd` subtree populated, to demonstrate that a consuming app's
 * own i18n library can extend the designer's language set beyond what the library ships (en/cs)
 * without needing to translate the whole app into that language too - `fallbackLang: 'en'` covers
 * every `demo.*` key while `de` is active.
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

export const TRANSLATIONS_CS: TranslationObject = {
  ptd: {
    designer: {
      title: 'Návrhář',
      tooltip: {
        demoPage: 'Ukázková stránka',
        download: 'Stáhnout',
        apply: 'Použít',
        resetTheme: 'Obnovit výchozí motiv',
        toggleDarkMode: 'Přepnout tmavý režim',
        close: 'Zavřít',
      },
      confirmReset: {
        header: 'Potvrzení',
        message: 'Chcete zahodit aktuální motiv a obnovit výchozí motiv?',
        accept: 'Zahodit',
        reject: 'Zpět',
      },
    },
    section: { primitive: 'Primitivní', semantic: 'Sémantické', components: 'Komponenty' },
    valuePicker: {
      placeholder: 'Hodnota nebo {token.path}',
      selectValueFor: 'Vyberte hodnotu pro {{name}}',
      copyTokenPath: 'Dvojklikem zkopírujete cestu tokenu',
      noTokens: 'Žádné tokeny k zobrazení',
    },
    palette: { invalid: 'Neplatná paleta' },
    presetSelector: { label: 'Přednastavení motivu', empty: 'Žádná přednastavení nejsou k dispozici' },
    showcaseSection: {
      viewInDocs: 'Zobrazit {{title}} v dokumentaci PrimeNG',
      editTheme: 'Upravit motiv {{title}}',
      openInDesigner: 'Otevřít {{title}} v návrháři motivu',
    },
    showcase: {
      shared: {
        selectACity: 'Vyberte město',
        themeName: 'Název motivu',
        applyThemeConfirm: 'Použít tento motiv?',
        altMountain: 'Hora',
        actions: { new: 'Nový', edit: 'Upravit', delete: 'Smazat', save: 'Uložit' },
      },
      chart: { primary: 'Primární', surface: 'Povrch', accent: 'Akcent' },
      accordion: { header: 'Detaily motivu', content: 'Ukázkový obsah akordeonu.' },
      blockui: { target: 'Pracovní plocha motivu' },
      breadcrumb: { themes: 'Motivy', components: 'Komponenty' },
      button: { primary: 'Hlavní', secondary: 'Vedlejší' },
      card: { header: 'Přednastavení Material', subheader: 'Ukázková karta motivu', content: 'Prozkoumejte tokeny designu komponent.', open: 'Otevřít' },
      checkbox: { label: 'Použít sémantické tokeny' },
      chip: { darkMode: 'Tmavý režim' },
      dialog: { header: 'Dialog motivu', content: 'Ukázkový obsah dialogu.' },
      divider: { primitiveTokens: 'Primitivní tokeny', to: 'na', componentTokens: 'Tokeny komponent' },
      drawer: { header: 'Ukázkový výsuvný panel', content: 'Obsah výsuvného panelu.' },
      editor: { content: 'Upravte tento tematizovaný obsah.' },
      fieldset: { legend: 'Sémantické barvy', content: 'Palety primární barvy, povrchu a textu.' },
      fileupload: { chooseLabel: 'Vybrat soubor motivu' },
      galleria: { altLandscape: 'Krajina' },
      iconfield: { placeholder: 'Hledat tokeny' },
      inputgroup: { placeholder: 'Uživatelské jméno' },
      imagecompare: { altBefore: 'Před', altAfter: 'Po' },
      inplace: { display: 'Kliknutím upravíte název motivu' },
      megamenu: { themes: 'Motivy', designer: 'Návrhář' },
      message: { success: 'Motiv byl úspěšně sestaven.', warn: 'Neuložené změny tokenů.' },
      metergroup: { primary: 'Primární', surface: 'Povrch' },
      multiselect: { placeholder: 'Vyberte města' },
      panel: { header: 'Tokeny komponent', content: 'Obsah panelu s ukázkovými daty.' },
      panelmenu: { colors: 'Barvy', primary: 'Primární', surface: 'Povrch', typography: 'Typografie' },
      password: { promptLabel: 'Zvolte bezpečný token' },
      picklist: { source: 'Dostupné', target: 'Vybrané' },
      popover: { anchor: 'Náhled primární barvy', title: 'Primární barva' },
      scrollpanel: {
        content: 'Tokeny motivu PrimeNG poskytují jednotný vizuální jazyk. Tento posuvný ukázkový obsah demonstruje styl dráhy a jezdce. Upravte tento tematizovaný obsah. Tokeny motivu PrimeNG poskytují jednotný vizuální jazyk. Tento posuvný ukázkový obsah demonstruje styl dráhy a jezdce.',
      },
      scrolltop: {
        p1: 'Posunutím tohoto boxu se zobrazí globální ovládací prvek. Po překročení prahu se přichytí k pravému dolnímu rohu.',
        p2: 'Tokeny motivu PrimeNG se kaskádovitě šíří z primitivních hodnot přes sémantické aliasy až po přepisy jednotlivých komponent.',
        p3: 'Návrhář motivu umožňuje upravovat kteroukoli z těchto vrstev naživo a sledovat výsledek napříč celou sadou komponent.',
        p4: 'Jakmile pozice posunu překročí nastavený práh, tlačítko ScrollTop se zobrazí a zůstane připnuté na obrazovce.',
        p5: 'Palety, poloměry i škály rozestupů vycházejí ze stejné primitivní vrstvy, díky čemuž jsou všechny komponenty vizuálně konzistentní.',
        p6: 'Sémantické tokeny mapují tyto primitivy na role jako primární, povrch a text, takže jedna úprava se projeví všude.',
        p7: 'Přepisy na úrovni komponent umožňují doladit jeden widget bez zásahu do sdílené sémantické vrstvy pod ním.',
        p8: 'Pokračujte v posouvání a sledujte, jak se ustálí přibližně uprostřed tohoto panelu, přesně tam, kde přistává výchozí pozice posunu.',
      },
      selectbutton: { light: 'Světlý', dark: 'Tmavý', system: 'Systémový' },
      splitbutton: { saveTheme: 'Uložit motiv' },
      splitter: { preview: 'Náhled', tokens: 'Tokeny' },
      stepper: { preset: 'Přednastavení', tokens: 'Tokeny', export: 'Export', selectPreset: 'Vyberte přednastavení.', next: 'Další', editTokens: 'Upravte tokeny komponenty.' },
      table: { code: 'Kód', name: 'Název', price: 'Cena' },
      tabs: { light: 'Světlý', dark: 'Tmavý', lightPreview: 'Náhled světlého motivu', darkPreview: 'Náhled tmavého motivu' },
      tag: { stable: 'Stabilní', draft: 'Návrh' },
      terminal: { welcome: 'Terminál návrháře motivu' },
      tieredmenu: { components: 'Komponenty', semantic: 'Sémantické' },
      togglebutton: { onLabel: 'Tmavý režim', offLabel: 'Světlý režim' },
      toggleswitch: { label: 'Povolit animace' },
      toolbar: { center: 'Návrhář motivu' },
      tooltip: { hoverMe: 'Najeďte myší', text: 'Tematizovaný tooltip PrimeNG' },
      treeselect: { placeholder: 'Vyberte soubor' },
      treetable: { name: 'Název', type: 'Typ' },
      tree: { documents: 'Dokumenty', images: 'Obrázky', folder: 'Složka' },
      org: { designLead: 'Vedoucí designu', engineeringLead: 'Vedoucí vývoje' },
      timeline: { themeCreated: 'Motiv vytvořen', reviewCompleted: 'Kontrola dokončena' },
      toast: {
        success: 'Úspěch', info: 'Info', warn: 'Varování', error: 'Chyba', secondary: 'Sekundární', contrast: 'Kontrastní',
        detail: 'Ukázkové oznámení',
      },
    },
  },
  demo: {
    hero: {
      eyebrow: 'Hřiště motivů PrimeNG 19',
      title: 'Přehled komponent',
      description: 'Všechny vizuální komponenty PrimeNG s ukázkovými daty, seřazené abecedně. Ikonou palety upravíte odpovídající tokeny komponenty.',
    },
    presetSelector: { label: 'Vyberte přednastavení motivu' },
    openDesigner: 'Otevřít návrháře motivu',
    langSwitcher: { label: 'Jazyk' },
    customTest: { content: '... vlastní obsah' },
  },
};

/**
 * Only the `ptd` subtree is populated: demonstrates that a consumer can extend the designer's
 * language set with its own i18n library without translating its whole app. `demo.*` keys fall
 * back to English via `fallbackLang: 'en'` (see `app.config.ts`).
 */
export const TRANSLATIONS_DE: TranslationObject = {
  ptd: {
    designer: {
      title: 'Designer',
      tooltip: {
        demoPage: 'Demoseite',
        download: 'Herunterladen',
        apply: 'Anwenden',
        resetTheme: 'Auf Standarddesign zurücksetzen',
        toggleDarkMode: 'Dunklen Modus umschalten',
        close: 'Schließen',
      },
      confirmReset: {
        header: 'Bestätigung',
        message: 'Möchten Sie das aktuelle Design verwerfen und das Standarddesign wiederherstellen?',
        accept: 'Verwerfen',
        reject: 'Zurück',
      },
    },
    section: { primitive: 'Primitiv', semantic: 'Semantisch', components: 'Komponenten' },
    valuePicker: {
      placeholder: 'Wert oder {token.path}',
      selectValueFor: 'Wert für {{name}} auswählen',
      copyTokenPath: 'Doppelklick zum Kopieren des Token-Pfads',
      noTokens: 'Keine Tokens vorhanden',
    },
    palette: { invalid: 'Ungültige Palette' },
    presetSelector: { label: 'Design-Vorlage', empty: 'Keine Vorlagen verfügbar' },
  },
};
