import { TAB } from '@angular/cdk/keycodes';
import {
  forwardRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { toBoolean } from '../util/convert';

@Component({
  selector     : 'nz-input-number',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div class="ant-input-number-handler-wrap"
      (mouseover)="_mouseInside = true"
      (mouseout)="_mouseInside = false">
      <a class="ant-input-number-handler ant-input-number-handler-up"
        [ngClass]="{'ant-input-number-handler-up-disabled':_disabledUp}"
        (click)="_numberUp($event)">
        <span
          class="ant-input-number-handler-up-inner"
          (click)="$event.preventDefault();"></span>
      </a>
      <a
        class="ant-input-number-handler ant-input-number-handler-down"
        [ngClass]="{'ant-input-number-handler-down-disabled':_disabledDown}"
        (click)="_numberDown($event)">
        <span
          class="ant-input-number-handler-down-inner"
          (click)="$event.preventDefault();">
        </span>
      </a>
    </div>
    <div
      class="ant-input-number-input-wrap">
      <input class="ant-input-number-input"
        #inputNumber
        [placeholder]="nzPlaceHolder"
        [disabled]="nzDisabled"
        [(ngModel)]="_displayValue"
        (blur)="_emitBlur($event)"
        (focus)="_emitFocus($event)"
        (keydown)="_emitKeyDown($event)"
        [attr.min]="nzMin"
        [attr.max]="nzMax"
        [attr.step]="_step"
        autocomplete="off">
    </div>`,
  providers    : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzInputNumberComponent),
      multi      : true
    }
  ],
  styleUrls    : [
    './style/index.less'
  ]
})
export class NzInputNumberComponent implements ControlValueAccessor {
  private _disabled = false;
  _el: HTMLElement;
  _value: number;
  _size = 'default';
  _prefixCls = 'ant-input-number';
  _step = 1;
  _precisionStep = 0;
  _precisionFactor = 1;
  _displayValue;
  _disabledUp = false;
  _disabledDown = false;
  _focused = false;
  _mouseInside = false;
  // ngModel Access
  onChange: (value: number) => void = () => null;
  onTouched: () => void = () => null;
  @ViewChild('inputNumber') _inputNumber: ElementRef;

  @Input() nzPlaceHolder = '';
  @Input() nzMin: number = -Infinity;
  @Input() nzMax: number = Infinity;
  @Input() nzFormatter = (value) => value;
  @Input() nzParser = (value) => value;

  @Input()
  @HostBinding('class.ant-input-number-disabled')
  set nzDisabled(value: boolean) {
    this._disabled = toBoolean(value);
  }

  get nzDisabled(): boolean {
    return this._disabled;
  }

  @Input()
  set nzSize(value: string) {
    this._renderer.removeClass(this._el, `${this._prefixCls}-${this._size}`);
    this._size = { large: 'lg', small: 'sm' }[ value ];
    this._renderer.addClass(this._el, `${this._prefixCls}-${this._size}`);
  }

  get nzSize(): string {
    return this._size;
  }

  @Input()
  set nzStep(value: number) {
    this._step = value;
    const stepString = value.toString();
    if (stepString.indexOf('e-') >= 0) {
      this._precisionStep = parseInt(stepString.slice(stepString.indexOf('e-')), 10);
    }
    if (stepString.indexOf('.') >= 0) {
      this._precisionStep = stepString.length - stepString.indexOf('.') - 1;
    }
    this._precisionFactor = Math.pow(10, this._precisionStep);
  }

  get nzStep(): number {
    return this._step;
  }

  // TODO: should reconsider the payload
  @Output() nzBlur: EventEmitter<FocusEvent | KeyboardEvent> = new EventEmitter();
  @Output() nzFocus: EventEmitter<FocusEvent> = new EventEmitter();

  _numberUp($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this._inputNumber.nativeElement.focus();
    if (this.nzValue === undefined) {
      this.nzValue = this.nzMin || 0;
    }
    if (!this._disabledUp) {
      this.nzValue = this.toPrecisionAsStep((this._precisionFactor * this.nzValue + this._precisionFactor * this.nzStep) / this._precisionFactor);
    }
  }

  _numberDown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this._inputNumber.nativeElement.focus();
    if (this.nzValue === undefined) {
      this.nzValue = this.nzMin || 0;
    }
    if (!this._disabledDown) {
      this.nzValue = this.toPrecisionAsStep((this._precisionFactor * this.nzValue - this._precisionFactor * this.nzStep) / this._precisionFactor);
    }
  }

  get nzValue(): number {
    return this._value;
  }

  set nzValue(value: number) {
    this._updateValue(value);
  }

  _emitBlur($event: FocusEvent): void {
    // avoid unnecessary events
    if (this._focused && !this._mouseInside) {
      this._checkValue();
      this._focused = false;
      this.nzBlur.emit($event);
    }
    this.onTouched();
  }

  _emitFocus($event: FocusEvent): void {
    // avoid unnecessary events
    if (!this._focused) {
      this._focused = true;
      this.nzFocus.emit($event);
    }
  }

  _emitKeyDown($event: KeyboardEvent): void {
    if ($event.keyCode === TAB && this._focused) {
      this._checkValue();
      this._focused = false;
      this.nzBlur.emit($event);
    }
  }

  _checkValue(): void {
    const numberValue = +this.nzParser(this._displayValue);
    if (this._isNumber(numberValue)) {
      this.nzValue = numberValue;
    } else {
      this._displayValue = this.nzFormatter(this._value);
      this._inputNumber.nativeElement.value = this.nzFormatter(this._value);
    }
  }

  _getBoundValue(value: number): number {
    if (value > this.nzMax) {
      return this.nzMax;
    } else if (value < this.nzMin) {
      return this.nzMin;
    } else {
      return value;
    }
  }

  _isNumber(value: number): boolean {
    return !isNaN(value) && isFinite(value);
  }

  // TODO: normalize value type on @Input
  toPrecisionAsStep(num: number): number {
    const input = num as number | string;
    if (isNaN(num) || input === '') {
      return num;
    }
    return Number(Number(num).toFixed(this._precisionStep));
  }

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
    this._el = this._elementRef.nativeElement;
    this._renderer.addClass(this._el, `${this._prefixCls}`);
  }

  writeValue(value: number): void {
    this._updateValue(value, false);
  }

  registerOnChange(fn: (_: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = isDisabled;
  }

  private _updateValue(value: number, emitChange: boolean = true): void {
    const cacheValue = this._value;
    this._value = this._getBoundValue(value);
    this._displayValue = this.nzFormatter(this._value);
    this._inputNumber.nativeElement.value = this.nzFormatter(this._value);
    if (emitChange && (value !== cacheValue)) {
      this.onChange(this._value);
    }
    this._disabledUp = (this.nzValue !== undefined) && !((this.nzValue + this.nzStep) <= this.nzMax);
    this._disabledDown = (this.nzValue !== undefined) && !((this.nzValue - this.nzStep) >= this.nzMin);
  }
}
