import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { evaluateTokenValue } from '../token-resolver';

interface PreviewPart {
  value: string;
  isColor: boolean;
}

const COLOR_CANDIDATE = /#[0-9a-fA-F]{3,8}|(?:rgb|rgba|hsl|hsla)\([^)]*\)|\b(?:transparent|black|white|red|green|blue|yellow|gray|grey|orange|purple|pink|brown|cyan|magenta)\b/g;

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

  ngOnChanges(): void {
    this.updatePreview();
  }

  private updatePreview(): void {
    this.preview = null;
    if (!this.value || !this.data) {
      return;
    }

    const evaluatedValue = evaluateTokenValue(this.value, this.data, true);
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
