/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

export interface PaginationItemRenderContext {
  $implicit: PaginationItemType;
  page: number;
}

export type PaginationItemType = 'page' | 'prev' | 'next' | 'prev_5' | 'next_5';
