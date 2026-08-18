import {Component, input, output} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {TooltipModule} from 'primeng/tooltip';

@Component({
  selector: 'demo-showcase-section',
  standalone: true,
  imports: [ButtonModule, TooltipModule],
  template: `
    <section class="showcase-section" [attr.aria-labelledby]="anchor() + '-title'">
      <header class="showcase-header">
        <h2 [id]="anchor() + '-title'">
          <a [id]="anchor()" class="showcase-anchor" [href]="'#' + anchor()">{{ title() }}</a>
        </h2>
        <button pButton type="button" text rounded severity="secondary" icon="pi pi-palette"
                [attr.aria-label]="'Edit ' + title() + ' theme'"
                [pTooltip]="'Open ' + title() + ' in theme designer'"
                (click)="editTheme.emit(themeKey())"></button>
      </header>
      <div class="showcase-example"><ng-content /></div>
    </section>
  `,
  styleUrl: './showcase-section.component.scss'
})
export class ShowcaseSectionComponent {
  readonly title = input.required<string>();
  readonly anchor = input.required<string>();
  readonly themeKey = input.required<string>();
  readonly editTheme = output<string>();
}
