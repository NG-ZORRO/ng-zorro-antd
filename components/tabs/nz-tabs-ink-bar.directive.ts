import { Directive, ElementRef, Input, NgZone, Renderer2 } from '@angular/core';

import { reqAnimFrame } from '../core/polyfill/request-animation';
import { toBoolean } from '../core/util/convert';

import { NzTabPositionMode } from './nz-tabset.component';

@Directive({
  selector: '[nz-tabs-ink-bar]',
  host    : {
    '[class.ant-tabs-ink-bar]'            : 'true',
    '[class.ant-tabs-ink-bar-animated]'   : 'nzAnimated',
    '[class.ant-tabs-ink-bar-no-animated]': '!nzAnimated'
  }
})
export class NzTabsInkBarDirective {
  private _animated = false;

  @Input()
  set nzAnimated(value: boolean) {
    this._animated = toBoolean(value);
  }

  get nzAnimated(): boolean {
    return this._animated;
  }

  @Input() nzPositionMode: NzTabPositionMode = 'horizontal';

  constructor(private renderer: Renderer2,
              private elementRef: ElementRef,
              private ngZone: NgZone) {
  }

  alignToElement(element: HTMLElement): void {
    this.show();

    this.ngZone.runOutsideAngular(() => {
      reqAnimFrame(() => {
        /** when horizontal remove height style and add transform left **/
        if (this.nzPositionMode === 'horizontal') {
          this.renderer.removeStyle(this.elementRef.nativeElement, 'height');
          this.renderer.setStyle(this.elementRef.nativeElement, 'transform',
            `translate3d(${this.getLeftPosition(element)}, 0px, 0px)`);
          this.renderer.setStyle(this.elementRef.nativeElement, 'width',
            this.getElementWidth(element));
        } else {
          /** when vertical remove width style and add transform top **/
          this.renderer.removeStyle(this.elementRef.nativeElement, 'width');
          this.renderer.setStyle(this.elementRef.nativeElement, 'transform',
            `translate3d(0px, ${this.getTopPosition(element)}, 0px)`);
          this.renderer.setStyle(this.elementRef.nativeElement, 'height',
            this.getElementHeight(element));
        }
      });
    });
  }

  show(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'visibility', 'visible');
  }

  setDisplay(value: string): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'display', value);
  }

  getLeftPosition(element: HTMLElement): string {
    return element ? element.offsetLeft + 'px' : '0';
  }

  getElementWidth(element: HTMLElement): string {
    return element ? element.offsetWidth + 'px' : '0';
  }

  getTopPosition(element: HTMLElement): string {
    return element ? element.offsetTop + 'px' : '0';
  }

  getElementHeight(element: HTMLElement): string {
    return element ? element.offsetHeight + 'px' : '0';
  }
}
