import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';

export function toBoolean(value: boolean | string): boolean {
  return coerceBooleanProperty(value);
}

export function toNumber(value: number | string): number {
  return coerceNumberProperty(value);
}
