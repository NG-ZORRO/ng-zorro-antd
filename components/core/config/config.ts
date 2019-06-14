/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

// NOTE: Everything here should be **optional**.

import { InjectionToken, TemplateRef, Type } from '@angular/core';
import { NzCascaderService } from 'ng-zorro-antd/cascader';

import { Breakpoint } from '../responsive/public-api';

export interface NzConfig {
  nzAffix?: NzAffixConfig;
  // nzAlert?: NzAlertConfig;
  // nzAnchor?: NzAnchorConfig;
  nzButton?: NzButtonConfig;
  nzCard?: NzCardConfig;
  nzCarousel?: NzCarouselConfig;
  nzCascader?: NzCascaderService;
  nzDescriptions?: NzDescriptionsConfig;
  nzEmpty?: NzEmpty;
  nzIcon?: NzIconConfig;
  nzMessage?: NzMessageConfig;
  nzNotification?: NzNotificationConfig;
}

export interface NzAffixConfig {
  nzOffsetBottom?: number;
  nzOffsetTop?: number;
}

// export interface NzAlertConfig {}

// export interface NzAnchorConfig {}

export interface NzButtonConfig {
  nzSize?: 'large' | 'default' | 'small';
  nzBlock?: boolean;
}

export interface NzCardConfig {
  nzSize?: string;
}

export interface NzCarouselConfig {
  nzAutoPlay?: boolean;
  nzAutoPlaySpeed?: boolean;
  nzDots?: boolean;
  nzEffect?: 'scrollx' | 'fade' | string;
  nzEnableSwipe?: boolean;
  nzVertical?: boolean;
}

export interface NzCascaderConfig {
  nzSize?: string;
}

export interface NzDescriptionsConfig {
  nzBorder?: boolean;
  nzColumn?: { [key in Breakpoint]: number } | number;
  // TODO(wendell): make this size options a type
  nzSize?: 'default' | 'middle' | 'small';
}

export interface NzEmpty {
  // tslint:disable-next-line no-any
  nzDefaultEmptyContent?: Type<any> | TemplateRef<string> | string | undefined;
}

export interface NzIconConfig {
  nzTheme?: 'fill' | 'outline' | 'twotone';
  nzTwotoneColor?: string;
}

export interface NzMessageConfig {
  nzAnimate?: boolean;
  nzDuration?: number;
  nzMaxStack?: number;
  nzPauseOnHover?: boolean;
  nzTop?: number | string;
}

export interface NzNotificationConfig extends NzMessageConfig {
  nzTop?: string | number;
  nzBottom?: string | number;
  nzPlacement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | string;
}

/**
 * User should provide an object implements this interface to set global configurations.
 */
export const NZ_CONFIG = new InjectionToken<NzConfig>('nz-config');
