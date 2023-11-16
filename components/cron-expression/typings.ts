/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

export type TimeType = keyof Cron;

export interface Cron {
  second?: CronValue;
  minute?: CronValue;
  hour?: CronValue;
  day?: CronValue;
  month?: CronValue;
  week?: CronValue;
}

export type CronValue = '*' | `${number}` | `${number}-${number}` | `${number}/${number}` | string;

export interface CronChangeType {
  label: TimeType;
  value: CronValue;
}

export type NzCronExpressionSize = 'large' | 'default' | 'small';
export type NzCronExpressionType = 'linux' | 'spring';
