/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

export function isStyleSupport(styleName: string | string[]): boolean {
  if (typeof window !== 'undefined' && window.document && window.document.documentElement) {
    const styleNameList = Array.isArray(styleName) ? styleName : [styleName];
    const { documentElement } = window.document;

    return styleNameList.some(name => name in documentElement.style);
  }
  return false;
}
