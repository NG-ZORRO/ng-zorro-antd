import { TimeHolder } from './time-holder';

describe('time holder', () => {
  it('should get hours/minutes/seconds', () => {
    const holder = new TimeHolder().setValue(new Date(0, 0, 0, 23, 10, 20));
    expect(holder.hours).toEqual(23);
    expect(holder.minutes).toEqual(10);
    expect(holder.seconds).toEqual(20);
  });

  it('should set hours', () => {
    const holder = new TimeHolder().setHours(23, false).setMinutes(10, false).setSeconds(20, false);
    const date = new Date();
    date.setHours(23);
    date.setMinutes(10);
    date.setSeconds(20);
    expect(holder.value).toEqual(date);
  });

  it('should ignore disabled', () => {
    const holder = new TimeHolder().setHours(23, false).setMinutes(10, false).setSeconds(20, false);
    holder.setHours(0, true).setMinutes(0, true).setSeconds(0, true);
    const date = new Date();
    date.setHours(23);
    date.setMinutes(10);
    date.setSeconds(20);
    expect(holder.value).toEqual(date);
  });

  it('should ignore date part', () => {
    const holder = new TimeHolder().setValue(new Date(2001, 10, 1, 23, 10, 20));
    expect(holder.hours).toEqual(23);
    expect(holder.minutes).toEqual(10);
    expect(holder.seconds).toEqual(20);
  });

  it('value should be undefined when cleared', () => {
    const holder = new TimeHolder().setValue(new Date(2001, 10, 1, 23, 10, 20));
    holder.setValue(undefined);
    expect(holder.value).toBeUndefined();
    expect(holder.isEmpty).toBeTruthy();
  });

  it('hours/minutes/seconds should be undefined when cleared', () => {
    const holder = new TimeHolder().setValue(new Date(2001, 10, 1, 23, 10, 20));
    holder.clear();
    expect(holder.hours).toBeUndefined();
    expect(holder.minutes).toBeUndefined();
    expect(holder.seconds).toBeUndefined();
  });

  it('should use defaultOpenValue to generate Minutes & Seconds if not isEmpty', () => {
    const holder = new TimeHolder().setDefaultOpenValue(new Date(2001, 10, 1, 23, 10, 20));
    expect(holder.isEmpty).toBeTruthy();
    holder.setHours(10, false);
    expect(holder.value).toEqual(new Date(2001, 10, 1, 10, 10, 20));
  });
  it('should use defaultOpenValue to generate Hours & Seconds if not isEmpty', () => {
    const holder = new TimeHolder().setDefaultOpenValue(new Date(2001, 10, 1, 23, 10, 20));
    expect(holder.isEmpty).toBeTruthy();
    holder.setMinutes(23, false);
    expect(holder.value).toEqual(new Date(2001, 10, 1, 23, 23, 20));
  });

});
