import {
  Component,
  ViewEncapsulation,
  Input,
  ElementRef,
  Renderer2,
  HostListener,
  ViewChild,
  HostBinding,
  forwardRef
} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector     : 'nz-input-number',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div class="ant-input-number-handler-wrap">
      <a class="ant-input-number-handler ant-input-number-handler-up"
        [ngClass]="{'ant-input-number-handler-up-disabled':_disabledUp}"
        (mousedown)="_numberUp($event)">
        <span
          class="ant-input-number-handler-up-inner"
          (click)="$event.preventDefault();"></span>
      </a>
      <a
        class="ant-input-number-handler ant-input-number-handler-down"
        [ngClass]="{'ant-input-number-handler-down-disabled':_disabledDown}"
        (mousedown)="_numberDown($event)">
        <span
          class="ant-input-number-handler-down-inner"
          (click)="$event.preventDefault();">
        </span>
      </a>
    </div>
    <div
      #inputWrapper
      class="ant-input-number-input-wrap">
      <input class="ant-input-number-input"
        #inputNumber
        [placeholder]="nzPlaceHolder"
        [disabled]="nzDisabled"
        [(ngModel)]="nzValue"
        (ngModelChange)="_userInputChange()"
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
  _el: HTMLElement;
  _value: number;
  _size = 'default';
  _prefixCls = 'ant-input-number';
  _disabledUp = false;
  _disabledDown = false;
  _step = 1;
  _precisionStep = 0;
  _precisionFactor = 1;
  // ngModel Access
  onChange: any = Function.prototype;
  onTouched: any = Function.prototype;
  @ViewChild('inputNumber') _inputNumber: ElementRef;
  @ViewChild('inputWrapper') _inputWrapper: ElementRef;

  @Input() nzPlaceHolder = '';
  @Input() nzMin: number = -Infinity;
  @Input() nzMax: number = Infinity;

  @Input() @HostBinding('class.ant-input-number-disabled') nzDisabled = false;

  @Input()
  get nzSize(): string {
    return this._size;
  };

  set nzSize(value: string) {
    this._renderer.removeClass(this._el, `${this._prefixCls}-${this._size}`);
    this._size = { large: 'lg', small: 'sm' }[ value ];
    this._renderer.addClass(this._el, `${this._prefixCls}-${this._size}`);
  }

  @Input()
  get nzStep(): number {
    return this._step;
  }

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

  @HostListener('document:click', [ '$event.target' ])
  onClick(target) {
    if (target && !this._inputWrapper.nativeElement.contains(target)) {
      this._offClick();
    }
  }

  _checkDisabled = () => {
    this._disabledUp = !((this.nzValue + this.nzStep) <= this.nzMax);
    this._disabledDown = !((this.nzValue - this.nzStep) >= this.nzMin);
  }

  _numberUp($event) {
    $event.preventDefault();
    $event.stopPropagation();
    if (this.nzValue === undefined) {
      this.nzValue = this.nzMin || 0;
    }
    this._checkDisabled();
    if (!this._disabledUp) {
      this.nzValue = this.toPrecisionAsStep((this._precisionFactor * this.nzValue + this._precisionFactor * this.nzStep) / this._precisionFactor);
    }
    this._checkDisabled();
    this._userInputChange();
  }

  _numberDown($event) {
    $event.preventDefault();
    $event.stopPropagation();
    if (this.nzValue === undefined) {
      this.nzValue = this.nzMin || 0;
    }
    this._checkDisabled();
    if (!this._disabledDown) {
      this.nzValue = this.toPrecisionAsStep((this._precisionFactor * this.nzValue - this._precisionFactor * this.nzStep) / this._precisionFactor);
    }
    this._checkDisabled();
    this._userInputChange();
  }

  get nzValue(): number {
    return this._value;
  };

  set nzValue(value: number) {
    if (this._value === value) {
      return;
    }
    if (value > this.nzMax) {
      this._value = this.nzMax;
      this.onChange(this.nzMax);
    } else if (value < this.nzMin) {
      this._value = this.nzMin;
      this.onChange(this.nzMin);
    } else {
      this._value = value;
      this._checkDisabled();
    }
  }

  _userInputChange() {
    this.onChange(this.nzValue);
  }

  _offClick() {
    if (this._value === undefined) {
      return;
    }
    if (this._inputNumber.nativeElement.value > this.nzMax) {
      this._inputNumber.nativeElement.value = this.nzMax;
      this.onChange(this.nzMax);
    } else if (this._inputNumber.nativeElement.value < this.nzMin) {
      this._inputNumber.nativeElement.value = this.nzMin;
      this.onChange(this.nzMin);
    }
  }

  toPrecisionAsStep(num) {
    if (isNaN(num) || num === '') {
      return num;
    }
    return Number(Number(num).toFixed(this._precisionStep));
  }

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
    this._el = this._elementRef.nativeElement;
    this._renderer.addClass(this._el, `${this._prefixCls}`);
  }

  writeValue(value: any): void {
    this.nzValue = value;
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = isDisabled;
  }
}
