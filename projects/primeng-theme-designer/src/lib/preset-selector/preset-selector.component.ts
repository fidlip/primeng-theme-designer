
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Popover } from 'primeng/popover';
import { Button } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { PresetOption } from '../preset-option.model';
import { PtdTranslatePipe } from '../i18n/translate.pipe';

/**
 * Icon-button + popover for picking which stock PrimeNG preset (Material, Aura, Lara, Nora, ...)
 * a consuming app should build its theme from. Purely presentational: the host app supplies the
 * actual preset objects via `presets` and reacts to `presetSelected` to rebuild/apply its theme.
 */
@Component({
  selector: 'primeng-preset-selector',
  standalone: true,
  imports: [Popover, Button, Tooltip, PtdTranslatePipe],
  templateUrl: './preset-selector.component.html',
  styleUrl: './preset-selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresetSelectorComponent {
  @Input({ required: true }) presets: PresetOption[] = [];
  @Input() selected?: PresetOption;
  @Input() label?: string;

  @Output() presetSelected = new EventEmitter<PresetOption>();

  @ViewChild('popover') private popover!: Popover;

  protected onTriggerClick(event: Event): void {
    this.popover.toggle(event);
  }

  protected onPresetClick(preset: PresetOption): void {
    this.popover.hide();
    if (preset.name === this.selected?.name) {
      return;
    }
    this.presetSelected.emit(preset);
  }
}
