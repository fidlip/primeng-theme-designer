import { TranslationObject } from '@ngx-translate/core';

/**
 * German translations for the demo app - only the `ptd` subtree is populated. Demonstrates that a
 * consumer can extend the designer's language set with its own i18n library without translating
 * its whole app: `demo.*` keys (and `ptd.showcase*`, not added here) fall back to English via
 * `fallbackLang: 'en'` (see `app.config.ts`) while `de` is active.
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
