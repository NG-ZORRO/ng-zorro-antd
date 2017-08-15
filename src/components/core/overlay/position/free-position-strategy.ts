 import { PositionStrategy } from './position-strategy';

 /**
 * Free position strategy for overlay without origin
 * @author lingyi.zcs
 */
export class FreePositionStrategy implements PositionStrategy {
  private _wrapper: HTMLElement;
  // private _cssPosition: string = '';
  // private _top: string = '';
  // private _left: string = '';
  // private _width: string = '';
  // private _height: string = '';

  // cssPosition(value: string) {
  //   this._cssPosition = value;
  //   return this;
  // }

  // top(value: number | string): this {
  //   this._top = this._toCssValue(value);
  //   return this;
  // }

  // left(value: number | string): this {
  //   this._left = this._toCssValue(value);
  //   return this;
  // }

  // width(value: number | string): this {
  //   this._width = this._toCssValue(value);
  //   return this;
  // }

  // height(value: number | string): this {
  //   this._height = this._toCssValue(value);
  //   return this;
  // }

  /**
   * Apply the position to the element. (NOTE: normally will triggered by scrolling)
   * @docs-private
   *
   * @param element Element to which to apply the CSS.
   * @returns Resolved when the styles have been applied.
   */
  apply(element: HTMLElement): void {
    if (!this._wrapper) {
      this._wrapper = document.createElement('div');
      this._wrapper.classList.add('cdk-free-overlay-wrapper');
      element.parentNode.insertBefore(this._wrapper, element);
      this._wrapper.appendChild(element);

      // // Initialized style once
      // const style = element.style;
      // style.position = this._cssPosition;
      // style.top = this._top;
      // style.left = this._left;
      // style.width = this._width;
      // style.height = this._height;
    }

    // TODO: do somethings while triggered (eg. by scrolling)
  }

  /**
   * Removes the wrapper element from the DOM.
   */
  dispose(): void {
    if (this._wrapper && this._wrapper.parentNode) {
      this._wrapper.parentNode.removeChild(this._wrapper);
      this._wrapper = null;
    }
  }

  // private _toCssValue(value: number | string) {
  //   return typeof value === 'number' ? value + 'px' : value;
  // }

}
