import Material from '@primeng/themes/material';
import Aura from '@primeng/themes/aura';
import Lara from '@primeng/themes/lara';
import Nora from '@primeng/themes/nora';
import { PresetOption } from 'primeng-theme-designer';

export const THEME_PRESETS: PresetOption[] = [
  { name: 'material', label: 'Material', preset: Material },
  { name: 'aura', label: 'Aura', preset: Aura },
  { name: 'lara', label: 'Lara', preset: Lara },
  { name: 'nora', label: 'Nora', preset: Nora },
];

export const DEFAULT_THEME_PRESET = THEME_PRESETS[0];
