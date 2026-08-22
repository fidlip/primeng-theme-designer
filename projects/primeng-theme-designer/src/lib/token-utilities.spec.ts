import { Json } from './json.model';
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
      surface: { 100: '#f1f5f9', 800: '#1e293b' },
      background: { value: 'light-dark({surface.100}, {surface.800})' },
    },
    css: () => '.ignored {}',
  } as unknown as Json;

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
    expect(evaluateTokenValue('border: {border.value}', tree)).toBe('border: 1px solid #336699');
    expect(evaluateTokenValue('color: {primary.color}', tree)).toBe('color: #336699');
  });

  it('resolves multiple token references nested inside a single compound value (e.g. light-dark())', () => {
    const tree = buildTokenTree(theme);
    expect(evaluateTokenValue('{background.value}', tree)).toBe('light-dark(#f1f5f9, #1e293b)');
  });

  it('sanitizes token braces', () => {
    expect(sanitizeToken(' {blue.500} ')).toBe('blue.500');
  });
});
