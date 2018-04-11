import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { isUndefined } from 'util';

export class TimeHolder {
  constructor() {
  }

  private _value: Date;
  private _changes = new Subject<Date>();

  get changes(): Observable<Date> {
    return this._changes.asObservable();
  }

  get value(): Date {
    return this._value;
  }

  set value(value: Date) {
    if (value !== this._value) {
      this._value = value;
      if (this._value) {
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
    return isUndefined(this._hours) && isUndefined(this._minutes) && isUndefined(this._seconds);
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
      if (isUndefined(this._hours)) {
        this._hours = this.defaultHours;
      }

      if (isUndefined(this._minutes)) {
        this._minutes = this.defaultMinutes;
      }

      if (isUndefined(this._seconds)) {
        this._seconds = this.defaultSeconds;
      }

      this._value = new Date(0, 0, 0, this._hours, this._minutes, this._seconds);
    }
    this.changed();
  }

  changed(): void {
    this._changes.next(this._value);
  }

  private _hours = undefined;
  get hours(): number {
    return this._hours;
  }

  set hours(value: number) {
    if (value !== this._hours) {
      this._hours = value;
      this.update();
    }
  }

  setHours(value: number): this {
    this.hours = value;
    return this;
  }

  private _minutes = undefined;
  get minutes(): number {
    return this._minutes;
  }

  set minutes(value: number) {
    if (value !== this._minutes) {
      this._minutes = value;
      this.update();
    }
  }

  setMinutes(value: number): this {
    this.minutes = value;
    return this;
  }

  private _seconds = undefined;
  get seconds(): number {
    return this._seconds;
  }

  set seconds(value: number) {
    if (value !== this._seconds) {
      this._seconds = value;
      this.update();
    }
  }

  setSeconds(value: number): this {
    this.seconds = value;
    return this;
  }

  private _defaultOpenValue: Date = new Date();

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
}
