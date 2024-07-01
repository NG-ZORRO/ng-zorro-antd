/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

export type NzMark = string | NzMarkObj;

export interface NzMarkObj {
  style?: object;
  label: string;
}

export class NzMarks {
  [key: string]: NzMark;
}

/**
 * Processed steps that would be passed to sub components.
 */
export interface NzExtendedMark {
  value: number;
  offset: number;
  config: NzMark;
}

/**
 * Marks that would be rendered.
 */
export interface NzDisplayedMark extends NzExtendedMark {
  active: boolean;
  label: string;
  style?: object;
}

/**
 * Steps that would be rendered.
 */
export interface NzDisplayedStep extends NzExtendedMark {
  active: boolean;
  style?: object;
}

export type NzSliderShowTooltip = 'always' | 'never' | 'default';

export type NzSliderValue = number[] | number;

export interface NzSliderHandler {
  offset: number | null;
  value: number | null;
  active: boolean;
}
