import {Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormsModule} from '@angular/forms';


import {definePreset, Theme} from '@primeng/themes';
import {ThemeStateService} from './theme-state.service';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';
import {Tooltip} from 'primeng/tooltip';
import {isJson, Json} from './json.model';
import {PresetOption} from './preset-option.model';
import {ProgressSpinner} from 'primeng/progressspinner';
import {Drawer} from 'primeng/drawer';
import {Button} from 'primeng/button';
import {OverlayBadge} from 'primeng/overlaybadge';
import {TabSectionComponent} from './tab-section/tab-section.component';
import {IsJsonPipe} from './is-json.pipe';
import {TrackUserInteractionsDirective} from './track-user-interactions.directive';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {cloneTheme} from './theme-clone.helper';
import {PtdTranslateService} from './i18n/translate.service';
import {PtdTranslatePipe} from './i18n/translate.pipe';
import {TitleCasePipe} from '@angular/common';

@Component({
  selector: 'primeng-theme-designer',
  templateUrl: './theme-designer.component.html',
  imports: [
    TabPanel,
    FormsModule,
    Tabs,
    TabPanels,
    TabPanel,
    TabPanel,
    TabList,
    Tab,
    Tooltip,
    ProgressSpinner,
    Drawer,
    Button,
    OverlayBadge,
    TabSectionComponent,
    IsJsonPipe,
    TrackUserInteractionsDirective,
    ConfirmDialog,
    PtdTranslatePipe,
  ],
  providers: [ConfirmationService],
  styleUrls: ['./theme-designer.component.scss'],
  standalone: true,
})
export class ThemeDesignerComponent implements OnChanges {
  @Input() title?: string;
  /** Not typed `Json`: real presets carry function-valued `css` callbacks that `Json` excludes; cast below once `initializeTheme` has filtered those out. */
  @Input({required: true}) initialTheme!: Record<string, unknown>;
  /** The stock preset `initialTheme` was derived from; used as the export/diff baseline. */
  @Input({required: true}) basePreset!: PresetOption;
  /** Dot-separated theme section, e.g. `components.button`. */
  @Input() activeSection?: string;
  @Input() collapsed = false;

  @Output() closed = new EventEmitter<void>();
  @Output() openDemoPage = new EventEmitter<void>();
  /** Emitted when a component section is used, suitable for synchronizing a showcase anchor. */
  @Output() componentSectionSelected = new EventEmitter<string>();
  @Output() collapsedChange = new EventEmitter<boolean>();

  protected theme?: Json;
  protected themeSections: Array<{ key: string; value: unknown }> = [];
  protected loading = true;
  /** Leaf token values differing from what was last pushed live; shown as a badge on the Apply button. */
  protected changesSinceApply = 0;
  /** Leaf token values differing from the theme's default; shown as a badge on the Reset button. */
  protected changesFromDefault = 0;
  /** Leaf token values differing from the theme as it stood right after the app loaded; shown as a badge on the Download button. */
  protected changesFromAppLoad = 0;
  protected activeTab = 'primitive';
  /** Tab whose content is actually built; lags behind `activeTab` by one tick so a switch can paint a spinner first. */
  protected renderedTab = this.activeTab;

  private readonly themeService = inject(ThemeStateService);
  private readonly confirmationService = inject(ConfirmationService);
  protected readonly translateService = inject(PtdTranslateService);
  private readonly titleCasePipe = new TitleCasePipe();

  ngOnChanges(changes: SimpleChanges) {
    if ((changes['initialTheme'] || changes['basePreset']) && this.initialTheme && this.basePreset) {
      this.initializeTheme();
      this.serveLoadingState();
    }
    if (changes['activeSection'] && this.activeSection) {
      this.switchTab(this.activeSection.split('.')[0] || 'primitive');
      this.setCollapsed(false);
      this.scrollToActiveSection();
    }
  }

  /**
   * The target section may live in a tab that's still being (re)rendered (see `switchTab`'s
   * deferral), so wait a tick past that before looking it up in the DOM. A previously-expanded
   * section collapsing (p-fieldset's default 400ms toggle animation) shifts everything below it
   * for the duration of that animation, so the first scroll can land short; a second, later scroll
   * corrects for that once the layout has settled.
   */
  private scrollToActiveSection(): void {
    const section = this.activeSection;
    const scroll = () => document.getElementById(`ptd-section-${section}`)?.scrollIntoView({behavior: 'smooth', block: 'start'});
    setTimeout(scroll, 50);
    setTimeout(scroll, 450);
  }

  protected onTabChange(tab: string | number | undefined): void {
    if (tab === undefined) {
      return;
    }
    this.switchTab(String(tab));
  }

  /**
   * Switches the active tab immediately (so the spinner shows) and defers building
   * the (potentially huge) tab content to the next tick, giving the browser a chance to paint.
   */
  private switchTab(tab: string): void {
    this.activeTab = tab;
    if (this.renderedTab === tab) {
      return;
    }
    if (this.loading) {
      // The initial theme load already hides content behind `loading`; no need for a second deferral.
      this.renderedTab = tab;
      return;
    }
    setTimeout(() => {
      this.renderedTab = tab;
    }, 0);
  }

