import { Injectable, computed, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PtdTranslateAdapter, PtdTranslateParams } from '../../../../primeng-theme-designer';

/**
 * Sample wiring of the theme designer library's optional `PTD_TRANSLATE_ADAPTER` extension point:
 * forwards its translation lookups to this app's own ngx-translate instance (under the `ptd.*`
 * namespace in `translations.ts`) instead of the library's bundled en/cs dictionaries. Provided in
 * `app.config.ts` - purely opt-in, the library works standalone without it.
 */
@Injectable({ providedIn: 'root' })
export class NgxPtdTranslateAdapter implements PtdTranslateAdapter {
  private readonly translateService = inject(TranslateService);

  /** Reactive, so the library re-renders when this app's language changes. */
  readonly lang = computed(() => this.translateService.currentLang() ?? 'en');

  translate(key: string, params?: PtdTranslateParams): string {
    return this.translateService.instant(`ptd.${key}`, params) as string;
  }
}
