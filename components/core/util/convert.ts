/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { coerceBooleanProperty, coerceCssPixelValue, coerceNumberProperty } from '@angular/cdk/coercion';
import { numberAttribute } from '@angular/core';

import { warn } from 'ng-zorro-antd/core/logger';
import { FunctionProp, NzSafeAny } from 'ng-zorro-antd/core/types';

export function toBoolean(value: unknown): boolean {
  return coerceBooleanProperty(value);
}

export function numberAttributeWithZeroFallback(value: unknown): number {
  return numberAttribute(value, 0);
}

export function numberAttributeWithOneFallback(value: unknown): number {
  return numberAttribute(value, 1);
}

export function numberAttributeWithInfinityFallback(value: unknown): number {
  return numberAttribute(value, Infinity);
}

export function toNumber(value: number | string): number;
export function toNumber<D>(value: number | string, fallback: D): number | D;
export function toNumber(value: number | string, fallbackValue: number = 0): number {
  return coerceNumberProperty(value, fallbackValue);
}

export function toCssPixel(value: number | string): string {
  return coerceCssPixelValue(value);
}

export function toCssPixelNumber(value: number | string): number {
  return toNumber(typeof value === 'string' ? value.replace('px', '') : value);
}

// eslint-disable  no-invalid-this

/**
 * Get the function-property type's value
 */
export function valueFunctionProp<T>(prop: FunctionProp<T> | T, ...args: NzSafeAny[]): T {
  return typeof prop === 'function' ? (prop as FunctionProp<T>)(...args) : prop;
}

function propDecoratorFactory<T, D>(
  name: string,
  fallback: (v: T) => D
): (target: NzSafeAny, propName: string) => void {
  function propDecorator(
    target: NzSafeAny,
    propName: string,
    originalDescriptor?: TypedPropertyDescriptor<NzSafeAny>
  ): NzSafeAny {
    const privatePropName = `$$__zorroPropDecorator__${propName}`;

    if (Object.prototype.hasOwnProperty.call(target, privatePropName)) {
      warn(`The prop "${privatePropName}" is already exist, it will be overrided by ${name} decorator.`);
    }

    Object.defineProperty(target, privatePropName, {
      configurable: true,
      writable: true
    });

    return {
      get(): string {
        return originalDescriptor && originalDescriptor.get
          ? originalDescriptor.get.bind(this)()
          : this[privatePropName];
      },
      set(value: T): void {
        if (originalDescriptor && originalDescriptor.set) {
          originalDescriptor.set.bind(this)(fallback(value));
        }
        this[privatePropName] = fallback(value);
      }
    };
  }

  return propDecorator;
}

/**
 * @deprecated Use input transform instead: `@Input({ transform })`
 *
 * Input decorator that handle a prop to do get/set automatically with toBoolean
 *
 * Why not using @InputBoolean alone without @Input? AOT needs @Input to be visible
 *
 * @howToUse
 * ```
 * @Input() @InputBoolean() visible: boolean = false;
 *
 * // Act as below:
 * // @Input()
 * // get visible() { return this.__visible; }
 * // set visible(value) { this.__visible = value; }
 * // __visible = false;
 * ```
 */
export function InputBoolean(): NzSafeAny {
  return propDecoratorFactory('InputBoolean', toBoolean);
}

/**
 * @deprecated Use input transform instead: `@Input({ transform })`
 */
export function InputCssPixel(): NzSafeAny {
  return propDecoratorFactory('InputCssPixel', toCssPixel);
}

/**
 * @deprecated Use input transform instead: `@Input({ transform })`
 */
export function InputNumber(fallbackValue?: NzSafeAny): NzSafeAny {
  return propDecoratorFactory('InputNumber', (value: string | number) => toNumber(value, fallbackValue));
}
