
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, ElementRef, EventEmitter, forwardRef, HostListener, inject, Input, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TreeNode } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { Popover } from 'primeng/popover';
import { ThemeTokenOption } from '../token-tree-builder';
import { ValuePreviewComponent } from '../value-preview/value-preview.component';
import { PtdTranslatePipe } from '../i18n/translate.pipe';
import { ThemeStateService } from '../theme-state.service';
import { formatLightDarkValue, LightDarkValue, parseLightDarkValue } from '../light-dark-value.helper';
import { resolveToken } from '../token-resolver';

const NON_TOKEN_CHARACTER = /[.A-Za-z0-9]/;

@Component({
  selector: 'ptd-theme-value-picker',
  standalone: true,
  imports: [FormsModule, InputTextModule, Popover, ValuePreviewComponent, PtdTranslatePipe],
  templateUrl: './theme-value-picker.component.html',
  styleUrl: './theme-value-picker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ThemeValuePickerComponent),
    multi: true,
  }],
})
export class ThemeValuePickerComponent implements ControlValueAccessor {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) inputId?: string;
  @Input() tokenTree: TreeNode[] = [];
  @Input() tokens: ThemeTokenOption[] = [];
  @Input() placeholder?: string;
  @Input() name?: string;
  @Output() valueChange = new EventEmitter<string>();

  @ViewChild('input') private inputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('popover') private popover!: Popover;

  protected inputText = '';
  protected filteredTokens: ThemeTokenOption[] = [];
  protected selectedTokenIndex: number | null = null;
  protected disabled = false;

  private readonly themeState = inject(ThemeStateService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  /** Set only when the written value is a `light-dark(light, dark)` pair; `inputText` then shows/edits just one half. */
  private lightDarkValue: LightDarkValue | null = null;

  private onChange: (value: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  constructor() {
    effect(() => {
      const darkMode = this.themeState.darkMode();
      if (this.lightDarkValue) {
        this.inputText = darkMode ? this.lightDarkValue.dark : this.lightDarkValue.light;
        // This component is OnPush; the effect runs outside its own change detection pass, so
        // mutating `inputText` here needs an explicit nudge to reach the template/child preview.
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  @HostListener('keydown.arrowUp', ['$event'])
  onArrowUp(event: Event): void {
    event.preventDefault();
    if (this.selectedTokenIndex === null || this.selectedTokenIndex <= 0) {
      this.selectedTokenIndex = this.filteredTokens.length;
    }
    this.selectedTokenIndex--;
  }

  @HostListener('keydown.arrowDown', ['$event'])
  onArrowDown(event: Event): void {
    event.preventDefault();
    if (this.selectedTokenIndex === null || this.selectedTokenIndex >= this.filteredTokens.length - 1) {
      this.selectedTokenIndex = -1;
    }
    this.selectedTokenIndex++;
  }

  @HostListener('keydown.enter', ['$event'])
  onEnter(event: Event): void {
    if (this.selectedTokenIndex === null || !this.filteredTokens[this.selectedTokenIndex]) {
      return;
    }
    event.preventDefault();
    this.onTokenSelected(this.filteredTokens[this.selectedTokenIndex]);
  }

  writeValue(value: string | number | boolean | null): void {
    const rawValue = value === null ? '' : String(value);
    this.lightDarkValue = parseLightDarkValue(rawValue);
    this.inputText = this.lightDarkValue
      ? (this.themeState.darkMode() ? this.lightDarkValue.dark : this.lightDarkValue.light)
      : rawValue;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  filterTokens(event: Event): void {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) {
      return;
    }
    const text = target.value;
    const cursor = target.selectionStart ?? text.length;
    const { start, end } = this.getTokenBounds(text, cursor);
    const query = text.slice(start, end).toLowerCase().trim().replace(/[{}]/g, '');
    this.selectedTokenIndex = null;

    if (!query) {
      this.filteredTokens = [];
      this.popover.hide();
      return;
    }

    this.filteredTokens = this.tokens.filter(token =>
      (token.label ?? token.path).toLowerCase().includes(query) || token.path.toLowerCase().includes(query)
    );
    if (this.filteredTokens.length) {
      this.popover.show(event);
    } else {
      this.popover.hide();
    }
  }

  onTokenSelected(token: ThemeTokenOption): void {
    const input = this.inputRef.nativeElement;
    const text = input.value;
    const caret = input.selectionStart ?? text.length;
    const { start, end } = this.getTokenBounds(text, caret);
    const replacement = `{${token.path}}`;
    const value = text.slice(0, start) + replacement + text.slice(end);

    if (this.lightDarkValue && value.trim() === replacement && this.resolvesToLightDarkPair(token.path)) {
      // The picked token is itself a light-dark(light, dark) pair, so it already carries both
      // halves on its own - point straight at it instead of nesting a fresh light-dark(...)
      // around a reference that would just re-resolve to the same pair one level down.
      this.lightDarkValue = null;
      this.updateValue(replacement);
    } else {
      this.updateValue(value);
    }

    const position = start + replacement.length;
    setTimeout(() => {
      input.focus();
      input.setSelectionRange(position, position);
      this.popover.hide();
    });
  }

  private resolvesToLightDarkPair(path: string): boolean {
    const value = resolveToken(`{${path}}`, this.tokenTree)?.data?.value;
    return typeof value === 'string' && parseLightDarkValue(value) !== null;
  }

  onInputBlur(): void {
    this.updateValue(this.inputText.trim());
    this.onTouched();
  }

  copyTokenPath(): void {
    if (this.name && navigator.clipboard) {
      void navigator.clipboard.writeText(this.name);
    }
  }

  private updateValue(value: string): void {
    this.inputText = value;

    if (this.lightDarkValue) {
      this.lightDarkValue = this.themeState.darkMode()
        ? { ...this.lightDarkValue, dark: value }
        : { ...this.lightDarkValue, light: value };
    }
    const fullValue = this.lightDarkValue ? formatLightDarkValue(this.lightDarkValue) : value;

    this.onChange(fullValue);
    this.valueChange.emit(fullValue);
  }

  private getTokenBounds(text: string, caret: number): { start: number; end: number } {
    let start = caret - 1;
    while (start >= 0 && NON_TOKEN_CHARACTER.test(text[start])) {
      start--;
    }
    if (text[start] !== '{') {
      start++;
    }

    let end = caret;
    while (end < text.length && NON_TOKEN_CHARACTER.test(text[end])) {
      end++;
    }
    if (text[end] === '}') {
      end++;
    }
    return { start, end };
  }
}
