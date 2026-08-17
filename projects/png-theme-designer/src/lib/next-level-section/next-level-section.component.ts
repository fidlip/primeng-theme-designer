import {Component, Input} from '@angular/core';
import { Json } from '../json.model';
import {SectionContentComponent} from '../section-content/section-content.component';
import {KeyValuePipe, NgTemplateOutlet, TitleCasePipe} from '@angular/common';
import {IsJsonPipe} from '../is-json.pipe';
import {Fieldset} from 'primeng/fieldset';

@Component({
  selector: 'png-next-level-section',
  imports: [
    SectionContentComponent,
    KeyValuePipe,
    IsJsonPipe,
    Fieldset,
    TitleCasePipe,
    NgTemplateOutlet
  ],
  templateUrl: './next-level-section.component.html',
  styleUrl: './next-level-section.component.scss'
})
export class NextLevelSectionComponent {
  @Input({required: true}) sectionConfig!: Json;
  @Input({required: true}) header!: string;
  @Input({required: true}) key!: string;
  @Input() newFieldset = true;
  @Input() collapsed = false;
  protected readonly maximumUnfoldedSections = 25;

}
