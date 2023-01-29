/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

export type TimeType = 'second' | 'minute' | 'hour' | 'day' | 'month' | 'week';

export type TimeTypeError = 'secondError' | 'minuteError' | 'hourError' | 'dayError' | 'monthError' | 'weekError';

export interface CronType {
  second?: string;
  minute?: string;
  hour?: string;
  day?: string;
  month?: string;
  week?: string;
}

export interface CronChangeType {
  label: string;
  value: string;
}

export type NzCronExpressionSize = 'large' | 'default' | 'small';
