/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { DOCUMENT, inject, Injectable, NgZone } from '@angular/core';

import { requestAnimationFrame } from 'ng-zorro-antd/core/polyfill';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

export type EasyingFn = (t: number, b: number, c: number, d: number) => number;

function easeInOutCubic(t: number, b: number, c: number, d: number): number {
  const cc = c - b;
  let tt = t / (d / 2);
  if (tt < 1) {
    return (cc / 2) * tt * tt * tt + b;
  } else {
    return (cc / 2) * ((tt -= 2) * tt * tt + 2) + b;
  }
}

export interface NzScrollToOptions {
  /** Scroll container, default as window */
  easing?: EasyingFn;
  /** Scroll end callback */
  callback?(): void;
  /** Animation duration, default as 450 */
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NzScrollService {
  private doc: Document = inject(DOCUMENT);
  private ngZone = inject(NgZone);

  /** Set the position of the scroll bar of `el`. */
  setScrollTop(el: Element | Window, topValue: number = 0): void {
    if (el === window) {
      this.doc.body.scrollTop = topValue;
      this.doc.documentElement!.scrollTop = topValue;
    } else {
      (el as Element).scrollTop = topValue;
    }
  }

  /** Get position of `el` against window. */
  getOffset(el: Element): { top: number; left: number } {
    const ret = {
      top: 0,
      left: 0
    };
    if (!el || !el.getClientRects().length) {
      return ret;
    }

    const rect = el.getBoundingClientRect();
    if (rect.width || rect.height) {
      const doc = el.ownerDocument!.documentElement;
      ret.top = rect.top - doc!.clientTop;
      ret.left = rect.left - doc!.clientLeft;
    } else {
      ret.top = rect.top;
      ret.left = rect.left;
    }

    return ret;
  }

  /** Get the position of the scroll bar of `el`. */
  // TODO: remove '| Window' as the fallback already happens here
  getScroll(target?: Element | HTMLElement | Window | Document | null, top: boolean = true): number {
    if (typeof window === 'undefined') {
      return 0;
    }
    const method = top ? 'scrollTop' : 'scrollLeft';
    let result = 0;
    if (this.isWindow(target)) {
      result = (target as Window)[top ? 'pageYOffset' : 'pageXOffset'];
    } else if (target instanceof Document) {
      result = target.documentElement[method];
    } else if (target) {
      result = (target as HTMLElement)[method];
    }
    if (target && !this.isWindow(target) && typeof result !== 'number') {
      result = ((target as HTMLElement).ownerDocument || (target as Document)).documentElement[method];
    }
    return result;
  }

  isWindow(obj: NzSafeAny): boolean {
    return obj !== null && obj !== undefined && obj === obj.window;
  }

  /**
   * Scroll `el` to some position with animation.
   *
   * @param containerEl container, `window` by default
   * @param y Scroll to `top`, 0 by default
   * @param options Scroll animation options
   */
  scrollTo(
    containerEl?: Element | HTMLElement | Window | Document | null,
    y: number = 0,
    options: NzScrollToOptions = {}
  ): void {
    const target = containerEl ? containerEl : window;
    const scrollTop = this.getScroll(target);
    const startTime = Date.now();
    const { easing, callback, duration = 450 } = options;
    const frameFunc = (): void => {
      const timestamp = Date.now();
      const time = timestamp - startTime;
      const nextScrollTop = (easing || easeInOutCubic)(time > duration ? duration : time, scrollTop, y, duration);
      if (this.isWindow(target)) {
        (target as Window).scrollTo(window.pageXOffset, nextScrollTop);
      } else if (target instanceof HTMLDocument || target.constructor.name === 'HTMLDocument') {
        (target as HTMLDocument).documentElement.scrollTop = nextScrollTop;
      } else {
        (target as HTMLElement).scrollTop = nextScrollTop;
      }
      if (time < duration) {
        requestAnimationFrame(frameFunc);
      } else if (typeof callback === 'function') {
        // Caretaker note: the `frameFunc` is called within the `<root>` zone, but we have to re-enter
        // the Angular zone when calling custom callback to be backwards-compatible.
        this.ngZone.run(callback);
      }
    };
    // Caretaker note: the `requestAnimationFrame` triggers change detection, but updating a `scrollTop` property or
    // calling `window.scrollTo` doesn't require Angular to run `ApplicationRef.tick()`.
    this.ngZone.runOutsideAngular(() => requestAnimationFrame(frameFunc));
  }
}
