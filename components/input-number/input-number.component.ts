/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { FocusMonitor } from '@angular/cdk/a11y';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { DOWN_ARROW, ENTER, UP_ARROW } from '@angular/cdk/keycodes';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent, merge, Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { NzFormStatusService } from 'ng-zorro-antd/core/form';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import {
  BooleanInput,
  NgClassInterface,
  NzSizeLDSType,
  NzStatus,
  NzValidateStatus,
  OnChangeType,
  OnTouchedType
} from 'ng-zorro-antd/core/types';
import { getStatusClassNames, InputBoolean, isNotNil } from 'ng-zorro-antd/core/util';

@Component({
  selector: 'nz-input-number',
  exportAs: 'nzInputNumber',
  template: `
    <div class="ant-input-number-handler-wrap">
      <span
        #upHandler
        unselectable="unselectable"
        class="ant-input-number-handler ant-input-number-handler-up"
        (mousedown)="up($event)"
        [class.ant-input-number-handler-up-disabled]="disabledUp"
      >
        <i nz-icon nzType="up" class="ant-input-number-handler-up-inner"></i>
      </span>
      <span
        #downHandler
        unselectable="unselectable"
        class="ant-input-number-handler ant-input-number-handler-down"
        (mousedown)="down($event)"
        [class.ant-input-number-handler-down-disabled]="disabledDown"
      >
        <i nz-icon nzType="down" class="ant-input-number-handler-down-inner"></i>
      </span>
    </div>
    <div class="ant-input-number-input-wrap">
      <input
        #inputElement
        autocomplete="off"
        class="ant-input-number-input"
        [attr.id]="nzId"
        [attr.autofocus]="nzAutoFocus ? 'autofocus' : null"
        [disabled]="nzDisabled"
        [attr.min]="nzMin"
        [attr.max]="nzMax"
        [placeholder]="nzPlaceHolder"
        [attr.step]="nzStep"
        [readOnly]="nzReadOnly"
        [attr.inputmode]="nzInputMode"
        [ngModel]="displayValue"
        (ngModelChange)="onModelChange($event)"
      />
    </div>
    <nz-form-item-feedback-icon
      class="ant-input-number-suffix"
      *ngIf="hasFeedback && !!status"
      [status]="status"
    ></nz-form-item-feedback-icon>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzInputNumberComponent),
      multi: true
    },
    NzDestroyService
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ant-input-number',
    '[class.ant-input-number-in-form-item]': '!!nzFormStatusService',
    '[class.ant-input-number-focused]': 'isFocused',
    '[class.ant-input-number-lg]': `nzSize === 'large'`,
    '[class.ant-input-number-sm]': `nzSize === 'small'`,
    '[class.ant-input-number-disabled]': 'nzDisabled',
    '[class.ant-input-number-readonly]': 'nzReadOnly',
    '[class.ant-input-number-rtl]': `dir === 'rtl'`
  }
})
export class NzInputNumberComponent implements ControlValueAccessor, AfterViewInit, OnChanges, OnInit, OnDestroy {
  static ngAcceptInputType_nzDisabled: BooleanInput;
  static ngAcceptInputType_nzReadOnly: BooleanInput;
  static ngAcceptInputType_nzAutoFocus: BooleanInput;

  private autoStepTimer?: number;
  private parsedValue?: string | number;
  private value?: number;
  displayValue?: string | number;
  isFocused = false;
  disabled$ = new Subject<boolean>();
  disabledUp = false;
  disabledDown = false;
  dir: Direction = 'ltr';
  // status
  prefixCls: string = 'ant-input-number';
  status: NzValidateStatus = '';
  statusCls: NgClassInterface = {};
  hasFeedback: boolean = false;
  onChange: OnChangeType = () => {};
  onTouched: OnTouchedType = () => {};
  @Output() readonly nzBlur = new EventEmitter();
  @Output() readonly nzFocus = new EventEmitter();
  /** The native `<span class="ant-input-number-handler-up"></span>` element. */
  @ViewChild('upHandler', { static: true }) upHandler!: ElementRef<HTMLElement>;
  /** The native `<span class="ant-input-number-handler-down"></span>` element. */
  @ViewChild('downHandler', { static: true }) downHandler!: ElementRef<HTMLElement>;
  /** The native `<input class="ant-input-number-input" />` element. */
  @ViewChild('inputElement', { static: true }) inputElement!: ElementRef<HTMLInputElement>;
  @Input() nzSize: NzSizeLDSType = 'default';
  @Input() nzMin: number = -Infinity;
  @Input() nzMax: number = Infinity;
  @Input() nzParser = (value: string): string =>
    value
      .trim()
      .replace(/。/g, '.')
      .replace(/[^\w\.-]+/g, '');
  @Input() nzPrecision?: number;
  @Input() nzPrecisionMode: 'cut' | 'toFixed' | ((value: number | string, precision?: number) => number) = 'toFixed';
  @Input() nzPlaceHolder = '';
  @Input() nzStatus: NzStatus = '';
  @Input() nzStep = 1;
  @Input() nzInputMode: string = 'decimal';
  @Input() nzId: string | null = null;
  @Input() @InputBoolean() nzDisabled = false;
  @Input() @InputBoolean() nzReadOnly = false;
  @Input() @InputBoolean() nzAutoFocus = false;
  @Input() nzFormatter: (value: number) => string | number = value => value;

  onModelChange(value: string): void {
    this.parsedValue = this.nzParser(value);
    this.inputElement.nativeElement.value = `${this.parsedValue}`;
    const validValue = this.getCurrentValidValue(this.parsedValue);
    this.setValue(validValue);
  }

  getCurrentValidValue(value: string | number): number {
    let val = value;
    if (val === '') {
      val = '';
    } else if (!this.isNotCompleteNumber(val)) {
      val = `${this.getValidValue(val)}`;
    } else {
      val = this.value!;
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
    const numStr = String(num);
    if (numStr.indexOf('.') >= 0 && isNotNil(this.nzPrecision)) {
      if (typeof this.nzPrecisionMode === 'function') {
        return this.nzPrecisionMode(num, this.nzPrecision);
      } else if (this.nzPrecisionMode === 'cut') {
        const numSplit = numStr.split('.');
        numSplit[1] = numSplit[1].slice(0, this.nzPrecision);
        return Number(numSplit.join('.'));
      }
      return Number(Number(num).toFixed(this.nzPrecision));
    }
    return Number(num);
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

  step<T extends keyof NzInputNumberComponent>(type: T, e: MouseEvent | KeyboardEvent, ratio: number = 1): void {
    this.stop();
    e.preventDefault();
    if (this.nzDisabled) {
      return;
    }
    const value = this.getCurrentValidValue(this.parsedValue!) || 0;
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
    this.setValue(val);
    this.updateDisplayValue(val);
    this.isFocused = true;
    if (outOfRange) {
      return;
    }
    this.autoStepTimer = setTimeout(() => {
      (this[type] as (e: MouseEvent | KeyboardEvent, ratio: number) => void)(e, ratio);
    }, 300);
  }

  stop(): void {
    if (this.autoStepTimer) {
      clearTimeout(this.autoStepTimer);
    }
  }

  setValue(value: number): void {
    if (`${this.value}` !== `${value}`) {
      this.onChange(value);
    }
    this.value = value;
    this.parsedValue = value;
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

  updateDisplayValue(value: number): void {
    const displayValue = isNotNil(this.nzFormatter(value)) ? this.nzFormatter(value) : '';
    this.displayValue = displayValue;
    this.inputElement.nativeElement.value = `${displayValue}`;
  }

  writeValue(value: number): void {
    this.value = value;
    this.setValue(value);
    this.updateDisplayValue(value);
    this.cdr.markForCheck();
  }

  registerOnChange(fn: OnChangeType): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: OnTouchedType): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.nzDisabled = disabled;
    this.disabled$.next(disabled);
    this.cdr.markForCheck();
  }

  focus(): void {
    this.focusMonitor.focusVia(this.inputElement, 'keyboard');
  }

  blur(): void {
    this.inputElement.nativeElement.blur();
  }

  constructor(
    private ngZone: NgZone,
    private elementRef: ElementRef<HTMLElement>,
    private cdr: ChangeDetectorRef,
    private focusMonitor: FocusMonitor,
    private renderer: Renderer2,
    @Optional() private directionality: Directionality,
    private destroy$: NzDestroyService,
    @Optional() public nzFormStatusService?: NzFormStatusService
  ) {}

  ngOnInit(): void {
    this.nzFormStatusService?.formStatusChanges
      .pipe(
        distinctUntilChanged((pre, cur) => {
          return pre.status === cur.status && pre.hasFeedback === cur.hasFeedback;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(({ status, hasFeedback }) => {
        this.setStatusStyles(status, hasFeedback);
      });

    this.focusMonitor
      .monitor(this.elementRef, true)
      .pipe(takeUntil(this.destroy$))
      .subscribe(focusOrigin => {
        if (!focusOrigin) {
          this.isFocused = false;
          this.updateDisplayValue(this.value!);
          this.nzBlur.emit();
          Promise.resolve().then(() => this.onTouched());
        } else {
          this.isFocused = true;
          this.nzFocus.emit();
        }
      });

    this.dir = this.directionality.value;
    this.directionality.change.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
    });

    this.setupHandlersListeners();

    this.ngZone.runOutsideAngular(() => {
      fromEvent(this.inputElement.nativeElement, 'keyup')
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.stop());

      fromEvent<KeyboardEvent>(this.inputElement.nativeElement, 'keydown')
        .pipe(takeUntil(this.destroy$))
        .subscribe(event => {
          const { keyCode } = event;

          if (keyCode !== UP_ARROW && keyCode !== DOWN_ARROW && keyCode !== ENTER) {
            return;
          }

          this.ngZone.run(() => {
            if (keyCode === UP_ARROW) {
              const ratio = this.getRatio(event);
              this.up(event, ratio);
              this.stop();
            } else if (keyCode === DOWN_ARROW) {
              const ratio = this.getRatio(event);
              this.down(event, ratio);
              this.stop();
            } else {
              this.updateDisplayValue(this.value!);
            }

            this.cdr.markForCheck();
          });
        });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzStatus, nzDisabled } = changes;
    if (changes.nzFormatter && !changes.nzFormatter.isFirstChange()) {
      const validValue = this.getCurrentValidValue(this.parsedValue!);
      this.setValue(validValue);
      this.updateDisplayValue(validValue);
    }
    if (nzDisabled) {
      this.disabled$.next(this.nzDisabled);
    }
    if (nzStatus) {
      this.setStatusStyles(this.nzStatus, this.hasFeedback);
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

  private setupHandlersListeners(): void {
    this.ngZone.runOutsideAngular(() => {
      merge(
        fromEvent(this.upHandler.nativeElement, 'mouseup'),
        fromEvent(this.upHandler.nativeElement, 'mouseleave'),
        fromEvent(this.downHandler.nativeElement, 'mouseup'),
        fromEvent(this.downHandler.nativeElement, 'mouseleave')
      )
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.stop());
    });
  }

  private setStatusStyles(status: NzValidateStatus, hasFeedback: boolean): void {
    // set inner status
    this.status = status;
    this.hasFeedback = hasFeedback;
    this.cdr.markForCheck();
    // render status if nzStatus is set
    this.statusCls = getStatusClassNames(this.prefixCls, status, hasFeedback);
    Object.keys(this.statusCls).forEach(status => {
      if (this.statusCls[status]) {
        this.renderer.addClass(this.elementRef.nativeElement, status);
      } else {
        this.renderer.removeClass(this.elementRef.nativeElement, status);
      }
    });
  }
}
