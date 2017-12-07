import { Directive, ElementRef, HostBinding, Input, NgZone, Renderer2 } from '@angular/core';
import { reqAnimFrame } from '../core/polyfill/request-animation';
import { toBoolean } from '../util/convert';

export type NzTabPositionMode = 'horizontal' | 'vertical';

@Directive({
  selector: '[nz-tabs-ink-bar]',
  host: {
    '[class.ant-tabs-ink-bar]': 'true'
  }
})
export class NzTabsInkBarDirective {
  private _animated = false;

  @Input()
  @HostBinding('class.ant-tabs-ink-bar-animated')
  set nzAnimated(value: boolean) {
    this._animated = toBoolean(value);
  }

  get nzAnimated(): boolean {
    return this._animated;
  }

  @Input() nzPositionMode: NzTabPositionMode = 'horizontal';

  constructor(private _renderer: Renderer2,
              private _elementRef: ElementRef,
              private _ngZone: NgZone) {
  }

  alignToElement(element: HTMLElement): void {
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

  setDisplay(value: string): void {
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
