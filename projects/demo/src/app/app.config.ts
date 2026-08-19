import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {providePrimeNG} from 'primeng/config';
import {definePNgThemePreset} from './theme';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideHttpClient} from '@angular/common/http';
import {provideRouter} from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
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
        preset: definePNgThemePreset(),
        options: {
          cssLayer: {
            name: 'primeng',
            order: 'tailwind-base, primeng, tailwind-utilities',
          },
          darkModeSelector: '.png-dark-mode',
        },
      },
    }),
    provideZoneChangeDetection({eventCoalescing: true}),
  ]
};
