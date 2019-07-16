import { CandyDate } from './candy-date';

describe('candy-date coverage supplements', () => {
  const date = new CandyDate('2018-5-5 12:12:12');

  it('support getTime', () => expect(date.getTime()).toBe(date.nativeDate.getTime()));

  it('support getMilliseconds', () => expect(date.getMilliseconds()).toBe(date.nativeDate.getMilliseconds()));

  // it('support endOf', () => {
  //   expect(date.endOf('month')!.getDate()).toBe(31);
  //   // tslint:disable-next-line:no-any
  //   expect(date.endOf('should return null' as any)).toBeNull();
  // });

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

  it('support isAfter', () => {
    expect(date.isAfterYear(null)).toBeFalsy();

    expect(date.isAfterYear(new CandyDate('2000'))).toBeTruthy();

    expect(date.isAfterMonth(new CandyDate('2000-5-5 12:12:12'))).toBeTruthy();
    expect(date.isAfterMonth(new CandyDate('2018-4-5 12:12:12'))).toBeTruthy();

    expect(date.isAfterDay(new CandyDate('2018-5-4 11:12:12'))).toBeTruthy();

    expect(date.isAfterHour(new CandyDate('2000-5-5 12:12:12'))).toBeTruthy();
    expect(date.isAfterHour(new CandyDate('2018-4-5 12:12:12'))).toBeTruthy();
    expect(date.isAfterHour(new CandyDate('2018-5-4 12:12:12'))).toBeTruthy();
    expect(date.isAfterHour(new CandyDate('2018-5-5 11:12:12'))).toBeTruthy();

    expect(date.isAfterMinute(new CandyDate('2000-5-5 12:12:12'))).toBeTruthy();
    expect(date.isAfterMinute(new CandyDate('2018-4-5 12:12:12'))).toBeTruthy();
    expect(date.isAfterMinute(new CandyDate('2018-5-4 12:12:12'))).toBeTruthy();
    expect(date.isAfterMinute(new CandyDate('2018-5-5 11:12:12'))).toBeTruthy();
    expect(date.isAfterMinute(new CandyDate('2018-5-5 12:11:12'))).toBeTruthy();

    expect(date.isAfterSecond(new CandyDate('2000-5-5 12:12:12'))).toBeTruthy();
    expect(date.isAfterSecond(new CandyDate('2018-4-5 12:12:12'))).toBeTruthy();
    expect(date.isAfterSecond(new CandyDate('2018-5-4 12:12:12'))).toBeTruthy();
    expect(date.isAfterSecond(new CandyDate('2018-5-5 11:12:12'))).toBeTruthy();
    expect(date.isAfterSecond(new CandyDate('2018-5-5 12:11:12'))).toBeTruthy();
    expect(date.isAfterSecond(new CandyDate('2018-5-5 12:12:11'))).toBeTruthy();
  });

  it('support isBefore', () => {
    expect(date.isBeforeYear(null)).toBeFalsy();

    expect(date.isBeforeYear(new CandyDate('2100'))).toBeTruthy();

    expect(date.isBeforeMonth(new CandyDate('2100-5-5 12:12:12'))).toBeTruthy();
    expect(date.isBeforeMonth(new CandyDate('2018-6-5 12:12:12'))).toBeTruthy();

    expect(date.isBeforeDay(new CandyDate('2018-6-5 12:12:12'))).toBeTruthy();

    expect(date.isBeforeHour(new CandyDate('2100-5-5 12:12:12'))).toBeTruthy();
    expect(date.isBeforeHour(new CandyDate('2018-6-5 12:12:12'))).toBeTruthy();
    expect(date.isBeforeHour(new CandyDate('2018-5-6 12:12:12'))).toBeTruthy();
    expect(date.isBeforeHour(new CandyDate('2018-5-5 13:12:12'))).toBeTruthy();

    expect(date.isBeforeMinute(new CandyDate('2100-5-5 12:12:12'))).toBeTruthy();
    expect(date.isBeforeMinute(new CandyDate('2018-6-5 12:12:12'))).toBeTruthy();
    expect(date.isBeforeMinute(new CandyDate('2018-5-6 12:12:12'))).toBeTruthy();
    expect(date.isBeforeMinute(new CandyDate('2018-5-5 13:12:12'))).toBeTruthy();
    expect(date.isBeforeMinute(new CandyDate('2018-5-5 12:13:12'))).toBeTruthy();

    expect(date.isBeforeSecond(new CandyDate('2100-5-5 12:12:12'))).toBeTruthy();
    expect(date.isBeforeSecond(new CandyDate('2018-6-5 12:12:12'))).toBeTruthy();
    expect(date.isBeforeSecond(new CandyDate('2018-5-6 12:12:12'))).toBeTruthy();
    expect(date.isBeforeSecond(new CandyDate('2018-5-5 13:12:12'))).toBeTruthy();
    expect(date.isBeforeSecond(new CandyDate('2018-5-5 12:12:13'))).toBeTruthy();
  });

  it('should throw error while putting invalid date input', () => {
    const errorMessage = 'The input date type is not supported ("Date" is now recommended)';
    expect(() => new CandyDate({} as any)).toThrowError(errorMessage); // tslint:disable-line:no-any
  });
}); // /candy-date coverage supplements
