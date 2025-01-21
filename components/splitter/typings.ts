/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

export type NzSplitterLayout = 'horizontal' | 'vertical';
export type NzSplitterCollapsible = boolean | NzSplitterCollapseOption;

export interface NzSplitterCollapseOption {
  start?: boolean;
  end?: boolean;
}
