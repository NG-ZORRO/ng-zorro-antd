import { Injectable } from '@angular/core';

@Injectable()
export class NzSliderService {

  pauseEvent(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  getPrecision(num) {
    const numStr = num.toString(), dotIndex = numStr.indexOf('.');
    return dotIndex >= 0 ? numStr.length - dotIndex - 1 : 0;
  }

  cloneArray(arr: Array<any>) {
    return arr.slice();
  }

  isNotTouchEvent(e: TouchEvent) {
    return !e.touches || e.touches.length > 1 ||
      (e.type.toLowerCase() === 'touchend' && e.touches.length > 0);
  }

  // convert value to offset in percent
  valueToOffset(min, max, value: number) {
    return (value - min) / (max - min) * 100;
  }

  correctNumLimit(num, min, max) {
    if (isNaN(num = +num)) { return min; }
    if (num < min) { num = min; } else if (num > max) { num = max; }
    return num;
  }

  /**
   * get the offset of an element relative to the document (Reference from jquery's offset())
   * @param elem HTMLElement ref
   */
  getElementOffset(elem: HTMLElement) {
    // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
    if (!elem.getClientRects().length) {
      return { top: 0, left: 0 };
    }
    // Get document-relative position by adding viewport scroll to viewport-relative gBCR
    const
      rect = elem.getBoundingClientRect(),
      win = elem.ownerDocument.defaultView;
    return {
      top: rect.top + win.pageYOffset,
      left: rect.left + win.pageXOffset
    };
  }

}
