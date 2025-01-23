/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import differenceInCalendarMonths from 'date-fns/differenceInCalendarMonths';

import { CandyDate, normalizeRangeValue, SingleValue } from './candy-date';

describe('candy-date coverage supplements', () => {
  const date = new CandyDate('2018-5-5 12:12:12');

  it('support getTime', () => expect(date.getTime()).toBe(date.nativeDate.getTime()));

  it('support getMilliseconds', () => expect(date.getMilliseconds()).toBe(date.nativeDate.getMilliseconds()));

  it('support isSame', () => {
    expect(date.isSame(new CandyDate('2018'), 'year')).toBeTruthy();

    expect(date.isSameMonth(new CandyDate('2018-5-5 12:00:00'))).toBeTruthy();

    expect(date.isSame(new CandyDate('2018-5-5 12:00:00'), 'hour')).toBeTruthy();
    expect(date.isSameHour(new CandyDate('2019-5-5 12:00:00'))).toBeFalsy();

    expect(date.isSame(new CandyDate('2018-5-5 12:12:00'), 'minute')).toBeTruthy();
    expect(date.isSameMinute(new CandyDate('2019-5-5 12:12:00'))).toBeFalsy();

    expect(date.isSame(new CandyDate('2018-5-5 12:12:12'), 'second')).toBeTruthy();
    expect(date.isSameSecond(new CandyDate('2019-5-5 12:12:12'))).toBeFalsy();
  });

  it('support isBefore', () => {
    expect(date.isBeforeYear(null)).toBeFalsy();

    expect(date.isBeforeYear(new CandyDate('2100'))).toBeTruthy();

    expect(date.isBeforeMonth(new CandyDate('2100-5-5 12:12:12'))).toBeTruthy();
    expect(date.isBeforeMonth(new CandyDate('2018-6-5 12:12:12'))).toBeTruthy();

    expect(date.isBeforeDay(new CandyDate('2018-6-5 12:12:12'))).toBeTruthy();
  });

  it('should throw error while putting invalid date input', () => {
    const errorMessage = 'The input date type is not supported ("Date" is now recommended)';
    expect(() => new CandyDate({} as any)).toThrowError(errorMessage); // eslint-disable-line @typescript-eslint/no-explicit-any
  });

  it('should normalizeRangeValue work', () => {
    const randomDay = new CandyDate('2020-09-17');
    const now = new Date();
    let result: SingleValue[];
    result = normalizeRangeValue([null, randomDay], false);
    expect(result[0]!.getMonth()).toEqual(7);
    expect(result[1]!.getMonth()).toEqual(8);

    result = normalizeRangeValue([randomDay, null], false);
    expect(result[0]!.getMonth()).toEqual(8);
    expect(result[1]!.getMonth()).toEqual(9);

    result = normalizeRangeValue([randomDay, null], true);
    expect(result[0]!.getMonth()).toEqual(8);
    expect(result[1]!.getMonth()).toEqual(8);

    result = normalizeRangeValue([null, null], false);
    expect(result[0]!.getMonth()).toEqual(now.getMonth());
    expect(differenceInCalendarMonths(result[1]!.nativeDate, now)).toEqual(1);

    result = normalizeRangeValue([null, null], true);
    expect(result[0]!.getMonth()).toEqual(now.getMonth());
    expect(result[1]!.getMonth()).toEqual(now.getMonth());

    result = normalizeRangeValue([randomDay, new CandyDate()], false, 'month', 'left');
    expect(result[0]!.getMonth()).toEqual(randomDay.getMonth());
    expect(differenceInCalendarMonths(result[1]!.nativeDate, randomDay.nativeDate)).toEqual(1);

    result = normalizeRangeValue([randomDay, new CandyDate()], false, 'month', 'right');
    expect(result[1]!.getMonth()).toEqual(now.getMonth());
    expect(differenceInCalendarMonths(result[0]!.nativeDate, now)).toEqual(-1);

    result = normalizeRangeValue([new CandyDate(), new CandyDate()], false, 'month', 'left');
    expect(result[0]!.getMonth()).toEqual(now.getMonth());
    expect(differenceInCalendarMonths(result[1]!.nativeDate, now)).toEqual(1);

    result = normalizeRangeValue([new CandyDate(), new CandyDate()], false, 'month', 'right');
    expect(result[0]!.getMonth()).toEqual(now.getMonth());
    expect(differenceInCalendarMonths(result[1]!.nativeDate, now)).toEqual(1);

    result = normalizeRangeValue([new CandyDate(), new CandyDate()], true);
    expect(result[0]!.getMonth()).toEqual(now.getMonth());
    expect(result[1]!.getMonth()).toEqual(now.getMonth());

    result = normalizeRangeValue([new CandyDate(), new CandyDate()], false, 'year');
    expect(result[0]!.getYear()).toEqual(now.getFullYear());
    expect(result[1]!.getYear()).toEqual(now.getFullYear() + 1);

    result = normalizeRangeValue([new CandyDate(), new CandyDate()], true, 'year');
    expect(result[0]!.getYear()).toEqual(now.getFullYear());
    expect(result[1]!.getYear()).toEqual(now.getFullYear());
  });
}); // /candy-date coverage supplements
