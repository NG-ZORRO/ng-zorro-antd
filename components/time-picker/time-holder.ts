import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

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

  clear(): void {
    this._clear();
    this.update();
  }

  setHours(value: number): this {
    this.hours = value;
    return this;
  }

  setMinutes(value: number): this {
    this.minutes = value;
    return this;
  }

  private _hours = 0;
  get hours(): number {
    return this._hours;
  }

  set hours(value: number) {
    if (value !== this._hours) {
      this._hours = value;
      this.update();
    }
  }

  private _clear(): void {
    this._hours = 0;
    this._minutes = 0;
    this._seconds = 0;
  }

  private _minutes = 0;
  get minutes(): number {
    return this._minutes;
  }

  set minutes(value: number) {
    if (value !== this._minutes) {
      this._minutes = value;
      this.update();
    }
  }

  private update(): void {
    this._value = new Date(0, 0, 0, this.hours, this.minutes, this.seconds);
    this._changes.next(this._value);
  }

  private _seconds = 0;
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
}
