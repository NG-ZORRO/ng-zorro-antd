import {
  forwardRef,
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  Input,
  Renderer2,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { isNotNil } from '../core/util/check';
import { toBoolean } from '../core/util/convert';

@Component({
  selector   : 'nz-input-number',
  templateUrl: './nz-input-number.component.html',
  providers  : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzInputNumberComponent),
      multi      : true
    }
  ],
  host       : {
    '[class.ant-input-number]'        : 'true',
    '[class.ant-input-number-focused]': 'isFocused'
  }
})
export class NzInputNumberComponent implements ControlValueAccessor, AfterViewInit {
  private isInit = false;
  private _disabled = false;
  private _step = 1;
  private autoStepTimer;
  private _autoFocus = false;
  private _formatter = (value) => value;
  displayValue: string | number;
  actualValue: string | number;
  isFocused = false;
  value: string | number;
  el: HTMLElement = this.elementRef.nativeElement;
  prefixCls = 'ant-input-number';
  disabledUp = false;
  disabledDown = false;
  onChange: (value: number) => void = () => null;
  onTouched: () => void = () => null;
  @ViewChild('inputElement') inputElement: ElementRef;
  @Input() nzSize: 'small' | 'default' | 'large' = 'default';
  @Input() nzMin: number = -Infinity;
  @Input() nzMax: number = Infinity;
  @Input() nzParser = (value) => value;
  @Input() nzPrecision: number;
  @Input() nzPlaceHolder = '';

  @HostBinding('class.ant-input-number-lg')
  get isLarge(): boolean {
    return this.nzSize === 'large';
  }

  @HostBinding('class.ant-input-number-sm')
  get isSmall(): boolean {
    return this.nzSize === 'small';
  }

  @Input()
  set nzAutoFocus(value: boolean) {
    this._autoFocus = toBoolean(value);
    this.updateAutoFocus();
  }

  get nzAutoFocus(): boolean {
    return this._autoFocus;
  }

  @Input()
  @HostBinding('class.ant-input-number-disabled')
  set nzDisabled(value: boolean) {
    this._disabled = toBoolean(value);
  }

  get nzDisabled(): boolean {
    return this._disabled;
  }

  @Input()
  set nzStep(value: number) {
    this._step = value;
  }

  get nzStep(): number {
    return this._step;
  }

  @Input()
  set nzFormatter(v: (value: number) => string | number) {
    this._formatter = v;
    const value = this.getCurrentValidValue(this.actualValue);
    this.writeValue(value);
  }

  get nzFormatter(): (value: number) => string | number {
    return this._formatter;
  }

  updateAutoFocus(): void {
    if (this.nzAutoFocus) {
      this.renderer.setAttribute(this.inputElement.nativeElement, 'autofocus', 'autofocus');
    } else {
      this.renderer.removeAttribute(this.inputElement.nativeElement, 'autofocus');
    }
  }

  onModelChange(value: string): void {
    this.actualValue = this.nzParser(value.trim().replace(/。/g, '.').replace(/[^\w\.-]+/g, ''));
    this.inputElement.nativeElement.value = this.actualValue;
  }

  getCurrentValidValue(value: string | number): number {
    let val = value;
    if (val === '') {
      val = '';
    } else if (!this.isNotCompleteNumber(val)) {
      val = this.getValidValue(val) as string;
    } else {
      val = this.value;
    }
    return this.toNumber(val);
  }

  // '1.' '1x' 'xx' '' => are not complete numbers
  isNotCompleteNumber(num: string | number): boolean {
    return (
      isNaN(num as number) ||
      num === '' ||
      num === null ||
      (num && num.toString().indexOf('.') === num.toString().length - 1)
    );
  }

  getValidValue(value: string | number): string | number {
    let val = parseFloat(value as string);
    // https://github.com/ant-design/ant-design/issues/7358
    if (isNaN(val)) {
      return value;
    }
    if (val < this.nzMin) {
      val = this.nzMin;
    }
    if (val > this.nzMax) {
      val = this.nzMax;
    }
    return val;
  }

  toNumber(num: string | number): number {
    if (this.isNotCompleteNumber(num)) {
      return num as number;
    }
    if (isNotNil(this.nzPrecision)) {
      return Number(Number(num).toFixed(this.nzPrecision));
    }
    return Number(num);
  }

  onBlur(e: FocusEvent): void {
    this.onTouched();
    this.isFocused = false;
    const value = this.getCurrentValidValue(this.actualValue);
    this.setValue(value, `${this.value}` !== `${value}`);
  }

  onFocus(e: FocusEvent): void {
    this.isFocused = true;
  }

  getRatio(e: KeyboardEvent): number {
    let ratio = 1;
    if (e.metaKey || e.ctrlKey) {
      ratio = 0.1;
    } else if (e.shiftKey) {
      ratio = 10;
    }
    return ratio;
  }

  down(e: MouseEvent | KeyboardEvent, ratio?: number): void {
    if (!this.isFocused) {
      this.focus();
    }
    this.step('down', e, ratio);
  }

