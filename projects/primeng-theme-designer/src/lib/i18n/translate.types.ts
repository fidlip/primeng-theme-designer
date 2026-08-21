import { InjectionToken, Signal } from '@angular/core';

export type PtdTranslateParams = Record<string, string | number>;

/**
 * Extension point letting a consuming app forward the designer's own texts to whatever i18n
 * solution it already uses (ngx-translate, Transloco, ...) instead of the library's built-in
 * en/cs dictionaries. Providing `PTD_TRANSLATE_ADAPTER` is entirely optional - without one,
 * `PtdTranslateService` falls back to its bundled translations.
 */
export interface PtdTranslateAdapter {
  translate(key: string, params?: PtdTranslateParams): string;
  /** Reactive current language, for consumers whose language can change without a page reload. */
  readonly lang?: Signal<string>;
}

export const PTD_TRANSLATE_ADAPTER = new InjectionToken<PtdTranslateAdapter>('PTD_TRANSLATE_ADAPTER');
