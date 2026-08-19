import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Json} from '../json.model';
import {KeyValuePipe, TitleCasePipe} from '@angular/common';
import {IsJsonPipe} from '../is-json.pipe';
import {SectionContentComponent} from '../section-content/section-content.component';
import {NextLevelSectionComponent} from '../next-level-section/next-level-section.component';
import {Fieldset} from 'primeng/fieldset';

@Component({
  selector: 'png-first-level-section',
  imports: [
    KeyValuePipe,
    IsJsonPipe,
    SectionContentComponent,
    NextLevelSectionComponent,
    Fieldset,
    TitleCasePipe
  ],
  templateUrl: './first-level-section.component.html',
  styleUrl: './first-level-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FirstLevelSectionComponent implements OnChanges {
  @Input({required: true}) sectionConfig!: Json;
  @Input({required: true}) header!: string;
  @Input({required: true}) key!: string;
  @Input() collapsed = false;
  protected readonly maximumUnfoldedSections = 25;
  /** Content is only built once the fieldset has been expanded at least once. */
  protected expanded = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['collapsed'] && !this.collapsed) {
      this.expanded = true;
    }
  }

  protected onCollapsedChange(collapsed: boolean): void {
    if (!collapsed) {
      this.expanded = true;
    }
  }
}
