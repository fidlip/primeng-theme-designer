import { TreeNode } from 'primeng/api';
import { MaterialBaseDesignTokens } from '@primeng/themes/material/base';
import { tokenize } from './tokenizer.helper';

export interface ThemeTokenOption {
  path: string;
  label?: string;
  valuePreview?: string;
}

export function buildTokenTree(theme: MaterialBaseDesignTokens, basePath?: string): TreeNode[] {
  return Object.entries(theme as Record<string, unknown>)
    .filter(([key]) => key !== 'css')
    .map(([key, value]) => {
      const path = basePath ? `${basePath}.${key}` : key;
      return buildNode(key, value, path);
    });
}

export function flattenTokenTree(tree: TreeNode[]): ThemeTokenOption[] {
  const options: ThemeTokenOption[] = [];
  walkTree(tree, options);
  return options;
}

function buildNode(key: string, value: unknown, path: string): TreeNode {
  const isLeaf = value === null || typeof value !== 'object';
  const data = { path: standardizePath(path), ...(isLeaf ? { value } : {}) };

  if (isLeaf) {
    return { label: key, key, data, leaf: true };
  }

  return {
    label: key,
    key,
    data,
    selectable: false,
    children: buildTokenTree(value as MaterialBaseDesignTokens, path),
  };
}

function standardizePath(path: string): string {
  return tokenize(path)
    .replace(/^.*?\./, '')
    .replace(/color\.scheme\.[^.]*\./g, '')
    .replace(/root\./g, '');
}

function walkTree(nodes: TreeNode[], options: ThemeTokenOption[]): void {
  for (const node of nodes) {
    const isLeaf = node.leaf || !node.children?.length;
    if (isLeaf && node.key && node.data?.path) {
      options.push({
        path: node.data.path,
        label: node.label ?? String(node.key),
        valuePreview: node.data.value === undefined ? undefined : String(node.data.value),
      });
    }
    if (node.children?.length) {
      walkTree(node.children, options);
    }
  }
}
