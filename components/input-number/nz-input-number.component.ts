/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { FocusMonitor } from '@angular/cdk/a11y';
import { DOWN_ARROW, ENTER, UP_ARROW } from '@angular/cdk/keycodes';
import {
  forwardRef,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { isNotNil, InputBoolean, NzSizeLDSType } from 'ng-zorro-antd/core';

@Component({
  selector: 'nz-input-number',
  exportAs: 'nzInputNumber',
  templateUrl: './nz-input-number.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzInputNumberComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class.ant-input-number-focused]': 'isFocused',
    '[class.ant-input-number-lg]': `nzSize === 'large'`,
    '[class.ant-input-number-sm]': `nzSize === 'small'`,
    '[class.ant-input-number-disabled]': 'nzDisabled'
  }
})
export class NzInputNumberComponent implements ControlValueAccessor, AfterViewInit, OnChanges, OnInit, OnDestroy {
  private autoStepTimer: number;
  private actualValue: string | number;
  private value: string | number;
  displayValue: string | number;
  isFocused = false;
  disabledUp = false;
  disabledDown = false;
  onChange: (value: number) => void = () => null;
  onTouched: () => void = () => null;
  @Output() readonly nzBlur = new EventEmitter();
  @Output() readonly nzFocus = new EventEmitter();
  @ViewChild('inputElement', { static: true }) inputElement: ElementRef<HTMLInputElement>;
  @Input() nzSize: NzSizeLDSType = 'default';
  @Input() nzMin: number = -Infinity;
  @Input() nzMax: number = Infinity;
  @Input() nzParser = (value: any) => value; // tslint:disable-line:no-any
  @Input() nzPrecision: number;
  @Input() nzPlaceHolder = '';
  @Input() nzStep = 1;
  @Input() nzId: string;
  @Input() @InputBoolean() nzDisabled = false;
  @Input() @InputBoolean() nzAutoFocus = false;
  @Input() nzFormatter: (value: number) => string | number = value => value;

  [property: string]: any; // tslint:disable-line:no-any

  updateAutoFocus(): void {
    if (this.nzAutoFocus) {
      this.renderer.setAttribute(this.inputElement.nativeElement, 'autofocus', 'autofocus');
    } else {
      this.renderer.removeAttribute(this.inputElement.nativeElement, 'autofocus');
    }
  }

  onModelChange(value: string): void {
    this.actualValue = this.nzParser(
      value
        .trim()
        .replace(/。/g, '.')
        .replace(/[^\w\.-]+/g, '')
    );
    this.inputElement.nativeElement.value = `${this.actualValue}`;
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
      !!(num && num.toString().indexOf('.') === num.toString().length - 1)
    );
  }

  getValidValue(value?: string | number): string | number | undefined {
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

  setValidateValue(): void {
    const value = this.getCurrentValidValue(this.actualValue);
    this.setValue(value, `${this.value}` !== `${value}`);
  }

  onBlur(): void {
    this.isFocused = false;
    this.setValidateValue();
  }

  onFocus(): void {
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
      result = ((precisionFactor * val + precisionFactor * this.nzStep * rat) / precisionFactor).toFixed(precision);
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
      result = ((precisionFactor * val - precisionFactor * this.nzStep * rat) / precisionFactor).toFixed(precision);
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
    let val = 0;
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
      this[type](e, ratio, true);
    }, 600);
  }

  stop(): void {
    if (this.autoStepTimer) {
      clearTimeout(this.autoStepTimer);
    }
  }

  setValue(value: number, emit: boolean): void {
    if (emit && `${this.value}` !== `${value}`) {
      this.onChange(value);
    }
    this.value = value;
    this.actualValue = value;
    const displayValue = isNotNil(this.nzFormatter(this.value)) ? this.nzFormatter(this.value) : '';
    this.displayValue = displayValue;
    this.inputElement.nativeElement.value = `${displayValue}`;
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
    if (e.code === 'ArrowUp' || e.keyCode === UP_ARROW) {
      const ratio = this.getRatio(e);
      this.up(e, ratio);
      this.stop();
    } else if (e.code === 'ArrowDown' || e.keyCode === DOWN_ARROW) {
      const ratio = this.getRatio(e);
      this.down(e, ratio);
      this.stop();
    } else if (e.keyCode === ENTER) {
      this.setValidateValue();
    }
  }

  onKeyUp(): void {
    this.stop();
  }

  writeValue(value: number): void {
    this.setValue(value, false);
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (_: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = isDisabled;
    this.cdr.markForCheck();
  }

  focus(): void {
    this.focusMonitor.focusVia(this.inputElement, 'keyboard');
  }

  blur(): void {
    this.inputElement.nativeElement.blur();
  }

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private focusMonitor: FocusMonitor
  ) {
    renderer.addClass(elementRef.nativeElement, 'ant-input-number');
  }

  ngOnInit(): void {
    this.focusMonitor.monitor(this.elementRef, true).subscribe(focusOrigin => {
      if (!focusOrigin) {
        this.onBlur();
        this.nzBlur.emit();
        Promise.resolve().then(() => this.onTouched());
      } else {
        this.onFocus();
        this.nzFocus.emit();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzAutoFocus) {
      this.updateAutoFocus();
    }
    if (changes.nzFormatter) {
      const value = this.getCurrentValidValue(this.actualValue);
      this.setValue(value, true);
    }
  }

  ngAfterViewInit(): void {
    if (this.nzAutoFocus) {
      this.focus();
    }
  }

  ngOnDestroy(): void {
    this.focusMonitor.stopMonitoring(this.elementRef);
  }
}
