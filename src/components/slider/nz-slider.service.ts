import { Injectable } from '@angular/core';

@Injectable()
export class NzSliderService {

  pauseEvent(e: Event): void {
    e.stopPropagation();
    e.preventDefault();
  }

  getPrecision(num: number): number {
    const numStr = num.toString();
    const dotIndex = numStr.indexOf('.');
    return dotIndex >= 0 ? numStr.length - dotIndex - 1 : 0;
  }

  cloneArray<T>(arr: T[]): T[] {
    return arr.slice();
  }

  isNotTouchEvent(e: TouchEvent): boolean {
    return !e.touches || e.touches.length > 1 ||
      (e.type.toLowerCase() === 'touchend' && e.touches.length > 0);
  }

  // convert value to offset in percent
  valueToOffset(min: number, max: number, value: number): number {
    return (value - min) / (max - min) * 100;
  }

  correctNumLimit(num: number, min: number, max: number): number {
    let res = +num;
    if (isNaN(res)) { return min; }
    if (num < min) { res = min; } else if (num > max) { res = max; }
    return res;
  }

  /**
   * get the offset of an element relative to the document (Reference from jquery's offset())
   * @param elem HTMLElement ref
   */
  getElementOffset(elem: HTMLElement): { top: number, left: number } {
    // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
    // Support: IE <=11 only
    // Running getBoundingClientRect on a
    // disconnected node in IE throws an error
    if (!elem.getClientRects().length) {
      return { top: 0, left: 0 };
    }
    // Get document-relative position by adding viewport scroll to viewport-relative gBCR
    const rect = elem.getBoundingClientRect();
    const win = elem.ownerDocument.defaultView;
    return {
      top: rect.top + win.pageYOffset,
      left: rect.left + win.pageXOffset
    };
  }

}
