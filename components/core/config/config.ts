/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { InjectionToken, TemplateRef, Type } from '@angular/core';

import { SafeUrl } from '@angular/platform-browser';
import { ThemeType } from '@ant-design/icons-angular';
import { NzBreakpointEnum } from 'ng-zorro-antd/core/services';
import { NzSafeAny, NzShapeSCType, NzSizeDSType, NzSizeLDSType, NzSizeMDSType, NzTSType } from 'ng-zorro-antd/core/types';

export interface NzConfig {
  affix?: AffixConfig;
  select?: SelectConfig;
  alert?: AlertConfig;
  anchor?: AnchorConfig;
  avatar?: AvatarConfig;
  backTop?: BackTopConfig;
  badge?: BadgeConfig;
  button?: ButtonConfig;
  card?: CardConfig;
  carousel?: CarouselConfig;
  cascader?: CascaderConfig;
  codeEditor?: CodeEditorConfig;
  collapse?: CollapseConfig;
  collapsePanel?: CollapsePanelConfig;
  datePicker?: DatePickerConfig;
  descriptions?: DescriptionsConfig;
  drawer?: DrawerConfig;
  empty?: EmptyConfig;
  form?: FormConfig;
  icon?: IconConfig;
  message?: MessageConfig;
  modal?: ModalConfig;
  notification?: NotificationConfig;
  pageHeader?: PageHeaderConfig;
  pagination?: PaginationConfig;
  progress?: ProgressConfig;
  rate?: RateConfig;
  space?: SpaceConfig;
  spin?: SpinConfig;
  switch?: SwitchConfig;
  table?: TableConfig;
  tabs?: TabsConfig;
  timePicker?: TimePickerConfig;
  tree?: TreeConfig;
  treeSelect?: TreeSelectConfig;
  typography?: TypographyConfig;
}

export interface SelectConfig {
  nzBorderless?: boolean;
  nzSuffixIcon?: TemplateRef<NzSafeAny> | string | null;
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
  nzGap?: number;
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

export interface CodeEditorConfig {
  assetsRoot?: string | SafeUrl;
  defaultEditorOption?: NzSafeAny;
  useStaticLoading?: boolean;

  onLoad?(): void;
  onFirstEditorInit?(): void;
  onInit?(): void;
}

export interface CardConfig {
  nzSize?: NzSizeDSType;
  nzHoverable?: boolean;
  nzBordered?: boolean;
  nzBorderless?: boolean;
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
  nzGhost?: boolean;
}

export interface CollapsePanelConfig {
  nzShowArrow?: boolean;
}

export interface DatePickerConfig {
  nzSeparator?: string;
  nzSuffixIcon?: string | TemplateRef<NzSafeAny>;
}

export interface DescriptionsConfig {
  nzBorder?: boolean;
  nzColumn?: { [key in NzBreakpointEnum]?: number } | number;
  nzSize?: 'default' | 'middle' | 'small';
  nzColon?: boolean;
}

export interface DrawerConfig {
  nzMask?: boolean;
  nzMaskClosable?: boolean;
  nzCloseOnNavigation?: boolean;
}

export interface EmptyConfig {
  nzDefaultEmptyContent?: Type<NzSafeAny> | TemplateRef<string> | string | undefined;
}

export interface FormConfig {
  nzNoColon?: boolean;
  nzAutoTips?: Record<string, Record<string, string>>;
  nzTooltipIcon?: string | { type: string; theme: ThemeType };
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
  nzCloseOnNavigation?: boolean;
}

export interface NotificationConfig extends MessageConfig {
  nzTop?: string | number;
  nzBottom?: string | number;
  nzPlacement?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
}

export interface PageHeaderConfig {
  nzGhost: boolean;
}

export interface PaginationConfig {
  nzSize?: 'default' | 'small';
  nzPageSizeOptions?: number[];
  nzShowSizeChanger?: boolean;
  nzShowQuickJumper?: boolean;
  nzSimple?: boolean;
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

export interface SpaceConfig {
  nzSize?: 'small' | 'middle' | 'large' | number;
}

export interface SpinConfig {
  nzIndicator?: TemplateRef<NzSafeAny>;
}

export interface SwitchConfig {
  nzSize: NzSizeDSType;
}

export interface TableConfig {
  nzBordered?: boolean;
  nzSize?: NzSizeMDSType;
  nzShowQuickJumper?: boolean;
  nzLoadingIndicator?: TemplateRef<NzSafeAny>;
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
  nzSuffixIcon?: string | TemplateRef<NzSafeAny>;
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
  nzCopyTooltips?: [NzTSType, NzTSType] | null;
  nzCopyIcons: [NzTSType, NzTSType];
  nzEditTooltip?: null | NzTSType;
  nzEditIcon: NzTSType;
}

export type NzConfigKey = keyof NzConfig;

/**
 * User should provide an object implements this interface to set global configurations.
 */
export const NZ_CONFIG = new InjectionToken<NzConfig>('nz-config');
