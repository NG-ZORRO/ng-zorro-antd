import { Observable, Subject } from 'rxjs';
import { isNotNil } from '../core/util/check';

export class TimeHolder {
  private _seconds = undefined;
  private _hours = undefined;
  private _minutes = undefined;
  private _defaultOpenValue: Date = new Date();
  private _value: Date;
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

  get changes(): Observable<Date> {
    return this._changes.asObservable();
  }

  get value(): Date {
    return this._value;
  }

  set value(value: Date) {
    if (value !== this._value) {
      this._value = value;
      if (isNotNil(this._value)) {
        this._hours = this._value.getHours();
        this._minutes = this._value.getMinutes();
        this._seconds = this._value.getSeconds();
      } else {
        this._clear();
      }
    }
  }

  setValue(value: Date): this {
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
  }

  private update(): void {
    if (this.isEmpty) {
      this._value = undefined;
    } else {
      if (!isNotNil(this._hours)) {
        this._hours = this.defaultHours;
      } else {
        this._value.setHours(this.hours);
      }

      if (!isNotNil(this._minutes)) {
        this._minutes = this.defaultMinutes;
      } else {
        this._value.setMinutes(this.minutes);
      }

      if (!isNotNil(this._seconds)) {
        this._seconds = this.defaultSeconds;
      } else {
        this._value.setSeconds(this.seconds);
      }

      this._value = new Date(this._value);
    }
    this.changed();
  }

  changed(): void {
    this._changes.next(this._value);
  }

  get hours(): number {
    return this._hours;
  }

  set hours(value: number) {
    if (value !== this._hours) {
      this._hours = value;
      this.update();
    }
  }

  get minutes(): number {
    return this._minutes;
  }

  set minutes(value: number) {
    if (value !== this._minutes) {
      this._minutes = value;
      this.update();
    }
  }

  get seconds(): number {
    return this._seconds;
  }

  set seconds(value: number) {
    if (value !== this._seconds) {
      this._seconds = value;
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

  constructor() {
  }

}
