import { Component } from '@angular/core';
import { definePNgThemePreset } from './theme';
import { ThemeDesignerComponent} from '../../../png-theme-designer';

@Component({
  selector: 'app-root',
  imports: [ThemeDesignerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true
})
export class App {
  pngTheme = definePNgThemePreset(false);

  onThemeDesignerClose(): void {
    console.log('[png-theme-designer demo] Theme designer was closed.');
  }
}
