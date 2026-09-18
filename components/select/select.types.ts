/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { TemplateRef } from '@angular/core';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

export type NzSelectModeType = 'default' | 'multiple' | 'tags';
export interface NzSelectItemInterface {
  template?: TemplateRef<NzSafeAny> | null;
  nzLabel: string | number | null;
  nzValue: NzSafeAny | null;
  nzTitle?: string | number | null;
  nzDisabled?: boolean;
  nzHide?: boolean;
  nzCustomContent?: boolean;
  groupLabel?: string | number | TemplateRef<NzSafeAny> | null;
  type?: string;
  key?: NzSafeAny;
}

export interface NzSelectOptionInterface {
  label: string | number | null | TemplateRef<NzSafeAny>;
  value: NzSafeAny | null;
  title?: string | number | null;
  disabled?: boolean;
  hide?: boolean;
  groupLabel?: string | number | TemplateRef<NzSafeAny> | null;
  key?: string | number;
}

/**
 * The option as it is handed to a template used as `label` of an option: the option itself, plus the normalized
 * `nz`-prefixed fields that `nzCustomTemplate` is rendered with.
 */
export type NzSelectOptionLabel<T extends NzSelectOptionInterface = NzSelectOptionInterface> = T &
  NzSelectItemInterface;

/** Context handed to a template used as `label` of an option. */
export type NzSelectOptionLabelContext<T extends NzSelectOptionInterface = NzSelectOptionInterface> =
  NzSelectOptionLabel<T> & {
    $implicit: NzSelectOptionLabel<T>;
  };

export type NzSelectTopControlItemType = Partial<NzSelectItemInterface> & {
  contentTemplateOutlet: TemplateRef<NzSafeAny> | null;
  contentTemplateOutletContext: NzSafeAny;
};

export type NzFilterOptionType = (input: string, option: NzSelectItemInterface) => boolean;

export type NzSelectPlacementType = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
