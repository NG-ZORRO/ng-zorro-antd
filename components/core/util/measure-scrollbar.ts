/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

let scrollbarVerticalSize: number;
let scrollbarHorizontalSize: number;

// Measure scrollbar width for padding body during modal show/hide
const scrollbarMeasure = {
  position: 'absolute',
  top: '-9999px',
  width: '50px',
  height: '50px'
};

export function measureScrollbar(direction: 'vertical' | 'horizontal' = 'vertical', prefix: string = 'ant'): number {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return 0;
  }
  const isVertical = direction === 'vertical';
  if (isVertical && scrollbarVerticalSize) {
    return scrollbarVerticalSize;
  } else if (!isVertical && scrollbarHorizontalSize) {
    return scrollbarHorizontalSize;
  }
  const scrollDiv = document.createElement('div');
  Object.keys(scrollbarMeasure).forEach(scrollProp => {
    // @ts-ignore
    scrollDiv.style[scrollProp] = scrollbarMeasure[scrollProp];
  });
  // apply hide scrollbar className ahead
  scrollDiv.className = `${prefix}-hide-scrollbar scroll-div-append-to-body`;
  // Append related overflow style
  if (isVertical) {
    scrollDiv.style.overflowY = 'scroll';
  } else {
    scrollDiv.style.overflowX = 'scroll';
  }
  document.body.appendChild(scrollDiv);
  let size = 0;
  if (isVertical) {
    size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    scrollbarVerticalSize = size;
  } else {
    size = scrollDiv.offsetHeight - scrollDiv.clientHeight;
    scrollbarHorizontalSize = size;
  }

  document.body.removeChild(scrollDiv);
  return size;
}
