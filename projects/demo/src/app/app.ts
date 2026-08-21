import {AfterViewInit, Component, inject} from '@angular/core';
import { definePNgThemePreset } from './theme';
import { DEFAULT_THEME_PRESET, THEME_PRESETS } from './theme-presets';
import {
  ComponentShowcaseComponent, PresetOption, PresetSelectorComponent, ShowcaseSectionComponent, ThemeDesignerComponent,
  ThemeStateService,
} from '../../../primeng-theme-designer';
import { Theme } from '@primeng/themes';
import {ButtonModule} from 'primeng/button';
import {TooltipModule} from 'primeng/tooltip';
import {SelectButtonModule} from 'primeng/selectbutton';
import {FormsModule} from '@angular/forms';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';

/** Demonstrates the library's optional translate-adapter extension point: German only exists for the designer's own texts (see translations.ts), not for this demo's own copy. */
const LANGS = ['en', 'cs', 'de'];

@Component({
  selector: 'app-root',
  imports: [
    ThemeDesignerComponent, PresetSelectorComponent, ComponentShowcaseComponent, ButtonModule, TooltipModule,
    ShowcaseSectionComponent, SelectButtonModule, FormsModule, TranslatePipe,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true
})
export class App implements AfterViewInit {
  private readonly themeService = inject(ThemeStateService);
  private readonly translateService = inject(TranslateService);

  protected readonly langs = LANGS;
  protected readonly currentLang = this.translateService.currentLang;
  protected readonly themePresets = THEME_PRESETS;
  protected basePreset: PresetOption = DEFAULT_THEME_PRESET;
  pngTheme = definePNgThemePreset(this.basePreset, false);
  showThemeDesigner = false;
  activeDesignerSection?: string;
  protected designerCollapsed: boolean = false;

  ngAfterViewInit(): void {
    const anchor = window.location.hash.slice(1);
    if (anchor) {
      this.selectComponent(anchor, false);
    }
  }

  /**
   * The single entry point for "select this component" - whether triggered by a showcase
   * palette icon (already anchor-keyed) or by clicking a section in the designer (theme-keyed,
   * converted via anchorForThemeKey at the call site). One anchor value drives the designer's
   * open section, the demo's scroll position and the URL hash together, instead of tracking a
   * theme key and an anchor as two separately-updated identities.
   */
  selectComponent(anchor: string, smooth = true): void {
    this.activeDesignerSection = `components.${this.themeKeyForAnchor(anchor)}`;
    this.showThemeDesigner = true;
    this.designerCollapsed = false;
    this.scrollToAnchor(anchor, smooth);
    this.updateUrl(anchor);
  }

  protected onDemoPage(): void {
    this.selectComponent(window.location.hash.slice(1) || 'accordion');
  }

  switchLang(lang: string): void {
    this.translateService.use(lang);
  }

  openThemeDesigner(): void {
    this.activeDesignerSection = undefined;
    this.showThemeDesigner = true;
    this.designerCollapsed = false;
  }

  /**
   * Switching presets is treated as a fresh start: any theme edits the designer had
   * persisted to localStorage for the previous preset are discarded rather than
   * merged onto the new one, since they were tuned for a different token baseline.
   */
  onPresetSelected(preset: PresetOption): void {
    this.themeService.clearThemeInLocalStorage();
    this.basePreset = preset;
    this.pngTheme = definePNgThemePreset(preset, false);
    Theme.setTheme({preset: this.pngTheme});
  }

  closeThemeDesigner(): void {
    this.showThemeDesigner = false;
  }

  /**
   * PrimeNG's theme object key and the demo's anchor/docs slug agree for almost every
   * component; these are the handful where they don't.
   */
  private static readonly THEME_KEY_TO_ANCHOR: Record<string, string> = {
    datatable: 'table', formfield: 'fluid', inputchips: 'chips',
  };
  private static readonly ANCHOR_TO_THEME_KEY: Record<string, string> = Object.fromEntries(
    Object.entries(App.THEME_KEY_TO_ANCHOR).map(([themeKey, anchor]) => [anchor, themeKey])
  );

  protected anchorForThemeKey(themeKey: string): string {
    return App.THEME_KEY_TO_ANCHOR[themeKey] ?? themeKey;
  }

  private themeKeyForAnchor(anchor: string): string {
    return App.ANCHOR_TO_THEME_KEY[anchor] ?? anchor;
  }

  /**
   * ComponentShowcaseComponent guards against two separate sources of scroll-hijacking that
   * would otherwise stomp this: ConfirmDialog's own focus()-triggered scroll
   * (suppressFocusScrollUntilSettled) and Terminal's native autofocus attribute (terminalReady).
   */
  private scrollToAnchor(anchor: string, smooth = true): void {
    if (!anchor) return;
    const scroll = () => document.getElementById(anchor)?.scrollIntoView({behavior: smooth ? 'smooth' : 'auto', block: 'start'});
    setTimeout(scroll);
  }

  private updateUrl(anchor: string): void {
    const url = new URL(window.location.href);
    url.hash = anchor;
    window.history.replaceState({}, '', url);
  }

}
