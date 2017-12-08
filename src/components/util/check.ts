export function isNotNil(value: undefined | null | string | number | boolean): boolean {
  return (typeof(value) !== 'undefined') && value !== null;
}
