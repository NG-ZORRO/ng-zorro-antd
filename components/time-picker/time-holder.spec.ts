/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { TimeHolder } from './time-holder';

function mathSecondRound(value: Date): number {
  return Math.floor(value.getTime() / 1000);
}

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
    expect(mathSecondRound(holder.value!)).toEqual(mathSecondRound(date));
  });

  it('should ignore disabled', () => {
    const holder = new TimeHolder().setHours(23, false).setMinutes(10, false).setSeconds(20, false);
    holder.setHours(0, true).setMinutes(0, true).setSeconds(0, true);
    const date = new Date();
    date.setHours(23);
    date.setMinutes(10);
    date.setSeconds(20);
    expect(mathSecondRound(holder.value!)).toEqual(mathSecondRound(date));
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

  it('should 12-hour worked', () => {
    const holder = new TimeHolder().setValue(new Date(0, 0, 0, 0, 0, 0));
    holder.setUse12Hours(true);
    holder.setSelected12Hours('pm');
    holder.setHours(3, false);
    expect(holder.viewHours).toBe(3);
    expect(holder.hours).toBe(15);
    const date = new Date(0, 0, 0, 15, 0, 0, 0);
    expect(mathSecondRound(holder.value!)).toEqual(mathSecondRound(date));
  });

  it('should set default selected 12-hours with value', () => {
    const holderPM = new TimeHolder().setValue(new Date(0, 0, 0, 15, 2, 3), true);
    expect(holderPM.selected12Hours).toBe('PM');
    const holderAM = new TimeHolder().setValue(new Date(0, 0, 0, 0, 2, 3), true);
    expect(holderAM.selected12Hours).toBe('AM');
  });

  it('should transform special value in 12-hour', () => {
    const holder = new TimeHolder().setValue(new Date(), true);
    holder.setSelected12Hours('am');
    holder.setHours(12, false);
    expect(holder.hours).toBe(0);
    holder.setSelected12Hours('pm');
    expect(holder.hours).toBe(12);
  });
});
