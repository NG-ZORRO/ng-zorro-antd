/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/** @docs-private */
export class FakeViewportRuler {
  getViewportRect() {
    return {
      left: 0,
      top: 0,
      width: 1014,
      height: 686,
      bottom: 686,
      right: 1014
    };
  }

  getViewportSize() {
    return { width: 1014, height: 686 };
  }

  getViewportScrollPosition() {
    return { top: 0, left: 0 };
  }
}
