import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';

export function toBoolean(value: boolean | string): boolean {
  return coerceBooleanProperty(value);
}

export function toNumber<D>(value: number | string, fallback: D): number | D {
  return coerceNumberProperty(value, fallback);
}
