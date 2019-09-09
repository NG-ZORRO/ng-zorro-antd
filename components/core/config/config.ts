/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { InjectionToken, TemplateRef, Type } from '@angular/core';

import { NzAlignType, NzFourDirectionType, NzShapeSCType, NzSizeDSType, NzSizeLDSType, NzSizeMDSType } from '../types';

import { BreakpointMap, NzBreakpoint } from '../responsive/public-api';

// TODO: generate config files if custom build can be used.

export interface NzConfig {
  affix?: AffixConfig;
  alert?: AlertConfig;
  anchor?: AnchorConfig;
  avatar?: AvatarConfig;
  backTop?: BackTopConfig;
  badge?: BadgeConfig;
  button?: ButtonConfig;
  card?: CardConfig;
  carousel?: CarouselConfig;
  cascader?: CascaderConfig;
  collapse?: CollapseConfig;
  collapsePanel?: CollapsePanelConfig;
  descriptions?: DescriptionsConfig;
  drawer?: DrawerConfig;
  empty?: EmptyConfig;
  form?: FormConfig;
  grid?: GridConfig;
  icon?: IconConfig;
  modal?: ModalConfig;
  message?: MessageConfig;
  notification?: NotificationConfig;
  progress?: ProgressConfig;
  rate?: RateConfig;
  switch?: SwitchConfig;
  table?: TableConfig;
  tabs?: TabsConfig;
  timePicker?: TimePickerConfig;
  tree?: TreeConfig;
  treeSelect?: TreeSelectConfig;
  typography?: TypographyConfig;
}

export interface AffixConfig {
  nzOffsetBottom?: number;
  nzOffsetTop?: number;
}

export interface AlertConfig {
  nzCloseable?: boolean;
  nzShowIcon?: boolean;
}

export interface AvatarConfig {
  nzShape?: NzShapeSCType;
  nzSize?: NzSizeLDSType | number;
}

export interface AnchorConfig {
  nzBounds?: number;
  nzOffsetBottom?: number;
  nzOffsetTop?: number;
  nzShowInkInFixed?: boolean;
}

export interface BackTopConfig {
  nzVisibilityHeight?: number;
}

export interface BadgeConfig {
  nzColor?: number;
  nzOverflowCount?: number;
  nzShowZero?: number;
}

export interface ButtonConfig {
  nzSize?: 'large' | 'default' | 'small';
}

export interface CardConfig {
  nzSize?: NzSizeDSType;
  nzHoverable?: boolean;
  nzBordered?: boolean;
}

export interface CarouselConfig {
  nzAutoPlay?: boolean;
  nzAutoPlaySpeed?: boolean;
  nzDots?: boolean;
  nzEffect?: 'scrollx' | 'fade' | string;
  nzEnableSwipe?: boolean;
  nzVertical?: boolean;
}

export interface CascaderConfig {
  nzSize?: string;
}

export interface CollapseConfig {
  nzAccordion?: boolean;
  nzBordered?: boolean;
}

export interface CollapsePanelConfig {
  nzShowArrow?: boolean;
}

export interface DescriptionsConfig {
  nzBorder?: boolean;
  nzColumn?: { [key in NzBreakpoint]?: number } | number;
  nzSize?: 'default' | 'middle' | 'small';
  nzColon?: boolean;
}

export interface DrawerConfig {
  nzMask?: boolean;
  nzMaskClosable?: boolean;
}

export interface EmptyConfig {
  // tslint:disable-next-line no-any
  nzDefaultEmptyContent?: Type<any> | TemplateRef<string> | string | undefined;
}

export interface FormConfig {
  nzNoColon?: boolean;
}

export interface GridConfig {
  nzAlign?: NzAlignType;
  nzGutter?: number | BreakpointMap;
  nzJustify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
  nzType?: 'flex';
}

export interface IconConfig {
  nzTheme?: 'fill' | 'outline' | 'twotone';
  nzTwotoneColor?: string;
}

export interface MessageConfig {
  nzAnimate?: boolean;
  nzDuration?: number;
  nzMaxStack?: number;
  nzPauseOnHover?: boolean;
  nzTop?: number | string;
}

export interface ModalConfig {
  nzMask?: boolean;
  nzMaskClosable?: boolean;
}

export interface NotificationConfig extends MessageConfig {
  nzTop?: string | number;
  nzBottom?: string | number;
  nzPlacement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | string;
}

export interface ProgressConfig {
  nzGapDegree?: number;
  nzGapPosition?: 'top' | 'right' | 'bottom' | 'left';
  nzShowInfo?: boolean;
  nzStrokeSwitch?: number;
  nzStrokeWidth?: number;
  nzSize?: 'default' | 'small';
  nzStrokeLinecap?: 'round' | 'square';
  nzStrokeColor?: string;
}

export interface RateConfig {
  nzAllowClear?: boolean;
  nzAllowHalf?: boolean;
}

export interface SwitchConfig {
  nzSize: NzSizeDSType;
}

export interface TableConfig {
  nzBordered?: boolean;
  nzSize?: NzSizeMDSType;
  nzShowQuickJumper?: boolean;
  nzShowSizeChanger?: boolean;
  nzSimple?: boolean;
  nzHideOnSinglePage?: boolean;
}

export interface TabsConfig {
  nzAnimated?:
    | boolean
    | {
        inkBar: boolean;
        tabPane: boolean;
      };
  nzSize?: NzSizeLDSType;
  nzType?: 'line' | 'card';
  nzTabBarGutter?: number;
  nzShowPagination?: boolean;
}

export interface TimePickerConfig {
  nzAllowEmpty?: boolean;
  nzClearText?: string;
  nzFormat?: string;
  nzHourStep?: number;
  nzMinuteStep?: number;
  nzSecondStep?: number;
  nzPopupClassName?: string;
  nzUse12Hours?: string;
}

export interface TreeConfig {
  nzBlockNode?: boolean;
  nzShowIcon?: boolean;
  nzHideUnMatched?: boolean;
}

export interface TreeSelectConfig {
  nzShowIcon?: string;
  nzShowLine?: boolean;
  nzDropdownMatchSelectWidth?: boolean;
  nzHideUnMatched?: boolean;
  nzSize?: 'large' | 'small' | 'default';
}

export interface TypographyConfig {
  nzEllipsisRows?: number;
}

export type NzConfigKey = keyof NzConfig;

/**
 * User should provide an object implements this interface to set global configurations.
 */
export const NZ_CONFIG = new InjectionToken<NzConfig>('nz-config');
