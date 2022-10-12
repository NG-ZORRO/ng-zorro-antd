/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

export interface CronType {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  [p: string]: any;
}

export type CronSettings = CronSetting[];

export interface CronSetting {
  label: string;
  value: string;
}