  /**
   * Serves a loading state for the theme designer
   * Theme has a huge amount of data, so we need to show of loading state until it's loaded and fully rendered.
   */
  serveLoadingState() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 0);
  }

  /**
   * Downloads the theme configuration as a TypeScript file
   */
  onDownloadTheme(): void {
    if (isJson(this.theme)) {
      this.themeService.downloadThemeDiffFile(this.theme);
    }
  }

  /**
   * Closes the theme designer
   */
  onClose(): void {
    this.closed.emit();
  }

  toggleDarkMode(): void {
    window.document.body.classList.toggle('ptd-dark-mode');
  }

  protected toggleCollapsed(): void {
    this.setCollapsed(!this.collapsed);
  }

  protected setCollapsed(collapsed: boolean): void {
    this.collapsed = collapsed;
    this.collapsedChange.emit(collapsed);
  }

  onApplyTheme(): void {
    // `Theme.setTheme` replaces `options` wholesale (falling back to library defaults for
    // anything not passed) rather than merging onto what's already active - omitting it here
    // would silently discard the consuming app's own `darkModeSelector`/`cssLayer`/... config.
    Theme.setTheme({preset: this.theme, options: Theme.getOptions()});
    if (isJson(this.theme)) {
      this.themeService.setLastAppliedTheme(this.theme);
    }
    this.refreshChangeCounts();
  }

  onDemoPage(): void {
    this.openDemoPage.emit();
  }

  protected onSectionSelected(section: string): void {
    this.activeSection = section;
    if (section.startsWith('components.')) {
      this.componentSectionSelected.emit(section.slice('components.'.length));
    }
  }

  protected onUserInteraction(): void {
    if (isJson(this.theme)) {
      this.themeService.saveToLocalStorage(this.theme);
    }
    this.refreshChangeCounts();
  }

  /** Recomputes the Apply/Reset/Download badge counts from the current working theme. */
  private refreshChangeCounts(): void {
    if (!isJson(this.theme)) {
      return;
    }
    this.changesSinceApply = this.themeService.countChangesSinceLastApply(this.theme);
    this.changesFromDefault = this.themeService.countChangesFromDefault(this.theme);
    this.changesFromAppLoad = this.themeService.countChangesFromAppLoad(this.theme);
  }

  /** `p-overlaybadge`'s `badgeDisabled` input hides the badge when true, so an empty count maps to `undefined`. */
  protected get applyBadge(): string | undefined {
    return this.changesSinceApply > 0 ? String(this.changesSinceApply) : undefined;
  }

  protected get resetBadge(): string | undefined {
    return this.changesFromDefault > 0 ? String(this.changesFromDefault) : undefined;
  }

  protected get downloadBadge(): string | undefined {
    return this.changesFromAppLoad > 0 ? String(this.changesFromAppLoad) : undefined;
  }

  /**
   * Falls back to a title-cased key for arbitrary/custom top-level sections a preset may add
   * beyond primitive/semantic/components. Checked against a fixed set rather than by comparing
   * `translate()`'s return value to the input key: a `PTD_TRANSLATE_ADAPTER` is free to namespace
   * or otherwise transform the key before handing it to its own i18n system, so a miss there
   * doesn't necessarily come back as the exact key this method passed in.
   */
  private static readonly KNOWN_SECTIONS = new Set(['primitive', 'semantic', 'components']);

  protected sectionLabel(key: string): string {
    return ThemeDesignerComponent.KNOWN_SECTIONS.has(key)
      ? this.translateService.translate(`section.${key}`)
      : this.titleCasePipe.transform(key);
  }

  /**
   * Discards not just local edits but the host app's own preset customizations too, restoring
   * the raw stock preset (`basePreset`) - consistent with the per-field undo buttons and the
   * Reset badge, which likewise compare against the stock preset rather than `initialTheme`.
   */
  resetThemeToDefault(): void {
    this.confirmationService.confirm({
      header: this.translateService.translate('designer.confirmReset.header'),
      message: this.translateService.translate('designer.confirmReset.message'),
      acceptLabel: this.translateService.translate('designer.confirmReset.accept'),
      rejectLabel: this.translateService.translate('designer.confirmReset.reject'),
      accept: () => {
        this.themeService.clearThemeInLocalStorage();
        this.loadTheme(cloneTheme(this.basePreset.preset) as Json);
        this.onApplyTheme();
      },
    });
  }

  private initializeTheme(restoreSavedTheme = true): void {
    if (!this.initialTheme || !this.basePreset) {
      return;
    }

    const initialTheme = cloneTheme(this.initialTheme);
    const savedTheme = restoreSavedTheme ? this.themeService.getSavedTheme() : undefined;
    // The stock preset itself (not `initialTheme`) is the reset/undo baseline, so per-field
    // reverts land on the token's factory value even when the host app's `initialTheme` already
    // layers its own customizations on top via `definePreset`.
    this.themeService.setDefaultTheme(this.basePreset.preset as Json);
    // Snapshot `initialTheme` itself, before merging any locally-saved edits onto it - the
    // Download badge tracks drift against what the app's own preset file actually defines, so a
    // value restored from a previous session's local edit (not yet folded back into that file)
    // still counts as a change. Also not done in `loadTheme`, so a later `resetThemeToDefault()`
    // call (which reuses `loadTheme`) doesn't re-baseline it.
    this.themeService.setAppLoadTheme(initialTheme as Json);
    const theme = (savedTheme ? definePreset(initialTheme, savedTheme) : initialTheme) as Json;
    this.loadTheme(theme);
  }

  private loadTheme(theme: Json): void {
    this.theme = theme;
    this.themeService.setBasePreset(this.basePreset);
    this.themeService.setTheme(theme);
    // The freshly loaded theme (saved edits included, if any) is treated as the Apply baseline -
    // this component has no visibility into what the host app actually rendered at bootstrap.
    this.themeService.setLastAppliedTheme(theme);
    this.refreshChangeCounts();
    this.themeSections = Object.entries(theme)
      .filter(([key]) => key !== 'css')
      .map(([key, value]) => ({key, value}));
  }
}
