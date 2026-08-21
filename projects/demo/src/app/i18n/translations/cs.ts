import { TranslationObject } from '@ngx-translate/core';
import { PTD_TRANSLATIONS_CS } from '../../../../../primeng-theme-designer';

/** Czech translations for the demo app - see en.ts for the namespace layout and why `ptd.*` reuses the library's own dictionary instead of duplicating it. */
export const TRANSLATIONS_CS: TranslationObject = {
  ptd: PTD_TRANSLATIONS_CS,
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
