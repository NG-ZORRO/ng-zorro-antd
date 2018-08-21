import { coerceBooleanProperty, coerceCssPixelValue, coerceNumberProperty } from '@angular/cdk/coercion';
import { FunctionProp } from '../types/common-wrap';

export function toBoolean(value: boolean | string): boolean {
  return coerceBooleanProperty(value);
}

export function toNumber<D>(value: number | string, fallback: D): number | D {
  return coerceNumberProperty(value, fallback);
}

export function toCssPixel(value: number | string): string {
  return coerceCssPixelValue(value);
}

// Get the funciton-property type's value
export function valueFunctionProp<T>(prop: FunctionProp<T>, ...args: any[]): T { // tslint:disable-line: no-any
  return typeof prop === 'function' ? prop(...args) : prop;
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
 * // get visible() { return this.__visibile; }
 * // set visible(value) { this.__visible = value; }
 * // __visible = false;
 * ```
 */
export function InputBoolean(): any { // tslint:disable-line:no-any
  return function InputBooleanPropDecorator (target: object, name: string): void {
    // Add our own private prop
    const privatePropName = `$$__${name}`;

    if (Object.prototype.hasOwnProperty.call(target, privatePropName)) {
      console.warn(`The prop "${privatePropName}" is already exist, it will be overrided by InputBoolean decorator.`);
    }

    Object.defineProperty(target, privatePropName, {
      configurable: true,
      writable: true
    });

    Object.defineProperty(target, name, {
      get(): boolean {
        return this[ privatePropName ]; // tslint:disable-line:no-invalid-this
      },
      set(value: boolean | string): void {
        this[ privatePropName ] = toBoolean(value); // tslint:disable-line:no-invalid-this
      }
    });

    // // Do rest things for input decorator
    // const inputDecorator = Input();
    // inputDecorator(target, name);
  };
}
