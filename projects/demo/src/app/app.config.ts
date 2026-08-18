import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {providePrimeNG} from 'primeng/config';
import {definePNgThemePreset} from './theme';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient} from '@angular/common/http';
import {provideRouter} from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
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
