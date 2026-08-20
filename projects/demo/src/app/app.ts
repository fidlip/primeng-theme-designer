import {AfterViewInit, Component, inject} from '@angular/core';
import { definePNgThemePreset } from './theme';
import { DEFAULT_THEME_PRESET, THEME_PRESETS } from './theme-presets';
import { PresetOption, PresetSelectorComponent, ThemeDesignerComponent, ThemeStateService} from '../../../primeng-theme-designer';
import { Theme } from '@primeng/themes';
import {ComponentShowcaseComponent} from './component-showcase/component-showcase.component';
import {ButtonModule} from 'primeng/button';
import {TooltipModule} from 'primeng/tooltip';
import {ShowcaseSectionComponent} from './component-showcase/showcase-section.component';
import {TreeTableModule} from 'primeng/treetable';
import {TREE_TABLE_NODES} from './component-showcase/showcase-data';

@Component({
  selector: 'app-root',
  imports: [ThemeDesignerComponent, PresetSelectorComponent, ComponentShowcaseComponent, ButtonModule, TooltipModule, ShowcaseSectionComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true
})
export class App implements AfterViewInit {
  private readonly themeService = inject(ThemeStateService);

  protected readonly themePresets = THEME_PRESETS;
  protected basePreset: PresetOption = DEFAULT_THEME_PRESET;
  pngTheme = definePNgThemePreset(this.basePreset, false);
  showThemeDesigner = false;
  activeDesignerSection?: string;
  protected designerCollapsed: boolean = false;

  ngAfterViewInit(): void {
    this.suppressFocusScrollBriefly();
    const anchor = window.location.hash.slice(1);
    if (anchor) {
      this.selectComponent(anchor, false);
    }
  }

  /**
   * The showcase force-opens several overlays (ConfirmDialog in particular) that autofocus a
   * button on mount with no way to opt out via inputs, which drags the page's scroll along
   * with it and stomps the anchor scroll below. There's no completion event to hook to correct
   * for it afterward, so instead this suppresses the scroll side effect of any focus() call for
   * a window comfortably covering every forced-open overlay's mount, whatever it's caused by.
   */
  private suppressFocusScrollBriefly(): void {
    const originalFocus = HTMLElement.prototype.focus;
    HTMLElement.prototype.focus = function (options?: FocusOptions) {
      originalFocus.call(this, {...options, preventScroll: true});
    };
    setTimeout(() => {
      HTMLElement.prototype.focus = originalFocus;
    }, 4000);
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
   * The target anchor may not exist yet on a heavy initial load (the showcase is still
   * mounting); a second, later attempt catches it once rendering has caught up. Scroll itself
   * no longer gets hijacked by a focus() call once suppressFocusScrollBriefly is in effect.
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

  protected readonly treeTableNodes = TREE_TABLE_NODES;
}
