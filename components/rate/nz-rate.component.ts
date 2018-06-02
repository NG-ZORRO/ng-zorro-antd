import {
  forwardRef,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { toBoolean } from '../core/util/convert';

@Component({
  selector           : 'nz-rate',
  preserveWhitespaces: false,
  templateUrl        : './nz-rate.component.html',
  providers          : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzRateComponent),
      multi      : true
    }
  ]
})
export class NzRateComponent implements OnInit, ControlValueAccessor, AfterViewInit {
  private _allowClear = true;
  private _allowHalf = false;
  private _disabled = false;
  private _count = 5;
  private _value = 0;
  private _autoFocus = false;
  @Input() nzCharacter: TemplateRef<void>;
  @Output() nzOnBlur = new EventEmitter<FocusEvent>();
  @Output() nzOnFocus = new EventEmitter<FocusEvent>();
  @Output() nzOnKeyDown = new EventEmitter<KeyboardEvent>();
  @Output() nzOnHoverChange = new EventEmitter<number>();
  @ViewChild('ulElement') private ulElement: ElementRef;
  prefixCls = 'ant-rate';
  isInit = false;
  hasHalf = false;
  innerPrefixCls = `${this.prefixCls}-star`;
  classMap;
  starArray: number[] = [];
  hoverValue = 0;
  isFocused = false;
  floatReg: RegExp = /^\d+(\.\d+)?$/;

  onChange: (value: number) => void = () => null;
  onTouched: () => void = () => null;

  @Input()
  set nzAutoFocus(value: boolean) {
    this._autoFocus = toBoolean(value);
    this.updateAutoFocus();
  }

  get nzAutoFocus(): boolean {
    return this._autoFocus;
  }

  @Input()
  set nzCount(value: number) {
    if (this._count === value) {
      return;
    }
    this._count = value;
    this.updateStarArray();
  }

  get nzCount(): number {
    return this._count;
  }

  @Input()
  set nzAllowHalf(value: boolean) {
    this._allowHalf = toBoolean(value);
  }

  get nzAllowHalf(): boolean {
    return this._allowHalf;
  }

  @Input()
  set nzAllowClear(value: boolean) {
    this._allowClear = toBoolean(value);
  }

  get nzAllowClear(): boolean {
    return this._allowClear;
  }

  get nzValue(): number {
    return this._value;
  }

  set nzValue(input: number) {
    let value = input;
    if (this._value === value) {
      return;
    }
    this._value = value;
    if (this.floatReg.test(value.toString())) {
      value += 0.5;
      this.hasHalf = true;
    }
    this.hoverValue = value;
  }

  @Input()
  set nzDisabled(value: boolean) {
    this._disabled = toBoolean(value);
    this.setClassMap();
  }

  get nzDisabled(): boolean {
    return this._disabled;
  }

  setClassMap(): void {
    this.classMap = {
      [ this.prefixCls ]              : true,
      [ `${this.prefixCls}-disabled` ]: this.nzDisabled
    };
  }

  updateAutoFocus(): void {
    if (this.isInit && !this.nzDisabled) {
      if (this.nzAutoFocus) {
        this.renderer.setAttribute(this.ulElement.nativeElement, 'autofocus', 'autofocus');
      } else {
        this.renderer.removeAttribute(this.ulElement.nativeElement, 'autofocus');
      }
    }
  }

  clickRate(e: MouseEvent, index: number, isFull: boolean): void {
    e.stopPropagation();
    if (this.nzDisabled) {
      return;
    }
    this.hasHalf = !isFull && this.nzAllowHalf;

    let actualValue = index + 1;
    this.hoverValue = actualValue;

    if (this.hasHalf) {
      actualValue -= 0.5;
    }

    if (this.nzValue === actualValue) {
      if (this.nzAllowClear) {
        this.nzValue = 0;
        this.onChange(this.nzValue);
      }
    } else {
      this.nzValue = actualValue;
      this.onChange(this.nzValue);
    }
  }

  hoverRate(e: MouseEvent, index: number, isFull: boolean): void {
    e.stopPropagation();
    if (this.nzDisabled) {
      return;
    }
    const isHalf: boolean = !isFull && this.nzAllowHalf;
    if (this.hoverValue === index + 1 && isHalf === this.hasHalf) {
      return;
    }

    this.hoverValue = index + 1;
    this.nzOnHoverChange.emit(this.hoverValue);
    this.hasHalf = isHalf;
  }

  leaveRate(e: MouseEvent): void {
    e.stopPropagation();
    let oldVal = this.nzValue;
    if (this.floatReg.test(oldVal.toString())) {
      oldVal += 0.5;
      this.hasHalf = true;
    }
    this.hoverValue = oldVal;
  }

  onFocus(e: FocusEvent): void {
    this.isFocused = true;
    this.nzOnFocus.emit(e);
  }

  onBlur(e: FocusEvent): void {
    this.isFocused = false;
    this.nzOnBlur.emit(e);
  }

  focus(): void {
    this.ulElement.nativeElement.focus();
  }

  blur(): void {
    this.ulElement.nativeElement.blur();
  }

  onKeyDown(e: KeyboardEvent): void {
    const code = e.code;
    if ((code === 'ArrowRight' || e.keyCode === 39) && (this.nzValue < this.nzCount)) {
      if (this.nzAllowHalf) {
        this.nzValue += 0.5;
      } else {
        this.nzValue += 1;
      }
      this.onChange(this.nzValue);
    } else if ((code === 'ArrowLeft' || e.keyCode === 37) && (this.nzValue > 0)) {
      if (this.nzAllowHalf) {
        this.nzValue -= 0.5;
      } else {
        this.nzValue -= 1;
      }
      this.onChange(this.nzValue);
    }
    this.nzOnKeyDown.emit(e);
    e.preventDefault();
  }

  setClasses(i: number): object {
    return {
      [ this.innerPrefixCls ]             : true,
      [ `${this.innerPrefixCls}-full` ]   : (i + 1 < this.hoverValue) || (!this.hasHalf) && (i + 1 === this.hoverValue),
      [ `${this.innerPrefixCls}-half` ]   : (this.hasHalf) && (i + 1 === this.hoverValue),
      [ `${this.innerPrefixCls}-active` ] : (this.hasHalf) && (i + 1 === this.hoverValue),
      [ `${this.innerPrefixCls}-zero` ]   : (i + 1 > this.hoverValue),
      [ `${this.innerPrefixCls}-focused` ]: (this.hasHalf) && (i + 1 === this.hoverValue) && this.isFocused
    };
  }

  updateStarArray(): void {
    let index = 0;
    this.starArray = [];
    while (index < this.nzCount) {
      this.starArray.push(index++);
    }
  }

  writeValue(value: number | null): void {
    this.nzValue = value || 0;
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

  constructor(private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.setClassMap();
    this.updateStarArray();
  }

  ngAfterViewInit(): void {
    this.isInit = true;
  }
}
