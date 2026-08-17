import {Component, inject, Input} from '@angular/core';
import {Json, JsonPropertyType} from '../json.model';
import {FormsModule} from '@angular/forms';
import {PaletteSectionComponent} from '../palette-section/palette-section.component';
import {IsJsonPipe} from '../is-json.pipe';
import {IsPalettePipe} from '../is-palette.pipe';
import {AsyncPipe} from '@angular/common';
import {ThemeValuePickerComponent} from '../theme-value-picker/theme-value-picker.component';
import {PngThemeService} from '../png-theme.service';
import {CamelToTokensPipe} from '../camel-to-tokens.pipe';
import {IftaLabel} from 'primeng/iftalabel';

@Component({
  selector: 'png-section-content',
  imports: [
    FormsModule,
    PaletteSectionComponent,
    IsJsonPipe,
    IsPalettePipe,
    AsyncPipe,
    ThemeValuePickerComponent,
    CamelToTokensPipe,
    IftaLabel,
  ],
  templateUrl: './section-content.component.html',
  styleUrl: './section-content.component.scss',
  standalone: true,
})
export class SectionContentComponent {
  @Input({required: true}) header!: string;
  @Input({required: true}) owner!: Json;
  @Input({required: true}) propertyKey!: string;
  @Input({required: true}) key!: string;

  protected readonly themeService = inject(PngThemeService);
  protected readonly availableTokensTree = this.themeService.availableTokensTree;
  protected readonly availableTokens = this.themeService.availableTokens;

  protected get sectionConfig(): JsonPropertyType {
    return this.owner[this.propertyKey];
  }
}
