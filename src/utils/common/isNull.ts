function isNull<T>(arr: (T | null | undefined)[]): arr is T[] {
  return arr.every(v => v === null || v === undefined);
}

export default isNull;