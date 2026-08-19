import {AfterViewInit, Component, inject} from '@angular/core';
import { definePNgThemePreset } from './theme';
import { DEFAULT_THEME_PRESET, THEME_PRESETS } from './theme-presets';
import { PresetOption, PresetSelectorComponent, ThemeDesignerComponent, ThemeStateService} from '../../../primeng-theme-designer';
import { Theme } from '@primeng/themes';
import {ComponentShowcaseComponent} from './component-showcase/component-showcase.component';
import {ButtonModule} from 'primeng/button';
import {TooltipModule} from 'primeng/tooltip';

@Component({
  selector: 'app-root',
  imports: [ThemeDesignerComponent, PresetSelectorComponent, ComponentShowcaseComponent, ButtonModule, TooltipModule],
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
    const params = new URLSearchParams(window.location.search);
    const component = params.get('component');
    if (component) {
      this.openDesigner(component, false);
    }
    this.scrollToAnchor(window.location.hash.slice(1), false);
  }

  openDesigner(componentKey: string, updateUrl = true): void {
    this.activeDesignerSection = `components.${componentKey}`;
    this.showThemeDesigner = true;
    if (updateUrl) {
      this.updateUrl(componentKey, window.location.hash.slice(1));
    }
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

  showDemoComponent(componentKey?: string): void {
    const anchor = componentKey ? this.anchorForThemeKey(componentKey) : window.location.hash.slice(1) || 'accordion';
    this.scrollToAnchor(anchor);
    this.updateUrl(componentKey, anchor);
    this.designerCollapsed = false;
  }

  closeThemeDesigner(): void {
    this.showThemeDesigner = false;
  }

  private anchorForThemeKey(themeKey: string): string {
    return ({datatable: 'table', formfield: 'fluid'} as Record<string, string>)[themeKey] ?? themeKey;
  }

  private scrollToAnchor(anchor: string, smooth = true): void {
    if (!anchor) return;
    setTimeout(() => document.getElementById(anchor)?.scrollIntoView({behavior: smooth ? 'smooth' : 'auto', block: 'start'}));
  }

  private updateUrl(component?: string, anchor?: string): void {
    const url = new URL(window.location.href);
    component ? url.searchParams.set('component', component) : url.searchParams.delete('component');
    url.hash = anchor || '';
    window.history.replaceState({}, '', url);
  }
}
