/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

export type NzJustify =
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

export type NzAlign =
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

export type NzGap = 'small' | 'middle' | 'large' | NzCustomGap;
export type NzCustomGap = number | string;

export type NzWrap = 'wrap' | 'nowrap' | 'wrap-reverse';

export type NzFlex = `${NzFlexShrink} ${NzFlexGrow} ${NzFlexBasis}` | 'unset';
export type NzFlexShrink = number;
export type NzFlexGrow = number;
export type NzFlexBasis = string;
