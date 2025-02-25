/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

// from https://github.com/hsuanxyz/ng-time-parser
import { FormStyle, getLocaleDayPeriods, TranslationWidth } from '@angular/common';

import { isNotNil } from 'ng-zorro-antd/core/util';

export interface TimeResult {
  hour: number | null;
  minute: number | null;
  second: number | null;
  period: number | null;
}

export class NgTimeParser {
  regex: RegExp = null!;
  matchMap: Record<string, null | number> = {
    hour: null,
    minute: null,
    second: null,
    periodNarrow: null,
    periodWide: null,
    periodAbbreviated: null
  };

  constructor(
    private format: string,
    private localeId: string
  ) {
    this.genRegexp();
  }

  toDate(str: string): Date {
    const result = this.getTimeResult(str);
    const time = new Date();

    if (isNotNil(result?.hour)) {
      time.setHours(result!.hour);
    }

    if (isNotNil(result?.minute)) {
      time.setMinutes(result!.minute);
    }

    if (isNotNil(result?.second)) {
      time.setSeconds(result!.second);
    }

    if (result?.period === 1 && time.getHours() < 12) {
      time.setHours(time.getHours() + 12);
    }

    return time;
  }

  getTimeResult(str: string): TimeResult | null {
    const match = this.regex.exec(str);
    let period = null;
    if (match) {
      if (isNotNil(this.matchMap.periodNarrow)) {
        period = getLocaleDayPeriods(this.localeId, FormStyle.Format, TranslationWidth.Narrow).indexOf(
          match[this.matchMap.periodNarrow + 1]
        );
      }
      if (isNotNil(this.matchMap.periodWide)) {
        period = getLocaleDayPeriods(this.localeId, FormStyle.Format, TranslationWidth.Wide).indexOf(
          match[this.matchMap.periodWide + 1]
        );
      }
      if (isNotNil(this.matchMap.periodAbbreviated)) {
        period = getLocaleDayPeriods(this.localeId, FormStyle.Format, TranslationWidth.Abbreviated).indexOf(
          match[this.matchMap.periodAbbreviated + 1]
        );
      }
      return {
        hour: isNotNil(this.matchMap.hour) ? Number.parseInt(match[this.matchMap.hour + 1], 10) : null,
        minute: isNotNil(this.matchMap.minute) ? Number.parseInt(match[this.matchMap.minute + 1], 10) : null,
        second: isNotNil(this.matchMap.second) ? Number.parseInt(match[this.matchMap.second + 1], 10) : null,
        period
      };
    } else {
      return null;
    }
  }

  genRegexp(): void {
    let regexStr = this.format.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$&');
    const hourRegex = /h{1,2}/i;
    const minuteRegex = /m{1,2}/;
    const secondRegex = /s{1,2}/;
    const periodNarrow = /aaaaa/;
    const periodWide = /aaaa/;
    const periodAbbreviated = /a{1,3}/;

    const hourMatch = hourRegex.exec(this.format);
    const minuteMatch = minuteRegex.exec(this.format);
    const secondMatch = secondRegex.exec(this.format);
    const periodNarrowMatch = periodNarrow.exec(this.format);
    let periodWideMatch: null | RegExpExecArray = null;
    let periodAbbreviatedMatch: null | RegExpExecArray = null;
    if (!periodNarrowMatch) {
      periodWideMatch = periodWide.exec(this.format);
    }
    if (!periodWideMatch && !periodNarrowMatch) {
      periodAbbreviatedMatch = periodAbbreviated.exec(this.format);
    }

    const matchs = [hourMatch, minuteMatch, secondMatch, periodNarrowMatch, periodWideMatch, periodAbbreviatedMatch]
      .filter(m => !!m)
      .sort((a, b) => a!.index - b!.index);

    matchs.forEach((match, index) => {
      switch (match) {
        case hourMatch:
          this.matchMap.hour = index;
          regexStr = regexStr.replace(hourRegex, '(\\d{1,2})');
          break;
        case minuteMatch:
          this.matchMap.minute = index;
          regexStr = regexStr.replace(minuteRegex, '(\\d{1,2})');
          break;
        case secondMatch:
          this.matchMap.second = index;
          regexStr = regexStr.replace(secondRegex, '(\\d{1,2})');
          break;
        case periodNarrowMatch: {
          this.matchMap.periodNarrow = index;
          const periodsNarrow = getLocaleDayPeriods(this.localeId, FormStyle.Format, TranslationWidth.Narrow).join('|');
          regexStr = regexStr.replace(periodNarrow, `(${periodsNarrow})`);
          break;
        }
        case periodWideMatch: {
          this.matchMap.periodWide = index;
          const periodsWide = getLocaleDayPeriods(this.localeId, FormStyle.Format, TranslationWidth.Wide).join('|');
          regexStr = regexStr.replace(periodWide, `(${periodsWide})`);
          break;
        }
        case periodAbbreviatedMatch: {
          this.matchMap.periodAbbreviated = index;
          const periodsAbbreviated = getLocaleDayPeriods(
            this.localeId,
            FormStyle.Format,
            TranslationWidth.Abbreviated
          ).join('|');
          regexStr = regexStr.replace(periodAbbreviated, `(${periodsAbbreviated})`);
          break;
        }
      }
    });

    this.regex = new RegExp(regexStr);
  }
}
