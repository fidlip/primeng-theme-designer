import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { Json } from '../json.model';
import {SectionContentComponent} from '../section-content/section-content.component';
import {KeyValuePipe, NgTemplateOutlet, TitleCasePipe} from '@angular/common';
import {IsJsonPipe} from '../is-json.pipe';
import {Fieldset} from 'primeng/fieldset';

@Component({
  selector: 'ptd-next-level-section',
  imports: [
    SectionContentComponent,
    KeyValuePipe,
    IsJsonPipe,
    Fieldset,
    TitleCasePipe,
    NgTemplateOutlet
  ],
  templateUrl: './next-level-section.component.html',
  styleUrl: './next-level-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NextLevelSectionComponent implements OnChanges {
  @Input({required: true}) sectionConfig!: Json;
  @Input({required: true}) header!: string;
  @Input({required: true}) key!: string;
  @Input() newFieldset = true;
  @Input() collapsed = false;
  protected readonly maximumUnfoldedSections = 25;
  /** Content is only built once the fieldset has been expanded at least once (irrelevant when `newFieldset` is false, since that branch has no toggle and is always shown). */
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
