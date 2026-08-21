import { computed, inject, Injectable, signal } from '@angular/core';
import { PTD_TRANSLATE_ADAPTER, PtdTranslateParams, PtdTranslationTree } from './translate.types';
import { PTD_TRANSLATIONS_EN } from './translations/en';
import { PTD_TRANSLATIONS_CS } from './translations/cs';

const DEFAULT_LANG = 'en';

const DICTIONARIES: Record<string, PtdTranslationTree> = {
  en: PTD_TRANSLATIONS_EN,
  cs: PTD_TRANSLATIONS_CS,
};

/** Resolves a dot-path key (e.g. `"designer.tooltip.close"`) against a nested translation tree. */
function resolve(tree: PtdTranslationTree, key: string): string | undefined {
  let node: string | PtdTranslationTree = tree;
  for (const segment of key.split('.')) {
    if (typeof node !== 'object' || node === null || !(segment in node)) {
      return undefined;
    }
    node = node[segment];
  }
  return typeof node === 'string' ? node : undefined;
}

/**
 * Translates the designer's own UI text. Defaults to the bundled en/cs dictionaries; a
 * consuming app can redirect all lookups to its own i18n solution by providing
 * `PTD_TRANSLATE_ADAPTER` (see `translate.types.ts`), without adding a hard dependency on it.
 */
@Injectable({ providedIn: 'root' })
export class PtdTranslateService {
  private readonly adapter = inject(PTD_TRANSLATE_ADAPTER, { optional: true });
  private readonly _lang = signal(DEFAULT_LANG);

  /** Current language. Mirrors the adapter's language when one is provided. */
  readonly lang = computed(() => (this.adapter?.lang ? this.adapter.lang() : this._lang()));
  /** Languages available in the built-in dictionaries; irrelevant once an adapter is provided. */
  readonly availableLangs: readonly string[] = Object.keys(DICTIONARIES);

  setLang(lang: string): void {
    if (DICTIONARIES[lang]) {
      this._lang.set(lang);
    }
  }

  translate(key: string, params?: PtdTranslateParams): string {
    if (this.adapter) {
      return this.adapter.translate(key, params);
    }
    const dictionary = DICTIONARIES[this.lang()] ?? DICTIONARIES[DEFAULT_LANG];
    const template = resolve(dictionary, key) ?? resolve(DICTIONARIES[DEFAULT_LANG], key) ?? key;
    return this.interpolate(template, params);
  }

  private interpolate(template: string, params?: PtdTranslateParams): string {
    if (!params) {
      return template;
    }
    return template.replace(/{{\s*(\w+)\s*}}/g, (_, name) => String(params[name] ?? ''));
  }
}
