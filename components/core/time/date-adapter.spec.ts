import { dateAdapter } from 'ng-zorro-antd/core/time/candy-date.spec';
import { DateFnsDateAdapter, isCustomAdapter, NzDateAdapter } from 'ng-zorro-antd/core/time/date-adapter';

describe('date-adapter', () => {
  let dateAdapter: NzDateAdapter;

  beforeAll(() => {
    dateAdapter = new DateFnsDateAdapter();
  });

  it('should support today', () => {
    const today = dateAdapter.today().getDate();
    expect(today).toEqual(new Date().getDate());
  });

  it('should support deserialize', () => {
    const input = '2020-06-12 12:12:12';
    const date = dateAdapter.deserialize(input);
    expect(date).toEqual(new Date(input));
  });

  it('should support parse', () => {
    const input = '2020-06';
    const date = dateAdapter.parse(input, 'yyyy-MM');
    expect(date).toEqual(new Date(2020, 5));
  });

  it('should support toNativeDate', function () {
    const date = new Date();
    expect(date).toEqual(new Date());
  });

  it('should support calendarStartOfWeek', function () {
    const date = new Date(2020, 5, 12);
    const startOfWeek = new Date(2020, 5, 7);
    expect(dateAdapter.calendarStartOfWeek(date)).toEqual(startOfWeek);
  });

  it('should support calendarStartOfWeek with different weekStartsOn', function () {
    const date = new Date(2020, 5, 12);
    const startOfWeek = new Date(2020, 5, 8);
    expect(dateAdapter.calendarStartOfWeek(date, { weekStartsOn: 1 })).toEqual(startOfWeek);
  });

  it('should support calendarStartOfMonth', function () {
    const date = new Date(2020, 5, 12);
    const startOfMonth = new Date(2020, 5, 1);
    expect(dateAdapter.calendarStartOfMonth(date)).toEqual(startOfMonth);
  });

  it('should support required getters', function () {
    const date = new Date(2020, 5, 12, 12, 12, 12, 12);

    expect(dateAdapter.getYear(date)).toBe(2020);
    expect(dateAdapter.getMonth(date)).toBe(5);
    expect(dateAdapter.getDay(date)).toBe(5);
    expect(dateAdapter.getDate(date)).toBe(12);
    expect(dateAdapter.getTime(date)).toBe(1591947732012);
    expect(dateAdapter.getHours(date)).toBe(12);
    expect(dateAdapter.getMinutes(date)).toBe(12);
    expect(dateAdapter.getSeconds(date)).toBe(12);
    expect(dateAdapter.getMilliseconds(date)).toBe(12);
    expect(dateAdapter.getISOWeek(date)).toBe(24);
  });

  it('should support clone', () => {
    const date = new Date();
    expect(dateAdapter.clone(date)).toEqual(new Date());
  });

  it('should support setHms', () => {
    const date = new Date('2020-06-12 12:12:12');

    const result = dateAdapter.setHms(date, 13, 13, 13);

    expect(result).toEqual(new Date('2020-06-12 13:13:13'));
  });

  it('should support addYears', () => {
    const date = new Date('2020-06-12');

    const addYears = dateAdapter.addYears(date, 5);

    expect(addYears).toEqual(new Date('2025-06-12'));
  });

  it('should support addMonth', () => {
    const date = new Date('2020-06-12');

    const addMonths = dateAdapter.addMonths(date, 12);

    expect(addMonths).toEqual(new Date('2021-06-12'));
  });

  it('should support addDays', () => {
    const date = new Date('2020-06-12');

    const addDays = dateAdapter.addDays(date, 20);

    expect(addDays).toEqual(new Date('2020-07-02'));
  });

  it('should support setDate', () => {
    const date = new Date('2020-06-12');

    const setDate = dateAdapter.setDate(date, 20);

    expect(setDate).toEqual(new Date('2020-06-20'));
  });

  it('should support setDay', () => {
    const date = new Date('2020-06-12');

    const setDay = dateAdapter.setDay(date, 2);

    expect(setDay).toEqual(new Date('2020-06-09'));
  });

  it('should support setMonth', () => {
    const date = new Date(2020, 6, 12);

    const setMonth = dateAdapter.setMonth(date, 2);

    expect(setMonth).toEqual(new Date(2020, 2, 12));
  });

  it('should support isSame', () => {
    const first = new Date('2020-06-12 12:12:12');
    const second = new Date('2020-07-12 12:12:12');

    expect(dateAdapter.isSame(first, second, 'year')).toBeTrue();
    expect(dateAdapter.isSame(first, second, 'month')).toBeFalse();

    expect(dateAdapter.isSame(first, second, 'hour')).toBeFalse();
    expect(dateAdapter.isSame(first, second, 'minute')).toBeFalse();
  });

  it('should support isBefore', () => {
    const date = new Date('2020-06-12');

    expect(dateAdapter.isBefore(date, new Date(), 'year')).toBeTrue();
    expect(dateAdapter.isBefore(date, new Date('2018-06-12'), 'year')).toBeFalse();
    expect(dateAdapter.isBefore(date, new Date('2020-07-12'), 'month')).toBeTrue();
    expect(dateAdapter.isBefore(date, new Date('2020-06-13'), 'day')).toBeTrue();
  });

  it('should support isToday', () => {
    const date = new Date('2020-06-12');

    expect(dateAdapter.isToday(date)).toBeFalse();
    expect(dateAdapter.isToday(new Date())).toBeTrue();
  });

  it('should support isValid', () => {
    expect(dateAdapter.isValid(new Date())).toBeTrue();
    expect(dateAdapter.isValid({} as never)).toBeFalse();
  });

  it('should support isFirstDayOfMonth', () => {
    const firstDayOfMonth = new Date('2020-06-01');
    const secondDayOfMonth = new Date('2020-06-02');

    expect(dateAdapter.isFirstDayOfMonth(firstDayOfMonth)).toBeTrue();
    expect(dateAdapter.isFirstDayOfMonth(secondDayOfMonth)).toBeFalse();
  });

  it('should support isLastDayOfMonth', () => {
    const lastDayOfMonth = new Date('2020-06-30');
    const anotherDayOfMonth = new Date('2020-06-12');

    expect(dateAdapter.isLastDayOfMonth(lastDayOfMonth)).toBeTrue();
    expect(dateAdapter.isLastDayOfMonth(anotherDayOfMonth)).toBeFalse();
  });

  it('should support format', () => {
    const date = new Date('2020-06-12');

    expect(dateAdapter.format(date, 'yyyy-dd-MM')).toBe('2020-12-06');
  });
});

// @ts-ignore
class CustomAdapter extends NzDateAdapter<Date> {}

describe('date adapter utility functions', () => {
  it('should returns true when custom adapter provided', function () {
    expect(isCustomAdapter(dateAdapter)).toBeFalse();
    expect(isCustomAdapter(new CustomAdapter())).toBeTrue();
  });
});
