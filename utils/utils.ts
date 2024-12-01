export function clone<T>(a: T): T {
  return structuredClone(a);
}

// export function zip<A, B>(
//   a: (A | undefined)[],
//   b: (B | undefined)[]
// ): [(A | undefined), (B | undefined)][] {
//   return Array.from(Array(Math.max(b.length, a.length)), (_, i) => [a[i], b[i]]);
// }

export function zip<A, B>(a: A[], b: B[]): [A, B][] {
  return a.map((a, i) => [a, b[i]]);
}
