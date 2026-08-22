import Material from '@primeuix/themes/material';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { PresetOption } from 'primeng-theme-designer';

export const THEME_PRESETS: PresetOption[] = [
  { name: 'material', label: 'Material', preset: Material },
  { name: 'aura', label: 'Aura', preset: Aura },
  { name: 'lara', label: 'Lara', preset: Lara },
  { name: 'nora', label: 'Nora', preset: Nora },
];

export const DEFAULT_THEME_PRESET = THEME_PRESETS[0];
