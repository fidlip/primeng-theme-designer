import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {providePrimeNG} from 'primeng/config';
import {definePNgThemePreset} from './theme';
import {DEFAULT_THEME_PRESET} from './theme-presets';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideHttpClient} from '@angular/common/http';
import {provideRouter} from '@angular/router';
import {provideTranslateLoader, provideTranslateService} from '@ngx-translate/core';
import {PTD_TRANSLATE_ADAPTER} from '../../../primeng-theme-designer';
import {StaticTranslateLoader} from './i18n/static-translate-loader';
import {NgxPtdTranslateAdapter} from './i18n/ngx-ptd-translate-adapter';

export const appConfig: ApplicationConfig = {
  providers: [
    provideTranslateService({
      loader: provideTranslateLoader(StaticTranslateLoader),
      lang: 'en',
      fallbackLang: 'en',
    }),
    // Sample wiring for PTD_TRANSLATE_ADAPTER: entirely optional - remove this line and the
    // designer falls back to its own bundled en/cs dictionaries.
    {provide: PTD_TRANSLATE_ADAPTER, useExisting: NgxPtdTranslateAdapter},
    // Deliberately synchronous (not provideAnimationsAsync()): the theme designer can
    // auto-open right at bootstrap via a `?component=...` URL param, and the async
    // variant's lazily-loaded animation engine attaches too late for that — the
    // drawer's enter animation gets queued and replayed once it loads, which snaps
    // the already-visible drawer back to its hidden start state before animating in.
    provideAnimations(),
    provideHttpClient(),
    provideRouter([]),
    providePrimeNG({
      theme: {
        preset: definePNgThemePreset(DEFAULT_THEME_PRESET),
        options: {
          cssLayer: {
            name: 'primeng',
            order: 'tailwind-base, primeng, tailwind-utilities',
          },
          darkModeSelector: '.ptd-dark-mode',
        },
      },
    }),
    provideZoneChangeDetection({eventCoalescing: true}),
  ]
};
