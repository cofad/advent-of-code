export function clone<T>(a: T): T {
  return structuredClone(a);
}
