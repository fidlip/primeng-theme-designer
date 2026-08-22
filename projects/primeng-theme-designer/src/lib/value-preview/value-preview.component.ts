import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject, Input, OnChanges } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { evaluateTokenValue } from '../token-resolver';
import { collapseLightDark } from '../light-dark-value.helper';
import { ThemeStateService } from '../theme-state.service';

interface PreviewPart {
  value: string;
  isColor: boolean;
}

const COLOR_CANDIDATE = /[a-zA-Z-]+\((?:[^()]|\([^()]*\))*\)|#[0-9a-fA-F]{3,8}|\b(?:transparent|black|white|red|green|blue|yellow|gray|grey|orange|purple|pink|brown|cyan|magenta)\b/g;

@Component({
  selector: 'ptd-value-preview',
  templateUrl: './value-preview.component.html',
  styleUrl: './value-preview.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValuePreviewComponent implements OnChanges {
  @Input() value: string | null = null;
  @Input() data: TreeNode[] | null = null;

  protected evaluatedValue = '';
  protected preview: PreviewPart[] | null = null;

  private readonly themeState = inject(ThemeStateService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  constructor() {
    effect(() => {
      this.themeState.darkMode();
      this.updatePreview();
      // OnPush + the effect runs outside this component's own change detection pass, so a
      // dark-mode toggle needs an explicit nudge to re-render with the newly collapsed color.
      this.changeDetectorRef.markForCheck();
    });
  }

  ngOnChanges(): void {
    this.updatePreview();
  }

  private updatePreview(): void {
    this.preview = null;
    if (!this.value || !this.data) {
      return;
    }

    const resolvedValue = evaluateTokenValue(this.value, this.data, true);
    const evaluatedValue = collapseLightDark(resolvedValue, this.themeState.darkMode());
    const preview = this.preparePreviewParts(evaluatedValue);
    if (evaluatedValue !== this.value || preview.some(part => part.isColor)) {
      this.evaluatedValue = evaluatedValue;
      this.preview = preview;
    }
  }

  private preparePreviewParts(input: string): PreviewPart[] {
    const parts: PreviewPart[] = [];
    let lastIndex = 0;
    for (const match of input.matchAll(COLOR_CANDIDATE)) {
      const start = match.index;
      if (start > lastIndex) {
        parts.push({ value: input.slice(lastIndex, start), isColor: false });
      }
      parts.push({ value: match[0], isColor: this.isColor(match[0]) });
      lastIndex = start + match[0].length;
    }
    if (lastIndex < input.length) {
      parts.push({ value: input.slice(lastIndex), isColor: false });
    }
    return parts;
  }

  private isColor(value: string): boolean {
    if (typeof CSS !== 'undefined' && CSS.supports) {
      return CSS.supports('color', value);
    }
    return /^#(?:[\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i.test(value);
  }
}
