import { TreeNode } from 'primeng/api';

const REF_REGEX = /^{([^{}]+)}$/;
const PARTIAL_REF_REGEX = /\{([^}]+)\}/g;

export function evaluateTokenValue(value: string, tree: TreeNode[], _preview = false): string {
  return value.replace(PARTIAL_REF_REGEX, match => {
    const resolved = resolveToken(match, tree);
    return resolved?.data?.value === undefined ? match : String(resolved.data.value);
  });
}

export function resolveToken(path: string, tree: TreeNode[], visited = new Set<string>()): TreeNode | null {
  const sanitizedPath = sanitizeToken(path);
  if (visited.has(sanitizedPath)) {
    return null;
  }
  visited.add(sanitizedPath);

  const node = findNodeByDataPath(sanitizedPath, tree) ?? findNodeByKeys(sanitizedPath, tree);
  const value = node?.data?.value;
  return typeof value === 'string' && REF_REGEX.test(value)
    ? resolveToken(value, tree, visited)
    : node;
}

export function sanitizeToken(token: string): string {
  const match = token.match(REF_REGEX);
  return (match ? match[1] : token).trim();
}

function findNodeByDataPath(path: string, nodes: TreeNode[]): TreeNode | null {
  for (const node of nodes) {
    if (node.data?.path === path) {
      return node;
    }
    const found = node.children ? findNodeByDataPath(path, node.children) : null;
    if (found) {
      return found;
    }
  }
  return null;
}

function findNodeByKeys(path: string, nodes: TreeNode[]): TreeNode | null {
  const parts = path.split('.');
  for (const node of nodes) {
    if (node.key === 'root' || node.key === 'colorScheme') {
      const found = node.children ? findNodeByKeys(path, node.children) : null;
      if (found) {
        return found;
      }
    }
    for (let length = 1; length <= parts.length; length++) {
      const key = toCamelCase(parts.slice(0, length).join(' '));
      if (node.key === key) {
        return length === parts.length
          ? node
          : findNodeByKeys(parts.slice(length).join('.'), node.children ?? []);
      }
    }
  }
  return null;
}

function toCamelCase(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+(.)/g, (_, character: string) => character.toUpperCase());
}
