import { CandyDate } from 'ng-zorro-antd/core/time';
import { DateFnsDateAdapter } from 'ng-zorro-antd/core/time/date-adapter';

import { isAllowedDate } from './util';

const dateAdapter = new DateFnsDateAdapter();
const candyDateFac = (date?: Date | number | string): CandyDate => new CandyDate(dateAdapter, date);

describe('util.ts coverage supplements', () => {
  it('should cover untouched branches', () => {
    const disabledDate = (): boolean => true;
    expect(isAllowedDate(candyDateFac(), disabledDate)).toBeFalsy();

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const disabledTime = () => ({
      nzDisabledHours: () => [1],
      nzDisabledMinutes: () => [2],
      nzDisabledSeconds: () => [3]
    });
    expect(isAllowedDate(candyDateFac('2000-11-11 01:11:11'), undefined, disabledTime)).toBeFalsy();
    expect(isAllowedDate(candyDateFac('2000-11-11 02:02:11'), undefined, disabledTime)).toBeFalsy();
    expect(isAllowedDate(candyDateFac('2000-11-11 02:03:03'), undefined, disabledTime)).toBeFalsy();
  });
});
