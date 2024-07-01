/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * Sync from rc-util [https://github.com/react-component/util]
 */
export function canUseDom(): boolean {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}
