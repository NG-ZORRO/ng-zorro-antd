/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

export function getOffsetTop(element: HTMLElement, container: HTMLElement | Window): number {
  if (!element || !element.getClientRects().length) {
    return 0;
  }
  const rect = element.getBoundingClientRect();

  if (rect.width || rect.height) {
    if (container === window) {
      const documentElement = element.ownerDocument!.documentElement!;
      return rect.top - documentElement.clientTop;
    }
    return rect.top - (container as HTMLElement).getBoundingClientRect().top;
  }

  return rect.top;
}
