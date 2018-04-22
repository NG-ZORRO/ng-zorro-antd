import { TimeHolder } from './time-holder';

describe('time holder', () => {
  it('should get hours/minutes/seconds', () => {
    const holder = new TimeHolder().setValue(new Date(0, 0, 0, 23, 10, 20));
    expect(holder.hours).toEqual(23);
    expect(holder.minutes).toEqual(10);
    expect(holder.seconds).toEqual(20);
  });

  it('should set hours', () => {
    const holder = new TimeHolder().setHours(23).setMinutes(10).setSeconds(20);
    expect(holder.value).toEqual(new Date(0, 0, 0, 23, 10, 20));
  });

  it('should ignore date part', () => {
    const holder = new TimeHolder().setValue(new Date(2001, 10, 1, 23, 10, 20));
    expect(holder.hours).toEqual(23);
    expect(holder.minutes).toEqual(10);
    expect(holder.seconds).toEqual(20);
  });

  it('value should be undefined when cleared', () => {
    const holder = new TimeHolder().setValue(new Date(2001, 10, 1, 23, 10, 20));
    holder.clear();
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

  it('should use defaultOpenValue to generate value if not isEmpty', () => {
    const holder = new TimeHolder().setDefaultOpenValue(new Date(2001, 10, 1, 23, 10, 20));
    expect(holder.isEmpty).toBeTruthy();
    holder.setHours(10);
    expect(holder.value).toEqual(new Date(0, 0, 0, 10, 10, 20));
  });
});
