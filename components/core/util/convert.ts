/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { coerceBooleanProperty, coerceCssPixelValue, _isNumberValue } from '@angular/cdk/coercion';

import { warn } from '../logger/logger';
import { FunctionProp } from '../types/common-wrap';

export function toBoolean(value: boolean | string): boolean {
  return coerceBooleanProperty(value);
}

export function toNumber(value: number | string): number;
export function toNumber<D>(value: number | string, fallback: D): number | D;
export function toNumber(value: number | string, fallbackValue: number = 0): number {
  return _isNumberValue(value) ? Number(value) : fallbackValue;
}

export function toCssPixel(value: number | string): string {
  return coerceCssPixelValue(value);
}

// tslint:disable no-any
// tslint:disable no-invalid-this

/**
 * Get the function-property type's value
 */
export function valueFunctionProp<T>(prop: FunctionProp<T>, ...args: any[]): T {
  return typeof prop === 'function' ? prop(...args) : prop;
}

function propDecoratorFactory<T, D>(name: string, fallback: (v: T) => D): (target: any, propName: string) => void {
  function propDecorator(target: any, propName: string, originalDescriptor?: TypedPropertyDescriptor<any>): any {
    const privatePropName = `$$__${propName}`;

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
export function InputBoolean(): any {
  return propDecoratorFactory('InputBoolean', toBoolean);
}

export function InputCssPixel(): any {
  return propDecoratorFactory('InputCssPixel', toCssPixel);
}

export function InputNumber(): any {
  // tslint:disable-line: no-any
  return propDecoratorFactory('InputNumber', toNumber);
}
