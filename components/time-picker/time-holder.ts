import { Observable, Subject } from 'rxjs';

import { isNotNil } from '../core/util/check';

/**
 * use for 12-hour to distinguish DataHour and View Hour when `nzUse12Hours` is true
 * ViewHour is used for UI view and its range is [0 - 12]
 * DataHour is actullay hour value and its rangs is [0 - 23]
 */
export const enum HourTypes {
  DataHour,
  ViewHour
}

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
        if (this._use12Hours) {
          this._selected12Hours = this._hours >= 12 ? 'PM' : 'AM';
        }
      } else {
        this._clear();
      }
    }
  }

  setValue(value: Date | undefined, use12Hours?: boolean): this {
    if (isNotNil(use12Hours)) {
      this._use12Hours = use12Hours;
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
        if (this.selected12Hours === 'PM' && this._hours < 12) {
          this._hours += 12;
          this._value.setHours(this._hours);
        }
        if (this.selected12Hours === 'AM' && this._hours >= 12) {
          this._hours -= 12;
          this._value.setHours(this._hours);
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
   *  get ViewHour or DataHour depeond on the `type` param
   *  the transformed value which from DataHour to ViewHour is `value` param and this._hours is default `value`
   */
  getHours(type: HourTypes, defaulValue?: number): number | undefined {
    const transformedValue = isNotNil(defaulValue) ? defaulValue : this._hours;
    if (!isNotNil(transformedValue)) {
      return undefined;
    }
    if (type === HourTypes.ViewHour) {
      return this.getViewHours(transformedValue, this._selected12Hours || this.default12Hours);
    } else {
      return this._hours;
    }
  }

  get hours(): number | undefined {
    return this._hours;
  }

  /**
   *  this._hours stands for DataHour.
   *  ViewHour can be accessed by getHours()
   */
  set hours(value: number | undefined) {
    if (value !== this._hours) {
      if (this._use12Hours) {
        if (this.selected12Hours === 'PM' && value !== 12 ) {
          this._hours = value + 12;
        } else if (this.selected12Hours === 'AM' && value === 12) {
          this._hours = 0;
        }
      }
      this._hours = value;
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

  get selected12Hours(): string {
    return this._selected12Hours;
  }

  set selected12Hours(value: string) {
    if (value.toUpperCase() !== this._selected12Hours) {
      this._selected12Hours = value.toUpperCase();
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

  constructor() {
  }

  private getViewHours(value: number, selecte12Hours: string): number {
    if (!this._use12Hours) {
      return value;
    }
    if (selecte12Hours === 'PM' && value > 12) {
      return value - 12;
    }
    if (selecte12Hours === 'AM' && value === 0 ) {
      return 12;
    }
    return value;
  }
}
