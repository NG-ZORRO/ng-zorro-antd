/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { inject, Injectable } from '@angular/core';

import { CandyDate, cloneDate, CompatibleValue, NormalizedMode } from 'ng-zorro-antd/core/time';

import { DatePickerService } from '../date-picker.service';
import { NzDateMode } from '../standard-types';
import { NzHijriDateAdapter } from './hijri-date-adapter';

/**
 * Picker service that keeps the two panels of a range picker one Hijri unit apart, instead of one
 * Gregorian unit.
 */
@Injectable()
export class HijriDatePickerService extends DatePickerService {
  private readonly dateAdapter = inject(NzHijriDateAdapter);

  override setActiveDate(value: CompatibleValue, hasTimePicker: boolean = false, mode: NormalizedMode = 'month'): void {
    if (!this.isRange) {
      this.activeDate = cloneDate(value);
      return;
    }

    const parentPanels: Partial<Record<NzDateMode, NormalizedMode>> = {
      date: 'month',
      month: 'year',
      quarter: 'year',
      year: 'decade'
    };

    this.activeDate = this.normalizeRangeValue(
      value as CandyDate[],
      hasTimePicker,
      parentPanels[mode] ?? 'month',
      this.activeInput
    );
  }

  /** Hijri counterpart of `normalizeRangeValue`. */
  private normalizeRangeValue(
    value: CandyDate[],
    hasTimePicker: boolean,
    type: NormalizedMode,
    activePart: 'left' | 'right'
  ): CandyDate[] {
    const [start, end] = value ?? [];
    let newStart: CandyDate = start || new CandyDate();
    let newEnd: CandyDate = end || (hasTimePicker ? newStart : this.add(newStart, 1, type));

    if (start && !end) {
      newStart = start;
      newEnd = hasTimePicker ? start : this.add(start, 1, type);
    } else if (!start && end) {
      newStart = hasTimePicker ? end : this.add(end, -1, type);
      newEnd = end;
    } else if (start && end && !hasTimePicker) {
      if (this.isSame(start, end, type)) {
        newEnd = this.add(newStart, 1, type);
      } else if (activePart === 'left') {
        newEnd = this.add(newStart, 1, type);
      } else {
        newStart = this.add(newEnd, -1, type);
      }
    }

    return [newStart, newEnd];
  }

  private add(date: CandyDate, amount: number, type: NormalizedMode): CandyDate {
    const nativeDate = date.nativeDate;
    switch (type) {
      case 'month':
        return new CandyDate(this.dateAdapter.addCalendarMonths(nativeDate, amount));
      case 'year':
        return new CandyDate(this.dateAdapter.addCalendarYears(nativeDate, amount));
      default:
        return new CandyDate(this.dateAdapter.addCalendarYears(nativeDate, amount * 10));
    }
  }

  private isSame(left: CandyDate, right: CandyDate, type: NormalizedMode): boolean {
    switch (type) {
      case 'month':
        return this.dateAdapter.sameMonth(left.nativeDate, right.nativeDate);
      case 'year':
        return this.dateAdapter.sameYear(left.nativeDate, right.nativeDate);
      default:
        return (
          Math.floor(this.dateAdapter.getYear(left.nativeDate) / 10) ===
          Math.floor(this.dateAdapter.getYear(right.nativeDate) / 10)
        );
    }
  }
}
