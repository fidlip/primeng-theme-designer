import { TestBed } from '@angular/core/testing';
import { App } from './app';
import {provideHttpClient, withXhr} from '@angular/common/http';
import {provideNoopAnimations} from '@angular/platform-browser/animations';
import {provideRouter} from '@angular/router';
import {provideTranslateLoader, provideTranslateService} from '@ngx-translate/core';
import {StaticTranslateLoader} from './i18n/static-translate-loader';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideHttpClient(withXhr()), provideNoopAnimations(), provideRouter([]),
        provideTranslateService({loader: provideTranslateLoader(StaticTranslateLoader), lang: 'en', fallbackLang: 'en'}),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the component showcase title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Component showcase');
  });
});
