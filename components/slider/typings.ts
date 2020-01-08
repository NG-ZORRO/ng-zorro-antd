/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

export type Mark = string | MarkObj;

export interface MarkObj {
  style?: object;
  label: string;
}

export type NzMarks = Marks;

export class Marks {
  [key: number]: Mark;
}

/**
 * Processed steps that would be passed to sub components.
 */
export interface ExtendedMark {
  value: number;
  offset: number;
  config: Mark;
}

/**
 * Marks that would be rendered.
 */
export interface DisplayedMark extends ExtendedMark {
  active: boolean;
  label: string;
  style?: object;
}

/**
 * Steps that would be rendered.
 */
export interface DisplayedStep extends ExtendedMark {
  active: boolean;
  style?: object;
}

export type SliderShowTooltip = 'always' | 'never' | 'default';

export type SliderValue = number[] | number;

export interface SliderHandler {
  offset: number | null;
  value: number | null;
  active: boolean;
}

export function isValueARange(value: SliderValue): value is number[] {
  if (value instanceof Array) {
    return value.length === 2;
  } else {
    return false;
  }
}

export function isConfigAObject(config: Mark): config is MarkObj {
  return config instanceof Object;
}
