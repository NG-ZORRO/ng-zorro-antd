export function isNotNil(value: undefined | null | string | number | boolean): boolean {
  return (typeof(value) !== 'undefined') && value !== null;
}

export function isInteger(value: string | number): boolean {
  return typeof value === 'number' &&
    isFinite(value) &&
    Math.floor(value) === value;
}
