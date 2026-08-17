import {Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {MaterialBaseDesignTokens} from '@primeng/themes/material/base';

import {definePreset, Theme} from '@primeng/themes';
import {PngThemeService} from './png-theme.service';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';
import {Tooltip} from 'primeng/tooltip';
import {isJson} from './json.model';
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
  selector: 'png-theme-designer',
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
  @Input({required: true}) theme?: MaterialBaseDesignTokens;
  @Input() drawerVisible = true;

  @Output() close = new EventEmitter<void>();
  @Output() openDemoPage = new EventEmitter<void>();

  protected workingTheme?: MaterialBaseDesignTokens;
  protected themeSections: Array<{ key: string; value: unknown }> = [];
  protected loading = true;

  private readonly themeService = inject(PngThemeService);
  private readonly confirmationService = inject(ConfirmationService);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['theme'] && this.theme) {
      this.initializeTheme();
      this.serveLoadingState();
    }
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
    if (isJson(this.workingTheme)) {
      this.themeService.downloadThemeDiffFile(this.workingTheme);
    }
  }

  /**
   * Closes the theme designer
   */
  onClose(): void {
    this.close.emit();
  }

  toggleDarkMode(): void {
    window.document.body.classList.toggle('png-dark-mode');
  }

  onApplyTheme(): void {
    Theme.setTheme({preset: this.workingTheme});
  }

  onDemoPage(): void {
    this.openDemoPage.emit();
  }

  protected onUserInteraction(): void {
    if (isJson(this.workingTheme)) {
      this.themeService.saveToLocalStorage(this.workingTheme);
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
    if (!this.theme) {
      return;
    }

    const initialTheme = cloneTheme(this.theme);
    const savedTheme = restoreSavedTheme ? this.themeService.getSavedTheme() : undefined;
    const workingTheme = savedTheme ? definePreset(initialTheme, savedTheme) : initialTheme;
    this.workingTheme = workingTheme;
    this.themeService.setTheme(workingTheme);
    this.themeSections = Object.entries(workingTheme)
      .filter(([key]) => key !== 'css')
      .map(([key, value]) => ({key, value}));
  }
}
