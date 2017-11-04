import { Directive, Renderer2, ElementRef, NgZone, HostBinding, Input } from '@angular/core';
import { reqAnimFrame } from '../core/polyfill/request-animation';

export type NzTabPositionMode = 'horizontal' | 'vertical';

@Directive({
  selector: '[nz-tabs-ink-bar]',
})
export class NzTabsInkBarDirective {
  @HostBinding('class.ant-tabs-ink-bar') _nzTabsInkBar = true
  @Input() @HostBinding('class.ant-tabs-ink-bar-animated') nzAnimated: boolean;

  @Input() nzPositionMode: NzTabPositionMode = 'horizontal';

  constructor(private _renderer: Renderer2,
              private _elementRef: ElementRef,
              private _ngZone: NgZone) {
  }

  alignToElement(element: HTMLElement) {
    this.show();

    this._ngZone.runOutsideAngular(() => {
      reqAnimFrame(() => {
        /** when horizontal remove height style and add transfrom left **/
        if (this.nzPositionMode === 'horizontal') {
          this._renderer.removeStyle(this._elementRef.nativeElement, 'height');
          this._renderer.setStyle(this._elementRef.nativeElement, 'transform',
            `translate3d(${this._getLeftPosition(element)}, 0px, 0px)`);
          this._renderer.setStyle(this._elementRef.nativeElement, 'width',
            this._getElementWidth(element));
        } else {
          /** when vertical remove width style and add transfrom top **/
          this._renderer.removeStyle(this._elementRef.nativeElement, 'width');
          this._renderer.setStyle(this._elementRef.nativeElement, 'transform',
            `translate3d(0px, ${this._getTopPosition(element)}, 0px)`);
          this._renderer.setStyle(this._elementRef.nativeElement, 'height',
            this._getElementHeight(element));
        }
      });
    });
  }

  show(): void {
    this._renderer.setStyle(this._elementRef.nativeElement, 'visibility', 'visible');
  }

  setDisplay(value): void {
    this._renderer.setStyle(this._elementRef.nativeElement, 'display', value);
  }

  hide(): void {
    this._renderer.setStyle(this._elementRef.nativeElement, 'visibility', 'hidden');
  }

  _getLeftPosition(element: HTMLElement): string {
    return element ? element.offsetLeft + 'px' : '0';
  }

  _getElementWidth(element: HTMLElement): string {
    return element ? element.offsetWidth + 'px' : '0';
  }

  _getTopPosition(element: HTMLElement): string {
    return element ? element.offsetTop + 'px' : '0';
  }

  _getElementHeight(element: HTMLElement): string {
    return element ? element.offsetHeight + 'px' : '0';
  }
}
