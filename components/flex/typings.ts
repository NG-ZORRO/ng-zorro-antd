/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

export type nzDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

export type nzJustify =
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'start'
  | 'end'
  | 'right'
  | 'left'
  | 'stretch'
  | 'normal';

export type nzAlign =
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'start'
  | 'end'
  | 'right'
  | 'left'
  | 'stretch'
  | 'normal';

export type nzGap = 'small' | 'middle' | 'large' | nzCustomGap;
export type nzCustomGap = number;

export type nzWrap = 'wrap' | 'nowrap' | 'wrap-reverse';

export type nzFlex = `${nzFlexShrink} ${nzFlexGrow} ${nzFlexBasis}` | 'unset';
export type nzFlexShrink = number;
export type nzFlexGrow = number;
export type nzFlexBasis = number | `${number}px` | `${number}rem` | `${number}%` | 'auto';
