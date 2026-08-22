import { definePreset } from '@primeuix/themes';
import { PresetOption } from 'primeng-theme-designer';
import { DemoPNgDiffTheme } from './theme/demo-png-diff.theme';
import { DemoPNgCSSTheme } from './theme/demo-png-css.theme';

export const definePNgThemePreset = (basePreset: PresetOption, withCss = true) =>
  definePreset(basePreset.preset, DemoPNgDiffTheme, ...(withCss ? [DemoPNgCSSTheme] : []));
