import {Component, computed, input, output} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {TooltipModule} from 'primeng/tooltip';
import {TranslatePipe} from '@ngx-translate/core';

/** PrimeNG major version this demo is built against; matches the version-pinned docs subdomain (e.g. v19.primeng.org). */
const PRIMENG_DOCS_VERSION = 'v19';

@Component({
  selector: 'demo-showcase-section',
  standalone: true,
  imports: [ButtonModule, TooltipModule, TranslatePipe],
  template: `
    <section class="showcase-section" [attr.aria-labelledby]="anchor() + '-title'">
      <header class="showcase-header">
        <h2 [id]="anchor() + '-title'">
          <a [id]="anchor()" class="showcase-anchor" [href]="'#' + anchor()">{{ title() }}</a>
        </h2>
        <div class="showcase-header-actions">
          <a pButton type="button" text rounded severity="secondary" icon="pi pi-question-circle"
             [href]="docsUrl()" target="_blank" rel="noopener"
             [attr.aria-label]="'demo.showcaseSection.viewInDocs' | translate:{title: title()}"
             [pTooltip]="'demo.showcaseSection.viewInDocs' | translate:{title: title()}"></a>
          <button pButton type="button" text rounded severity="secondary" icon="pi pi-palette"
                  [attr.aria-label]="'demo.showcaseSection.editTheme' | translate:{title: title()}"
                  [pTooltip]="'demo.showcaseSection.openInDesigner' | translate:{title: title()}"
                  (click)="editTheme.emit(anchor())"></button>
        </div>
      </header>
      <div class="showcase-example"><ng-content /></div>
    </section>
  `,
  styleUrl: './showcase-section.component.scss'
})
export class ShowcaseSectionComponent {
  readonly title = input.required<string>();
  readonly anchor = input.required<string>();
  readonly editTheme = output<string>();
  readonly docsUrl = computed(() => `https://${PRIMENG_DOCS_VERSION}.primeng.org/${this.anchor()}`);
}
