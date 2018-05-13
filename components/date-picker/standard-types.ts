import { EventEmitter, TemplateRef } from '@angular/core';

import { FunctionProp } from '../core/types/common-wrap';
import { NzDatePickerI18nInterface } from '../i18n/nz-i18n.interface';
import { CandyDate } from './lib/candy-date';

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

export type DisabledDateFn = (d: CandyDate) => boolean;

export type DisabledTimePartial = 'start' | 'end';

export interface DisabledTimeConfig {
  nzDisabledHours(): number[];
  nzDisabledMinutes(hour: number): number[];
  nzDisabledSeconds(hour: number, minute: number): number[];
}

export type DisabledTimeFn = (current: CandyDate | CandyDate[], partial?: DisabledTimePartial) => DisabledTimeConfig;

export interface SupportTimeOptions {
  nzFormat?: string;
  nzHourStep?: number;
  nzMinuteStep?: number;
  nzSecondStep?: number;
  nzDisabledHours?(): number[];
  nzDisabledMinutes?(hour: number): number[];
  nzDisabledSeconds?(hour: number, minute: number): number[];
  nzHideDisabledOptions?: boolean;
  nzDefaultOpenValue?: Date;
  nzAddOn?: TemplateRef<void>;
}

export interface PresetRanges {
  [ key: string ]: CandyDate[];
}

export type PanelMode = 'decade' | 'year' | 'month' | 'date' | 'time';
