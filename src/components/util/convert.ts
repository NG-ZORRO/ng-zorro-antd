export function toBoolean(value: boolean | string) {
  return value === '' || (value && value !== 'false');
}