  up(e: MouseEvent | KeyboardEvent, ratio?: number): void {
    if (!this.isFocused) {
      this.focus();
    }
    this.step('up', e, ratio);
  }

  getPrecision(value: number): number {
    const valueString = value.toString();
    if (valueString.indexOf('e-') >= 0) {
      return parseInt(valueString.slice(valueString.indexOf('e-') + 2), 10);
    }
    let precision = 0;
    if (valueString.indexOf('.') >= 0) {
      precision = valueString.length - valueString.indexOf('.') - 1;
    }
    return precision;
  }

  // step={1.0} value={1.51}
  // press +
  // then value should be 2.51, rather than 2.5
  // if this.props.precision is undefined
  // https://github.com/react-component/input-number/issues/39
  getMaxPrecision(currentValue: string | number, ratio: number): number {
    if (isNotNil(this.nzPrecision)) {
      return this.nzPrecision;
    }
    const ratioPrecision = this.getPrecision(ratio);
    const stepPrecision = this.getPrecision(this.nzStep);
    const currentValuePrecision = this.getPrecision(currentValue as number);
    if (!currentValue) {
      return ratioPrecision + stepPrecision;
    }
    return Math.max(currentValuePrecision, ratioPrecision + stepPrecision);
  }

  getPrecisionFactor(currentValue: string | number, ratio: number): number {
    const precision = this.getMaxPrecision(currentValue, ratio);
    return Math.pow(10, precision);
  }

  upStep(val: string | number, rat: number): number {
    const precisionFactor = this.getPrecisionFactor(val, rat);
    const precision = Math.abs(this.getMaxPrecision(val, rat));
    let result;
    if (typeof val === 'number') {
      result =
        ((precisionFactor * val + precisionFactor * this.nzStep * rat) /
          precisionFactor).toFixed(precision);
    } else {
      result = this.nzMin === -Infinity ? this.nzStep : this.nzMin;
    }
    return this.toNumber(result);
  }

  downStep(val: string | number, rat: number): number {
    const precisionFactor = this.getPrecisionFactor(val, rat);
    const precision = Math.abs(this.getMaxPrecision(val, rat));
    let result;
    if (typeof val === 'number') {
      result =
        ((precisionFactor * val - precisionFactor * this.nzStep * rat) /
          precisionFactor).toFixed(precision);
    } else {
      result = this.nzMin === -Infinity ? -this.nzStep : this.nzMin;
    }
    return this.toNumber(result);
  }

  step(type: string, e: MouseEvent | KeyboardEvent, ratio: number = 1): void {
    this.stop();
    e.preventDefault();
    if (this.nzDisabled) {
      return;
    }
    const value = this.getCurrentValidValue(this.actualValue) || 0;
    let val;
    if (type === 'up') {
      val = this.upStep(value, ratio);
    } else if (type === 'down') {
      val = this.downStep(value, ratio);
    }
    const outOfRange = val > this.nzMax || val < this.nzMin;
    if (val > this.nzMax) {
      val = this.nzMax;
    } else if (val < this.nzMin) {
      val = this.nzMin;
    }
    this.setValue(val, true);
    this.isFocused = true;
    if (outOfRange) {
      return;
    }
    this.autoStepTimer = setTimeout(() => {
      this[ type ](e, ratio, true);
    }, 600);
  }

  stop(): void {
    if (this.autoStepTimer) {
      clearTimeout(this.autoStepTimer);
    }
  }

  setValue(value: number, emit: boolean): void {
    if (emit && (`${this.value}` !== `${value}`)) {
      this.onChange(value);
    }
    this.value = value;
    this.actualValue = value;
    const displayValue = isNotNil(this.nzFormatter(this.value)) ? this.nzFormatter(this.value) : '';
    this.displayValue = displayValue;
    this.inputElement.nativeElement.value = displayValue;
    this.disabledUp = this.disabledDown = false;
    if (value || value === 0) {
      const val = Number(value);
      if (val >= this.nzMax) {
        this.disabledUp = true;
      }
      if (val <= this.nzMin) {
        this.disabledDown = true;
      }
    }

  }

  onKeyDown(e: KeyboardEvent): void {
    if (e.code === 'ArrowUp' || e.keyCode === 38) {
      const ratio = this.getRatio(e);
      this.up(e, ratio);
      this.stop();
    } else if (e.code === 'ArrowDown' || e.keyCode === 40) {
      const ratio = this.getRatio(e);
      this.down(e, ratio);
      this.stop();
    }
  }

  onKeyUp(e: KeyboardEvent): void {
    this.stop();
  }

  writeValue(value: number): void {
    this.setValue(value, false);
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

  focus(): void {
    this.inputElement.nativeElement.focus();
  }

  blur(): void {
    this.inputElement.nativeElement.blur();
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  ngAfterViewInit(): void {
    this.isInit = true;
    if (this._autoFocus) {
      this.focus();
    }
  }
}
