import { CandyDate } from './candy-date';

describe('candy-date coverage supplements', () => {
  const date = new CandyDate('2018-5-5 12:12:12');

  it('support getTime', () => expect(date.getTime()).toBe(date.nativeDate.getTime()));

  it('support getMilliseconds', () => expect(date.getMilliseconds()).toBe(date.nativeDate.getMilliseconds()));

  it('support endOf', () => {
    expect(date.endOf('month').getDate()).toBe(31);
    // tslint:disable-next-line:no-any
    expect(date.endOf('should return null' as any)).toBeNull();
  });

  it('support isSame', () => {
    expect(date.isSame(new CandyDate('2018'), 'year')).toBeTruthy();

    expect(date.isSame(new CandyDate('2018-5-5 12:00:00'), 'hour')).toBeTruthy();
    expect(date.isSame(new CandyDate('2019-5-5 12:00:00'), 'hour')).toBeFalsy();

    expect(date.isSame(new CandyDate('2018-5-5 12:12:00'), 'minute')).toBeTruthy();
    expect(date.isSame(new CandyDate('2019-5-5 12:12:00'), 'minute')).toBeFalsy();

    expect(date.isSame(new CandyDate('2018-5-5 12:12:12'), 'second')).toBeTruthy();
    expect(date.isSame(new CandyDate('2019-5-5 12:12:12'), 'second')).toBeFalsy();
  });

  it('support isAfter', () => {
    expect(date.isAfter(null, 'year')).toBeFalsy();

    expect(date.isAfter(new CandyDate('2000'), 'year')).toBeTruthy();

    expect(date.isAfter(new CandyDate('2000-5-5 12:12:12'), 'month')).toBeTruthy();
    expect(date.isAfter(new CandyDate('2018-4-5 12:12:12'), 'month')).toBeTruthy();

    expect(date.isAfter(new CandyDate('2000-5-5 12:12:12'), 'hour')).toBeTruthy();
    expect(date.isAfter(new CandyDate('2018-4-5 12:12:12'), 'hour')).toBeTruthy();
    expect(date.isAfter(new CandyDate('2018-5-4 12:12:12'), 'hour')).toBeTruthy();
    expect(date.isAfter(new CandyDate('2018-5-5 11:12:12'), 'hour')).toBeTruthy();

    expect(date.isAfter(new CandyDate('2000-5-5 12:12:12'), 'minute')).toBeTruthy();
    expect(date.isAfter(new CandyDate('2018-4-5 12:12:12'), 'minute')).toBeTruthy();
    expect(date.isAfter(new CandyDate('2018-5-4 12:12:12'), 'minute')).toBeTruthy();
    expect(date.isAfter(new CandyDate('2018-5-5 11:12:12'), 'minute')).toBeTruthy();
    expect(date.isAfter(new CandyDate('2018-5-5 12:11:12'), 'minute')).toBeTruthy();

    expect(date.isAfter(new CandyDate('2000-5-5 12:12:12'), 'second')).toBeTruthy();
    expect(date.isAfter(new CandyDate('2018-4-5 12:12:12'), 'second')).toBeTruthy();
    expect(date.isAfter(new CandyDate('2018-5-4 12:12:12'), 'second')).toBeTruthy();
    expect(date.isAfter(new CandyDate('2018-5-5 11:12:12'), 'second')).toBeTruthy();
    expect(date.isAfter(new CandyDate('2018-5-5 12:11:12'), 'second')).toBeTruthy();
    expect(date.isAfter(new CandyDate('2018-5-5 12:12:11'), 'second')).toBeTruthy();
  });

  it('support isBefore', () => {
    expect(date.isBefore(null, 'year')).toBeFalsy();

    expect(date.isBefore(new CandyDate('2100'), 'year')).toBeTruthy();

    expect(date.isBefore(new CandyDate('2100-5-5 12:12:12'), 'month')).toBeTruthy();
    expect(date.isBefore(new CandyDate('2018-6-5 12:12:12'), 'month')).toBeTruthy();

    expect(date.isBefore(new CandyDate('2100-5-5 12:12:12'), 'hour')).toBeTruthy();
    expect(date.isBefore(new CandyDate('2018-6-5 12:12:12'), 'hour')).toBeTruthy();
    expect(date.isBefore(new CandyDate('2018-5-6 12:12:12'), 'hour')).toBeTruthy();
    expect(date.isBefore(new CandyDate('2018-5-5 13:12:12'), 'hour')).toBeTruthy();

    expect(date.isBefore(new CandyDate('2100-5-5 12:12:12'), 'minute')).toBeTruthy();
    expect(date.isBefore(new CandyDate('2018-6-5 12:12:12'), 'minute')).toBeTruthy();
    expect(date.isBefore(new CandyDate('2018-5-6 12:12:12'), 'minute')).toBeTruthy();
    expect(date.isBefore(new CandyDate('2018-5-5 13:12:12'), 'minute')).toBeTruthy();
    expect(date.isBefore(new CandyDate('2018-5-5 12:13:12'), 'minute')).toBeTruthy();

    expect(date.isBefore(new CandyDate('2100-5-5 12:12:12'), 'second')).toBeTruthy();
    expect(date.isBefore(new CandyDate('2018-6-5 12:12:12'), 'second')).toBeTruthy();
    expect(date.isBefore(new CandyDate('2018-5-6 12:12:12'), 'second')).toBeTruthy();
    expect(date.isBefore(new CandyDate('2018-5-5 13:12:12'), 'second')).toBeTruthy();
    expect(date.isBefore(new CandyDate('2018-5-5 12:12:13'), 'second')).toBeTruthy();
  });

}); // /candy-date coverage supplements
