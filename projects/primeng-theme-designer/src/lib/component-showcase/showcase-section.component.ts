import {Component, computed, input, output, ChangeDetectionStrategy} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {TooltipModule} from 'primeng/tooltip';
import {PtdTranslatePipe} from '../i18n/translate.pipe';

/** PrimeNG major version this component is built against; matches the version-pinned docs subdomain (e.g. v21.primeng.org). */
const PRIMENG_DOCS_VERSION = 'v21';

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
    <section class="showcase-section" [attr.aria-labelledby]="anchor() ? anchor() + '-title' : null">
      <header class="showcase-header">
        <h2 [id]="anchor() ? anchor() + '-title' : null">
          @if (anchor()) {
            <a [id]="anchor()" class="showcase-anchor" [href]="'#' + anchor()">{{ title() }}</a>
          } @else {
            {{ title() }}
          }
        </h2>
        <div class="showcase-header-actions">
          <!-- PrimeNG v22's [pButton] directive dropped its icon/label inputs (still present on the
               p-button component, which is why preset-selector's icon still works unchanged) - an
               icon attribute on a [pButton]-hosted element is now silently ignored rather than
               erroring, so this rendered as an empty icon-less button until switched to a pButtonIcon
               content child, the new required pattern. -->
          @if (docsUrl(); as docsUrl) {
            <a pButton type="button" text rounded severity="secondary"
               [href]="docsUrl" target="_blank" rel="noopener"
               [attr.aria-label]="'showcaseSection.viewInDocs' | ptdTranslate:{title: title()}"
               [pTooltip]="'showcaseSection.viewInDocs' | ptdTranslate:{title: title()}">
              <span pButtonIcon class="pi pi-question-circle"></span>
            </a>
          }
          @if (anchor()) {
            <button pButton type="button" text rounded severity="secondary"
                    [attr.aria-label]="'showcaseSection.editTheme' | ptdTranslate:{title: title()}"
                    [pTooltip]="'showcaseSection.openInDesigner' | ptdTranslate:{title: title()}"
                    (click)="emitEditTheme()">
              <span pButtonIcon class="pi pi-palette"></span>
            </button>
          }
        </div>
      </header>
      <div class="showcase-example"><ng-content /></div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './showcase-section.component.scss'
})
export class ShowcaseSectionComponent {
  readonly title = input.required<string>();
  readonly anchor = input<string>();
  readonly editTheme = output<string>();
  /** `undefined` (hiding the "view in docs" link) when `anchor` isn't set - no anchor usually means no matching PrimeNG docs page either (e.g. a consumer's own custom example section). */
  readonly docsUrl = computed(() => {
    const anchor = this.anchor();
    return anchor ? `https://${PRIMENG_DOCS_VERSION}.primeng.org/${anchor}` : undefined;
  });

  protected emitEditTheme(): void {
    const anchor = this.anchor();
    if (anchor !== undefined) {
      this.editTheme.emit(anchor);
    }
  }
}
