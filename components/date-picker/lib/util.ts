/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NzDateAdapter } from 'ng-zorro-antd/core/time';
import { NzCalendarI18nInterface } from 'ng-zorro-antd/i18n';

/**
 * Compatible translate the moment-like format pattern to angular's pattern
 * Why? For now, we need to support the existing language formats in AntD, and AntD uses the default temporal syntax.
 *
 * TODO: compare and complete all format patterns
 * Each format docs as below:
 *
 * @link https://momentjs.com/docs/#/displaying/format/
 * @link https://angular.dev/api/common/DatePipe#description
 * @param format input format pattern
 */
export function transCompatFormat(format: string): string {
  return (
    format &&
    format
      .replace(/Y/g, 'y') // only support y, yy, yyy, yyyy
      .replace(/D/g, 'd')
  ); // d, dd represent of D, DD for momentjs, others are not support
}

export function getMonthShortLabel(
  dateAdapter: NzDateAdapter<Date>,
  date: Date,
  locale?: NzCalendarI18nInterface
): string {
  if (locale?.monthFormat) {
    return dateAdapter.format(date, transCompatFormat(locale.monthFormat));
  }
  const month = dateAdapter.getMonth(date) + 1;
  return locale?.month === '月' ? `${month}月` : `${month}`;
}
