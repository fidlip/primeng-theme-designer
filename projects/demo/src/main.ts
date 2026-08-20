import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Chrome restores the last scroll position from history on reload, racing App's own
// anchor-scroll (ngAfterViewInit) - whichever wins is nondeterministic, so a reload can
// silently land wherever the user happened to have scrolled to before hitting reload
// instead of the #anchor in the URL. Must run before bootstrap to beat that restore.
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
