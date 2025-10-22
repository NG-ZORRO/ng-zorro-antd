/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * @description Replace `{`, `}`, `@` to html entities
 */
export function angularNonBindAble(content: string): string {
  return content.replace(/{/g, '&#123;').replace(/}/g, '&#125;').replace(/@/g, '&#64;');
}
