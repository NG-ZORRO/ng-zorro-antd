/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NzSafeAny } from 'ng-zorro-antd/core/types';

export const statusColors = ['success', 'processing', 'error', 'default', 'warning'] as const;

export const presetColors = [
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime'
] as const;

export type NzPresetColor = (typeof presetColors)[number];
export type NzStatusColor = (typeof statusColors)[number];

export function isPresetColor(color: string): color is NzPresetColor {
  return presetColors.indexOf(color as NzSafeAny) !== -1;
}

export function isStatusColor(color: string): color is NzPresetColor {
  return statusColors.indexOf(color as NzSafeAny) !== -1;
}
