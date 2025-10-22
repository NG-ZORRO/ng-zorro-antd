/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Observable, Subject } from 'rxjs';

import { isNil, isNotNil } from 'ng-zorro-antd/core/util';

export class TimeHolder {
  selected12Hours: string | undefined = undefined;
  private _value: Date | undefined;
  private _use12Hours: boolean = false;
  private _defaultOpenValue!: Date;
  private _changes = new Subject<Date>();

  setMinutes(value: number, disabled: boolean): this {
    if (!disabled) {
      this.initValue();
      this.value.setMinutes(value);
      this.update();
    }
    return this;
  }

  setHours(value: number, disabled: boolean): this {
    if (!disabled) {
      this.initValue();
      if (this._use12Hours) {
        if (this.selected12Hours === 'PM' && value !== 12) {
          this.value.setHours((value as number) + 12);
        } else if (this.selected12Hours === 'AM' && value === 12) {
          this.value.setHours(0);
        } else {
          this.value.setHours(value);
        }
      } else {
        this.value.setHours(value);
      }
      this.update();
    }
    return this;
  }

  setSeconds(value: number, disabled: boolean): this {
    if (!disabled) {
      this.initValue();
      this.value.setSeconds(value);
      this.update();
    }
    return this;
  }

  setUse12Hours(value: boolean): this {
    this._use12Hours = value;
    return this;
  }

  get changes(): Observable<Date> {
    return this._changes.asObservable();
  }

  setValue(value: Date | undefined, use12Hours?: boolean): this {
    if (isNotNil(use12Hours)) {
      this._use12Hours = use12Hours as boolean;
    }
    if (value !== this.value) {
      this._value = value;
      if (isNotNil(this.value)) {
        if (this._use12Hours && isNotNil(this.hours)) {
          this.selected12Hours = this.hours >= 12 ? 'PM' : 'AM';
        }
      } else {
        this._clear();
      }
    }

    return this;
  }

  initValue(): void {
    if (isNil(this.value)) {
      this.setValue(new Date(), this._use12Hours);
    }
  }

  clear(): void {
    this._clear();
    this.update();
  }

  get isEmpty(): boolean {
    return !(isNotNil(this.hours) || isNotNil(this.minutes) || isNotNil(this.seconds));
  }

  private _clear(): void {
    this._value = undefined;
    this.selected12Hours = undefined;
  }

  private update(): void {
    if (this.isEmpty) {
      this._value = undefined;
    } else {
      if (isNotNil(this.hours)) {
        this.value!.setHours(this.hours!);
      }

      if (isNotNil(this.minutes)) {
        this.value!.setMinutes(this.minutes!);
      }

      if (isNotNil(this.seconds)) {
        this.value!.setSeconds(this.seconds!);
      }

      if (this._use12Hours) {
        if (this.selected12Hours === 'PM' && this.hours! < 12) {
          this.value!.setHours(this.hours! + 12);
        }
        if (this.selected12Hours === 'AM' && this.hours! >= 12) {
          this.value!.setHours(this.hours! - 12);
        }
      }
    }
    this.changed();
  }

  changed(): void {
    this._changes.next(this.value);
  }

  /**
   * @description
   * UI view hours
   * Get viewHours which is selected in `time-picker-panel` and its range is [12, 1, 2, ..., 11]
   */
  get viewHours(): number | undefined {
    return this._use12Hours && isNotNil(this.hours) ? this.calculateViewHour(this.hours!) : this.hours;
  }

  setSelected12Hours(value: string | undefined): void {
    if (value!.toUpperCase() !== this.selected12Hours) {
      this.selected12Hours = value!.toUpperCase();
      this.update();
    }
  }

  get value(): Date {
    return this._value || this._defaultOpenValue;
  }

  get hours(): number | undefined {
    return this.value?.getHours();
  }

  get minutes(): number | undefined {
    return this.value?.getMinutes();
  }

  get seconds(): number | undefined {
    return this.value?.getSeconds();
  }

  setDefaultOpenValue(value: Date): this {
    this._defaultOpenValue = value;
    return this;
  }

  private calculateViewHour(value: number): number {
    const selected12Hours = this.selected12Hours;
    if (selected12Hours === 'PM' && value > 12) {
      return value - 12;
    }
    if (selected12Hours === 'AM' && value === 0) {
      return 12;
    }
    return value;
  }
}
