/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { TemplateRef } from '@angular/core';

import { Color } from './src/interfaces/color';

export type NzColorPickerFormatType = 'rgb' | 'hex' | 'hsb';

export type NzColorPickerTriggerType = 'click' | 'hover';

export interface ValidForm {
  isFormat: NzColorPickerFormatType | null;
  hex: string | null;
  hsbH: number;
  hsbS: number;
  hsbB: number;
  rgbR: number;
  rgbG: number;
  rgbB: number;
  roundA: number;
}

export type ValidFormKey = keyof ValidForm;

export interface NzColor extends Color {}

export interface NzPresetColor {
  label: TemplateRef<void> | string;
  colors: Array<string | NzColor>;
  defaultOpen?: boolean;
  key?: string | number;
}
