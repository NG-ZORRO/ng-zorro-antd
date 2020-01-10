/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Observable, Subject } from 'rxjs';

import { isNotNil } from 'ng-zorro-antd/core';

export class TimeHolder {
  private _seconds: number | undefined = undefined;
  private _hours: number | undefined = undefined;
  private _minutes: number | undefined = undefined;
  private _selected12Hours: string | undefined = undefined;
  private _use12Hours: boolean = false;
  private _defaultOpenValue: Date = new Date();
  private _value: Date | undefined;
  private _changes = new Subject<Date>();

  setDefaultValueIfNil(): void {
    if (!isNotNil(this._value)) {
      this._value = new Date(this.defaultOpenValue);
    }
  }

  setMinutes(value: number, disabled: boolean): this {
    if (disabled) {
      return this;
    }
    this.setDefaultValueIfNil();
    this.minutes = value;
    return this;
  }

  setHours(value: number, disabled: boolean): this {
    if (disabled) {
      return this;
    }
    this.setDefaultValueIfNil();
    this.hours = value;
    return this;
  }

  setSeconds(value: number, disabled: boolean): this {
    if (disabled) {
      return this;
    }
    this.setDefaultValueIfNil();
    this.seconds = value;
    return this;
  }

  setUse12Hours(value: boolean): this {
    this._use12Hours = value;
    return this;
  }

  get changes(): Observable<Date> {
    return this._changes.asObservable();
  }

  get value(): Date | undefined {
    return this._value;
  }

  set value(value: Date | undefined) {
    if (value !== this._value) {
      this._value = value;
      if (isNotNil(this._value)) {
        this._hours = this._value!.getHours();
        this._minutes = this._value!.getMinutes();
        this._seconds = this._value!.getSeconds();
        if (this._use12Hours && isNotNil(this._hours)) {
          this._selected12Hours = this._hours >= 12 ? 'PM' : 'AM';
        }
      } else {
        this._clear();
      }
    }
  }

  setValue(value: Date | undefined, use12Hours?: boolean): this {
    if (isNotNil(use12Hours)) {
      this._use12Hours = use12Hours as boolean;
    }
    this.value = value;
    return this;
  }

  clear(): void {
    this._clear();
    this.update();
  }

  get isEmpty(): boolean {
    return !(isNotNil(this._hours) || isNotNil(this._minutes) || isNotNil(this._seconds));
  }

  private _clear(): void {
    this._hours = undefined;
    this._minutes = undefined;
    this._seconds = undefined;
    this._selected12Hours = undefined;
  }

  private update(): void {
    if (this.isEmpty) {
      this._value = undefined;
    } else {
      if (!isNotNil(this._hours)) {
        this._hours = this.defaultHours;
      } else {
        this._value!.setHours(this.hours!);
      }

      if (!isNotNil(this._minutes)) {
        this._minutes = this.defaultMinutes;
      } else {
        this._value!.setMinutes(this.minutes!);
      }

      if (!isNotNil(this._seconds)) {
        this._seconds = this.defaultSeconds;
      } else {
        this._value!.setSeconds(this.seconds!);
      }

      if (this._use12Hours) {
        if (!isNotNil(this._selected12Hours)) {
          this._selected12Hours = this.default12Hours;
        }
        if (this.selected12Hours === 'PM' && this._hours! < 12) {
          this._hours! += 12;
          this._value!.setHours(this._hours!);
        }
        if (this.selected12Hours === 'AM' && this._hours! >= 12) {
          this._hours! -= 12;
          this._value!.setHours(this._hours!);
        }
      }

      this._value = new Date(this._value!);
    }
    this.changed();
  }

  changed(): void {
    this._changes.next(this._value);
  }

  /**
   * @description
   * UI view hours
   * Get viewHours which is selected in `time-picker-panel` and its range is [12, 1, 2, ..., 11]
   */
  get viewHours(): number | undefined {
    return this._use12Hours && isNotNil(this._hours) ? this.calculateViewHour(this._hours!) : this._hours;
  }

  /**
   * @description
   * Value hours
   * Get realHours and its range is [0, 1, 2, ..., 22, 23]
   */
  get realHours(): number | undefined {
    return this._hours;
  }

  /**
   * @description
   * Same as realHours
   * @see realHours
   */
  get hours(): number | undefined {
    return this._hours;
  }

  /**
   * @description
   * Set viewHours to realHours
   */
  set hours(value: number | undefined) {
    if (value !== this._hours) {
      if (this._use12Hours) {
        if (this.selected12Hours === 'PM' && value !== 12) {
          this._hours! = (value as number) + 12;
        } else if (this.selected12Hours === 'AM' && value === 12) {
          this._hours = 0;
        } else {
          this._hours = value;
        }
      } else {
        this._hours = value;
      }
      this.update();
    }
  }

  get minutes(): number | undefined {
    return this._minutes;
  }

  set minutes(value: number | undefined) {
    if (value !== this._minutes) {
      this._minutes = value;
      this.update();
    }
  }

  get seconds(): number | undefined {
    return this._seconds;
  }

  set seconds(value: number | undefined) {
    if (value !== this._seconds) {
      this._seconds = value;
      this.update();
    }
  }

  get selected12Hours(): string | undefined {
    return this._selected12Hours;
  }

  set selected12Hours(value: string | undefined) {
    if (value!.toUpperCase() !== this._selected12Hours) {
      this._selected12Hours = value!.toUpperCase();
      this.update();
    }
  }

  get defaultOpenValue(): Date {
    return this._defaultOpenValue;
  }

  set defaultOpenValue(value: Date) {
    if (this._defaultOpenValue !== value) {
      this._defaultOpenValue = value;
      this.update();
    }
  }

  setDefaultOpenValue(value: Date): this {
    this.defaultOpenValue = value;
    return this;
  }

  /**
   * @description
   * Get deafultViewHours when defaultOpenValue is setted
   * @see viewHours
   */
  get defaultViewHours(): number {
    const hours = this._defaultOpenValue.getHours();
    return this._use12Hours && isNotNil(hours) ? this.calculateViewHour(hours) : hours;
  }

  /**
   * @description
   * Get defaultRealHours when defaultOpenValue is setted
   * @see realHours
   */
  get defaultRealHours(): number {
    return this._defaultOpenValue.getHours();
  }

  /**
   * @description
   * Same as defaultRealHours
   */
  get defaultHours(): number {
    return this._defaultOpenValue.getHours();
  }

  get defaultMinutes(): number {
    return this._defaultOpenValue.getMinutes();
  }

  get defaultSeconds(): number {
    return this._defaultOpenValue.getSeconds();
  }

  get default12Hours(): string {
    return this._defaultOpenValue.getHours() >= 12 ? 'PM' : 'AM';
  }

  constructor() {}

  private calculateViewHour(value: number): number {
    const selected12Hours = this._selected12Hours || this.default12Hours;
    if (selected12Hours === 'PM' && value > 12) {
      return value - 12;
    }
    if (selected12Hours === 'AM' && value === 0) {
      return 12;
    }
    return value;
  }
}
