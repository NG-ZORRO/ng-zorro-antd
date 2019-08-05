/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgStyleInterface } from 'ng-zorro-antd/core';

/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

export type NzProgressGapPositionType = 'top' | 'bottom' | 'left' | 'right';

export type NzProgressStatusType = 'success' | 'exception' | 'active' | 'normal';

export type NzProgressTypeType = 'line' | 'circle' | 'dashboard';

export interface NzProgressGradientProgress {
  [percent: string]: string;
}

export interface NzProgressGradientFromTo {
  from: string;
  to: string;
}

export type NzProgressColorGradient = { direction?: string } & (NzProgressGradientProgress | NzProgressGradientFromTo);

export type NzProgressStrokeColorType = string | NzProgressColorGradient;

export type NzProgressStrokeLinecapType = 'round' | 'square';

export type NzProgressFormatter = (percent: number) => string;

export interface NzProgressCirclePath {
  stroke: string | null;
  strokePathStyle: NgStyleInterface;
}
