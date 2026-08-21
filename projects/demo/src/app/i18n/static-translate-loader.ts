import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TranslateLoader, TranslationObject } from '@ngx-translate/core';
import { TRANSLATIONS_CS, TRANSLATIONS_DE, TRANSLATIONS_EN } from './translations';

const DICTIONARIES: Record<string, TranslationObject> = {
  en: TRANSLATIONS_EN,
  cs: TRANSLATIONS_CS,
  de: TRANSLATIONS_DE,
};

/** Serves the demo's translations from in-memory objects instead of fetching JSON assets over HTTP. */
@Injectable()
export class StaticTranslateLoader extends TranslateLoader {
  override getTranslation(lang: string): Observable<TranslationObject> {
    return of(DICTIONARIES[lang] ?? {});
  }
}
