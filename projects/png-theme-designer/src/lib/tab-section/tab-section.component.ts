import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {IsJsonPipe} from "../is-json.pipe";
import {KeyValuePipe, TitleCasePipe} from "@angular/common";
import {Json} from '../json.model';
import {SectionContentComponent} from '../section-content/section-content.component';
import {FirstLevelSectionComponent} from '../first-level-section/first-level-section.component';

@Component({
  selector: 'png-tab-section',
  imports: [
    FormsModule,
    KeyValuePipe,
    IsJsonPipe,
    SectionContentComponent,
    FirstLevelSectionComponent,
    TitleCasePipe
  ],
  templateUrl: './tab-section.component.html',
  styleUrl: './tab-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabSectionComponent {
  @Input({required: true}) sectionConfig!: Json;
  @Input({required: true}) key!: string;
  @Input() activeSection?: string;
  @Output() sectionSelected = new EventEmitter<string>();
}
