import {Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {definePreset, Theme} from '@primeng/themes';
import {ThemeStateService} from './theme-state.service';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';
import {Tooltip} from 'primeng/tooltip';
import {isJson, Json} from './json.model';
import {PresetOption} from './preset-option.model';
import {ProgressSpinner} from 'primeng/progressspinner';
import {Drawer} from 'primeng/drawer';
import {Button} from 'primeng/button';
import {TabSectionComponent} from './tab-section/tab-section.component';
import {IsJsonPipe} from './is-json.pipe';
import {TrackUserInteractionsDirective} from './track-user-interactions.directive';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {cloneTheme} from './theme-clone.helper';

@Component({
  selector: 'primeng-theme-designer',
  templateUrl: './theme-designer.component.html',
  imports: [
    TabPanel,
    FormsModule,
    CommonModule,
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
    TabSectionComponent,
    IsJsonPipe,
    TrackUserInteractionsDirective,
    ConfirmDialog,
  ],
  providers: [ConfirmationService],
  styleUrls: ['./theme-designer.component.scss'],
  standalone: true,
})
export class ThemeDesignerComponent implements OnChanges {
  @Input() title: string = 'Designer';
  @Input({required: true}) initialTheme!: Json;
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
  protected activeTab = 'primitive';
  /** Tab whose content is actually built; lags behind `activeTab` by one tick so a switch can paint a spinner first. */
  protected renderedTab = this.activeTab;

  private readonly themeService = inject(ThemeStateService);
  private readonly confirmationService = inject(ConfirmationService);

  ngOnChanges(changes: SimpleChanges) {
    if ((changes['initialTheme'] || changes['basePreset']) && this.initialTheme && this.basePreset) {
      this.initializeTheme();
      this.serveLoadingState();
    }
    if (changes['activeSection'] && this.activeSection) {
      this.switchTab(this.activeSection.split('.')[0] || 'primitive');
      this.setCollapsed(false);
    }
  }

  protected onTabChange(tab: string | number): void {
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
    Theme.setTheme({preset: this.theme});
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
  }

  resetThemeToDefault(): void {
    this.confirmationService.confirm({
      header: 'Confirmation',
      message: 'Do you want to discard the current theme and restore the default theme?',
      acceptLabel: 'Discard',
      rejectLabel: 'Back',
      accept: () => {
        this.themeService.clearThemeInLocalStorage();
        this.initializeTheme(false);
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
    const theme = savedTheme ? definePreset(initialTheme, savedTheme) : initialTheme;
    this.theme = theme;
    this.themeService.setBasePreset(this.basePreset);
    this.themeService.setTheme(theme);
    this.themeSections = Object.entries(theme)
      .filter(([key]) => key !== 'css')
      .map(([key, value]) => ({key, value}));
  }
}
