import differenceInCalendarMonths from 'date-fns/differenceInCalendarMonths';

import { DateFnsDateAdapter } from 'ng-zorro-antd/core/time/date-adapter';

import { CandyDate, normalizeRangeValue, SingleValue } from './candy-date';

export const dateAdapter = new DateFnsDateAdapter();
export const candyDateFac = (date?: Date | number | string): CandyDate => new CandyDate(dateAdapter, date);

describe('candy-date coverage supplements', () => {
  const date = candyDateFac('2018-5-5 12:12:12');

  it('support getTime', () => expect(date.getTime()).toBe(date.nativeDate.getTime()));

  it('support getMilliseconds', () => expect(date.getMilliseconds()).toBe(date.nativeDate.getMilliseconds()));

  it('support isSame', () => {
    expect(date.isSame(candyDateFac('2018'), 'year')).toBeTruthy();

    expect(date.isSameMonth(candyDateFac('2018-5-5 12:00:00'))).toBeTruthy();

    expect(date.isSame(candyDateFac('2018-5-5 12:00:00'), 'hour')).toBeTruthy();
    expect(date.isSameHour(candyDateFac('2019-5-5 12:00:00'))).toBeFalsy();

    expect(date.isSame(candyDateFac('2018-5-5 12:12:00'), 'minute')).toBeTruthy();
    expect(date.isSameMinute(candyDateFac('2019-5-5 12:12:00'))).toBeFalsy();

    expect(date.isSame(candyDateFac('2018-5-5 12:12:12'), 'second')).toBeTruthy();
    expect(date.isSameSecond(candyDateFac('2019-5-5 12:12:12'))).toBeFalsy();
  });

  it('support isBefore', () => {
    expect(date.isBeforeYear(null)).toBeFalsy();

    expect(date.isBeforeYear(candyDateFac('2100'))).toBeTruthy();

    expect(date.isBeforeMonth(candyDateFac('2100-5-5 12:12:12'))).toBeTruthy();
    expect(date.isBeforeMonth(candyDateFac('2018-6-5 12:12:12'))).toBeTruthy();

    expect(date.isBeforeDay(candyDateFac('2018-6-5 12:12:12'))).toBeTruthy();
  });

  it('should throw error while putting invalid date input', () => {
    const errorMessage = 'The input date type is not supported ("Date" is now recommended)';
    expect(() => candyDateFac({} as any)).toThrowError(errorMessage); // eslint-disable-line @typescript-eslint/no-explicit-any
  });

  it('should normalizeRangeValue work', () => {
    const randomDay = candyDateFac('2020-09-17');
    const now = new Date();
    let result: SingleValue[];
    result = normalizeRangeValue(dateAdapter, [null, randomDay], false);
    expect(result[0]!.getMonth()).toEqual(7);
    expect(result[1]!.getMonth()).toEqual(8);

    result = normalizeRangeValue(dateAdapter, [randomDay, null], false);
    expect(result[0]!.getMonth()).toEqual(8);
    expect(result[1]!.getMonth()).toEqual(9);

    result = normalizeRangeValue(dateAdapter, [randomDay, null], true);
    expect(result[0]!.getMonth()).toEqual(8);
    expect(result[1]!.getMonth()).toEqual(8);

    result = normalizeRangeValue(dateAdapter, [null, null], false);
    expect(result[0]!.getMonth()).toEqual(now.getMonth());
    expect(differenceInCalendarMonths(result[1]!.nativeDate, now)).toEqual(1);

    result = normalizeRangeValue(dateAdapter, [null, null], true);
    expect(result[0]!.getMonth()).toEqual(now.getMonth());
    expect(result[1]!.getMonth()).toEqual(now.getMonth());

    result = normalizeRangeValue(dateAdapter, [randomDay, candyDateFac()], false, 'month', 'left');
    expect(result[0]!.getMonth()).toEqual(randomDay.getMonth());
    expect(differenceInCalendarMonths(result[1]!.nativeDate, randomDay.nativeDate)).toEqual(1);

    result = normalizeRangeValue(dateAdapter, [randomDay, candyDateFac()], false, 'month', 'right');
    expect(result[1]!.getMonth()).toEqual(now.getMonth());
    expect(differenceInCalendarMonths(result[0]!.nativeDate, now)).toEqual(-1);

    result = normalizeRangeValue(dateAdapter, [candyDateFac(), candyDateFac()], false, 'month', 'left');
    expect(result[0]!.getMonth()).toEqual(now.getMonth());
    expect(differenceInCalendarMonths(result[1]!.nativeDate, now)).toEqual(1);

    result = normalizeRangeValue(dateAdapter, [candyDateFac(), candyDateFac()], false, 'month', 'right');
    expect(result[0]!.getMonth()).toEqual(now.getMonth());
    expect(differenceInCalendarMonths(result[1]!.nativeDate, now)).toEqual(1);

    result = normalizeRangeValue(dateAdapter, [candyDateFac(), candyDateFac()], true);
    expect(result[0]!.getMonth()).toEqual(now.getMonth());
    expect(result[1]!.getMonth()).toEqual(now.getMonth());

    result = normalizeRangeValue(dateAdapter, [candyDateFac(), candyDateFac()], false, 'year');
    expect(result[0]!.getYear()).toEqual(now.getFullYear());
    expect(result[1]!.getYear()).toEqual(now.getFullYear() + 1);

    result = normalizeRangeValue(dateAdapter, [candyDateFac(), candyDateFac()], true, 'year');
    expect(result[0]!.getYear()).toEqual(now.getFullYear());
    expect(result[1]!.getYear()).toEqual(now.getFullYear());
  });
}); // /candy-date coverage supplements
