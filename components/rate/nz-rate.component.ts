/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
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
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { InputBoolean, NgClassType, NzConfigService, WithConfig } from 'ng-zorro-antd/core';

const NZ_CONFIG_COMPONENT_NAME = 'rate';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-rate',
  exportAs: 'nzRate',
  preserveWhitespaces: false,
  templateUrl: './nz-rate.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzRateComponent),
      multi: true
    }
  ]
})
export class NzRateComponent implements OnInit, OnDestroy, ControlValueAccessor, AfterViewInit, OnChanges {
  @ViewChild('ulElement', { static: false }) private ulElement: ElementRef;

  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, true) @InputBoolean() nzAllowClear: boolean;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, false) @InputBoolean() nzAllowHalf: boolean;
  @Input() @InputBoolean() nzDisabled: boolean = false;
  @Input() @InputBoolean() nzAutoFocus: boolean = false;
  @Input() nzCharacter: TemplateRef<void>;
  @Input() nzTooltips: string[] = [];
  @Output() readonly nzOnBlur = new EventEmitter<FocusEvent>();
  @Output() readonly nzOnFocus = new EventEmitter<FocusEvent>();
  @Output() readonly nzOnHoverChange = new EventEmitter<number>();
  @Output() readonly nzOnKeyDown = new EventEmitter<KeyboardEvent>();

  classMap: NgClassType;
  hasHalf = false;
  hoverValue = 0;
  prefixCls = 'ant-rate';
  innerPrefixCls = `${this.prefixCls}-star`;
  isFocused = false;
  isInit = false;
  starArray: number[] = [];

  private destroy$ = new Subject<void>();
  private _count = 5;
  private _value = 0;

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

  get nzValue(): number {
    return this._value;
  }

  set nzValue(input: number) {
    if (this._value === input) {
      return;
    }

    this._value = input;
    this.hasHalf = !Number.isInteger(input);
    this.hoverValue = Math.ceil(input);
  }

  constructor(public nzConfigService: NzConfigService, private renderer: Renderer2, private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzAutoFocus && !changes.nzAutoFocus.isFirstChange()) {
      if (this.nzAutoFocus && !this.nzDisabled) {
        this.renderer.setAttribute(this.ulElement.nativeElement, 'autofocus', 'autofocus');
      } else {
        this.renderer.removeAttribute(this.ulElement.nativeElement, 'autofocus');
      }
    }
  }

  ngOnInit(): void {
    this.updateStarArray();

    this.nzConfigService
      .getConfigChangeEventForComponent(NZ_CONFIG_COMPONENT_NAME)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.cdr.markForCheck());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    this.isInit = true;
  }

  onItemClick(index: number, isHalf: boolean): void {
    if (this.nzDisabled) {
      return;
    }

    this.hoverValue = index + 1;

    const actualValue = isHalf ? index + 0.5 : index + 1;

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

  onItemHover(index: number, isHalf: boolean): void {
    if (this.nzDisabled || (this.hoverValue === index + 1 && isHalf === this.hasHalf)) {
      return;
    }

    this.hoverValue = index + 1;
    this.hasHalf = isHalf;
    this.nzOnHoverChange.emit(this.hoverValue);
  }

  onRateLeave(): void {
    this.hasHalf = !Number.isInteger(this.nzValue);
    this.hoverValue = Math.ceil(this.nzValue);
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
    const oldVal = this.nzValue;

    if (e.keyCode === RIGHT_ARROW && this.nzValue < this.nzCount) {
      this.nzValue += this.nzAllowHalf ? 0.5 : 1;
    } else if (e.keyCode === LEFT_ARROW && this.nzValue > 0) {
      this.nzValue -= this.nzAllowHalf ? 0.5 : 1;
    }

    if (oldVal !== this.nzValue) {
      this.onChange(this.nzValue);
      this.nzOnKeyDown.emit(e);
      this.cdr.markForCheck();
    }
  }

  setClasses(i: number): object {
    return {
      [`${this.innerPrefixCls}-full`]: i + 1 < this.hoverValue || (!this.hasHalf && i + 1 === this.hoverValue),
      [`${this.innerPrefixCls}-half`]: this.hasHalf && i + 1 === this.hoverValue,
      [`${this.innerPrefixCls}-active`]: this.hasHalf && i + 1 === this.hoverValue,
      [`${this.innerPrefixCls}-zero`]: i + 1 > this.hoverValue,
      [`${this.innerPrefixCls}-focused`]: this.hasHalf && i + 1 === this.hoverValue && this.isFocused
    };
  }

  private updateStarArray(): void {
    this.starArray = Array(this.nzCount)
      .fill(0)
      .map((_, i) => i);
  }

  // #region Implement `ControlValueAccessor`

  writeValue(value: number | null): void {
    this.nzValue = value || 0;
    this.cdr.markForCheck();
  }

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = isDisabled;
  }

  registerOnChange(fn: (_: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onChange: (value: number) => void = () => null;
  onTouched: () => void = () => null;

  // #endregion
}
