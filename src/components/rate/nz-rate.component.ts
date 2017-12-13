import {
  forwardRef,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { toBoolean } from '../util/convert';

@Component({
  selector     : 'nz-rate',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <ul [ngClass]="_classMap" (mouseleave)="_leaveRate($event)">
      <li *ngFor="let star of _starArray; let i = index"
        [ngClass]="setClasses(i)"
        (mouseover)="_hoverRate($event, i, true)"
        (click)="_clickRate($event, i, true)">
        <div class="ant-rate-star-first" (mouseover)="_hoverRate($event, i)" (click)="_clickRate($event, i)">
          <i class="anticon anticon-star"></i></div>
        <div class="ant-rate-star-second" (mouseover)="_hoverRate($event, i, true)" (click)="_clickRate($event, i, true)">
          <i class="anticon anticon-star"></i></div>
      </li>
    </ul>
  `,
  providers    : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzRateComponent),
      multi      : true
    }
  ],
  styleUrls    : [
    './style/index.less'
  ]
})
export class NzRateComponent implements OnInit, ControlValueAccessor {
  private _hasHalf = false;
  private _allowHalf = false;
  private _disabled = false;

  _prefixCls = 'ant-rate';
  _innerPrefixCls = `${this._prefixCls}-star`;
  _classMap;
  _starArray: number[] = [];
  _count = 5;
  _value = 0;
  _hoverValue = 0; // 鼠标悬浮时的星数，为正整数，和_hasHalf配合使用
  // TODO: What's this for? It will match all number values
  _floatReg: RegExp = /^\d+(\.\d+)?$/;

  // ngModel Access
  onChange: (value: number) => void = () => null;
  onTouched: () => void = () => null;

  @Input()
  set nzCount(value: number) {
    this._count = value;
  }

  @Input()
  set nzAllowHalf(value: boolean) {
    this._allowHalf = toBoolean(value);
  }

  @Input()
  set nzDefaultValue(input: number) {
    let value = input;
    this._value = value;
    if (this._floatReg.test(value.toString())) {
      value += 0.5;
      this._hasHalf = true;
    }
    this._hoverValue = value;
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
    if (this._floatReg.test(value.toString())) {
      value += 0.5;
      this._hasHalf = true;
    }
    this._hoverValue = value;
  }

  @Input()
  set nzDisabled(value: boolean) {
    this._disabled = toBoolean(value);
    this.setClassMap();
  }

  setClassMap(): void {
    this._classMap = {
      [this._prefixCls]              : true,
      [`${this._prefixCls}-disabled`]: this._disabled
    };
  }

  setChildrenClassMap(): void {
    let index = 0;
    while (index < this._count) {
      this._starArray.push(index++);
    }
  }

  _clickRate(e: MouseEvent, index: number, isFull: boolean): void {
    e.stopPropagation();
    if (this._disabled) {
      return;
    }
    this._hoverValue = this._value = index + 1;
    this._hasHalf = !isFull && this._allowHalf;
    if (this._hasHalf) {
      this._value -= 0.5;
    }
    this.onChange(this._value);
  }

  _hoverRate(e: MouseEvent, index: number, isFull: boolean): void {
    e.stopPropagation();
    if (this._disabled) {
      return;
    }
    const isHalf: boolean = !isFull && this._allowHalf;
    // 如果星数一致，则不作操作，用于提高性能
    if (this._hoverValue === index + 1 && isHalf === this._hasHalf) {
      return;
    }

    this._hoverValue = index + 1;
    this._hasHalf = isHalf;
  }

  _leaveRate(e: MouseEvent): void {
    e.stopPropagation();
    let oldVal = this._value;
    if (this._floatReg.test(oldVal.toString())) {
      oldVal += 0.5;
      this._hasHalf = true;
    }
    this._hoverValue = oldVal;
  }

  setClasses(i: number): object {
    return {
      [this._innerPrefixCls]            : true,
      [`${this._innerPrefixCls}-full`]  : (i + 1 < this._hoverValue) || (!this._hasHalf) && (i + 1 === this._hoverValue),
      [`${this._innerPrefixCls}-half`]  : (this._hasHalf) && (i + 1 === this._hoverValue),
      [`${this._innerPrefixCls}-active`]: (this._hasHalf) && (i + 1 === this._hoverValue),
      [`${this._innerPrefixCls}-zero`]  : (i + 1 > this._hoverValue)
    };
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

  ngOnInit(): void {
    this.setClassMap();
    this.setChildrenClassMap();
  }
}
