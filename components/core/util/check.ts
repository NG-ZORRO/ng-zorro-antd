export function isNotNil(value: undefined | null | string | number | boolean): boolean {
  return (typeof(value) !== 'undefined') && value !== null;
}

/** 校验对象是否相等 */
export function shallowEqual(objA: {}, objB: {}): boolean {
  if (objA === objB) return true;

  if (typeof objA !== 'object' || !objA || typeof objB !== 'object' || !objB) return false;

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  const bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

  // tslint:disable-next-line:prefer-for-of
  for (let idx = 0; idx < keysA.length; idx++) {
    const key = keysA[idx];
    if (!bHasOwnProperty(key)) return false;
    if (objA[key] !== objB[key]) return false;
  }

  return true;
}

export function isInteger(value: string | number): boolean {
  return typeof value === 'number' &&
    isFinite(value) &&
    Math.floor(value) === value;
}
