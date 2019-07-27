/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { TemplateRef } from '@angular/core';

import { CandyDate } from './lib/candy-date/candy-date';

import { Moment } from 'jalali-moment';
// The common result data format (the range-picker's props can be result as array)
export interface PickerResultSingle {
  date: CandyDate;
  dateString: string;
}
export interface PickerResultRange {
  date: CandyDate[];
  dateString: string[];
}
export type PickerResult = PickerResultSingle | PickerResultRange;

export type DisabledDateFn = (d: Moment) => boolean;

export type DisabledTimePartial = 'start' | 'end';

export interface DisabledTimeConfig {
  nzDisabledHours(): number[];
  nzDisabledMinutes(hour: number): number[];
  nzDisabledSeconds(hour: number, minute: number): number[];
}

export type DisabledTimeFn = (current: Moment | Moment[], partial?: DisabledTimePartial) => DisabledTimeConfig;

export interface SupportTimeOptions {
  nzFormat?: string;
  nzHourStep?: number;
  nzMinuteStep?: number;
  nzSecondStep?: number;
  nzDisabledHours?(): number[];
  nzDisabledMinutes?(hour: number): number[];
  nzDisabledSeconds?(hour: number, minute: number): number[];
  nzHideDisabledOptions?: boolean;
  nzDefaultOpenValue?: Moment;
  nzAddOn?: TemplateRef<void>;
}

export interface PresetRanges {
  [key: string]: Moment[] | (() => Moment[]);
}

export type PanelMode = 'decade' | 'year' | 'month' | 'date' | 'time';
