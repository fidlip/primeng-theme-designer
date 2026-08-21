import { TranslationObject } from '@ngx-translate/core';
import { PTD_TRANSLATIONS_EN } from '../../../../primeng-theme-designer';

/**
 * Default (English) translations for the demo app, loaded synchronously by `StaticTranslateLoader`
 * (see `static-translate-loader.ts`). Two namespaces:
 *  - `ptd.*` reuses the theme designer library's own bundled dictionary (`PTD_TRANSLATIONS_EN`,
 *    exported from the library precisely so a consumer doesn't have to hand-copy it) - consumed by
 *    `NgxPtdTranslateAdapter`, which forwards the library's `PtdTranslateService` lookups here.
 *    English and Czech deliberately stay identical to the library's own text; only German (`de.ts`)
 *    diverges, since the library doesn't ship a German dictionary at all.
 *  - `demo.*` covers this app's own copy that isn't part of the library (hero header, preset
 *    selector label, language switcher, the "CustomTest" example section).
 */
export const TRANSLATIONS_EN: TranslationObject = {
  ptd: PTD_TRANSLATIONS_EN,
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
