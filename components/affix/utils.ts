/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

export interface SimpleRect {
  top: number;
  left: number;
  width?: number;
  height?: number;
  bottom?: number;
}

export function isTargetWindow(target: Element | Window): target is Window {
  return typeof window !== 'undefined' && target === window;
}

export function getTargetRect(target: Element | Window): SimpleRect {
  return !isTargetWindow(target)
    ? target.getBoundingClientRect()
    : {
        top: 0,
        left: 0,
        bottom: 0
      };
}
