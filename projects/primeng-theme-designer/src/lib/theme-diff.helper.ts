import { Json, JsonPropertyType } from './json.model';

/** Recursively counts leaf token values that differ (added, removed, or changed) between two theme trees. */
export function countChangedLeaves(current: JsonPropertyType, reference: JsonPropertyType): number {
  if (current === reference) {
    return 0;
  }

  const currentIsJson = isPlainJson(current);
  const referenceIsJson = isPlainJson(reference);
  if (!currentIsJson || !referenceIsJson) {
    return current !== reference ? 1 : 0;
  }

  let count = 0;
  for (const key of new Set([...Object.keys(current), ...Object.keys(reference)])) {
    count += countChangedLeaves(current[key], reference[key]);
  }
  return count;
}

function isPlainJson(value: JsonPropertyType): value is Json {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
