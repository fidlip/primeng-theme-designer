import { MaterialBaseDesignTokens } from '@primeng/themes/material/base';
import { buildTokenTree, flattenTokenTree } from './token-tree-builder';
import { evaluateTokenValue, resolveToken, sanitizeToken } from './token-resolver';
import { tokenize } from './tokenizer.helper';

describe('theme token utilities', () => {
  const theme = {
    primitive: {
      blue: { 500: '#336699' },
    },
    semantic: {
      primary: { color: '{blue.500}' },
      border: { value: '1px solid {blue.500}' },
    },
    css: () => '.ignored {}',
  } as unknown as MaterialBaseDesignTokens;

  it('tokenizes camelCase and separators', () => {
    expect(tokenize('colorScheme.primaryColor')).toBe('color.scheme.primary.color');
  });

  it('builds a tree without css and flattens leaf token options', () => {
    const tree = buildTokenTree(theme);
    expect(tree.some(node => node.key === 'css')).toBeFalse();
    expect(flattenTokenTree(tree)).toContain(jasmine.objectContaining({
      path: 'blue.500',
      valuePreview: '#336699',
    }));
  });

  it('resolves nested and partial token references', () => {
    const tree = buildTokenTree(theme);
    expect(resolveToken('{primary.color}', tree)?.data.value).toBe('#336699');
    expect(evaluateTokenValue('border: {border.value}', tree)).toBe('border: 1px solid {blue.500}');
    expect(evaluateTokenValue('color: {primary.color}', tree)).toBe('color: #336699');
  });

  it('sanitizes token braces', () => {
    expect(sanitizeToken(' {blue.500} ')).toBe('blue.500');
  });
});
