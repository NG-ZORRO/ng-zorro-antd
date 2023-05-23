/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

export const tuple = <T extends string[]>(...args: T): T => args;

// https://github.com/Microsoft/TypeScript/issues/29729
export type NzStringLiteralUnion<T extends string> = T | (string & {});
