import {Component, computed, input, output} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {TooltipModule} from 'primeng/tooltip';
import {PtdTranslatePipe} from '../i18n/translate.pipe';

/** PrimeNG major version this component is built against; matches the version-pinned docs subdomain (e.g. v19.primeng.org). */
const PRIMENG_DOCS_VERSION = 'v19';

/**
 * Wraps one example inside `ComponentShowcaseComponent` with a heading, a link to that component's
 * PrimeNG docs page, and a palette icon that emits `editTheme` with `anchor()`. Also usable
 * standalone to add a custom example section next to the showcase (see the README) - like the rest
 * of the showcase, it's a developer/reference tool, not meant for a production end-user UI.
 */
@Component({
  selector: 'primeng-showcase-section',
  standalone: true,
  imports: [ButtonModule, TooltipModule, PtdTranslatePipe],
  template: `
    <section class="showcase-section" [attr.aria-labelledby]="anchor() + '-title'">
      <header class="showcase-header">
        <h2 [id]="anchor() + '-title'">
          <a [id]="anchor()" class="showcase-anchor" [href]="'#' + anchor()">{{ title() }}</a>
        </h2>
        <div class="showcase-header-actions">
          <a pButton type="button" text rounded severity="secondary" icon="pi pi-question-circle"
             [href]="docsUrl()" target="_blank" rel="noopener"
             [attr.aria-label]="'showcaseSection.viewInDocs' | ptdTranslate:{title: title()}"
             [pTooltip]="'showcaseSection.viewInDocs' | ptdTranslate:{title: title()}"></a>
          <button pButton type="button" text rounded severity="secondary" icon="pi pi-palette"
                  [attr.aria-label]="'showcaseSection.editTheme' | ptdTranslate:{title: title()}"
                  [pTooltip]="'showcaseSection.openInDesigner' | ptdTranslate:{title: title()}"
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
