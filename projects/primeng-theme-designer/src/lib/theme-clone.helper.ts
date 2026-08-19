export function cloneTheme<T>(value: T, seen = new WeakMap<object, unknown>()): T {
  if (value === null || typeof value !== 'object') {
    return value;
  }

  const source = value as object;
  const existingClone = seen.get(source);
  if (existingClone) {
    return existingClone as T;
  }

  if (value instanceof Date) {
    return new Date(value.getTime()) as T;
  }

  if (Array.isArray(value)) {
    const clone: unknown[] = [];
    seen.set(source, clone);
    for (const item of value) {
      clone.push(cloneTheme(item, seen));
    }
    return clone as T;
  }

  const clone = Object.create(Object.getPrototypeOf(source)) as Record<PropertyKey, unknown>;
  seen.set(source, clone);
  for (const key of Reflect.ownKeys(source)) {
    const descriptor = Object.getOwnPropertyDescriptor(source, key);
    if (!descriptor) {
      continue;
    }
    if ('value' in descriptor) {
      descriptor.value = cloneTheme(descriptor.value, seen);
    }
    Object.defineProperty(clone, key, descriptor);
  }
  return clone as T;
}
