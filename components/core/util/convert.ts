import { coerceBooleanProperty, coerceCssPixelValue, _isNumberValue } from '@angular/cdk/coercion';
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

// Get the function-property type's value
export function valueFunctionProp<T>(prop: FunctionProp<T>, ...args: any[]): T { // tslint:disable-line: no-any
  return typeof prop === 'function' ? prop(...args) : prop;
}

// tslint:disable-next-line: no-any
function propDecoratorFactory<T, D>(name: string, fallback: (v: T) => D): (target: any, propName: string) => void {

  // tslint:disable-next-line: no-any
  function propDecorator(target: any, propName: string): void {
    const privatePropName = `$$__${propName}`;

    if (Object.prototype.hasOwnProperty.call(target, privatePropName)) {
      console.warn(`The prop "${privatePropName}" is already exist, it will be overrided by ${name} decorator.`);
    }

    Object.defineProperty(target, privatePropName, {
      configurable: true,
      writable    : true
    });

    Object.defineProperty(target, propName, {
      get(): string {
        return this[ privatePropName ]; // tslint:disable-line:no-invalid-this
      },
      set(value: T): void {
        this[ privatePropName ] = fallback(value); // tslint:disable-line:no-invalid-this
      }
    });
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
 * // get visible() { return this.__visibile; }
 * // set visible(value) { this.__visible = value; }
 * // __visible = false;
 * ```
 */
export function InputBoolean(): any { // tslint:disable-line: no-any
  return propDecoratorFactory('InputBoolean', toBoolean);
}

export function InputCssPixel(): any { // tslint:disable-line: no-any
  return propDecoratorFactory('InputCssPixel', toCssPixel);
}

export function InputNumber(): any { // tslint:disable-line: no-any
  return propDecoratorFactory('InputNumber', toNumber);
}
