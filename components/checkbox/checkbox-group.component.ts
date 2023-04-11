/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { FocusMonitor } from '@angular/cdk/a11y';
import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BooleanInput, OnChangeType, OnTouchedType } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';

export interface NzCheckBoxOptionInterface {
  label: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
}

@Component({
  selector: 'nz-checkbox-group',
  exportAs: 'nzCheckboxGroup',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  template: `
    <label
      nz-checkbox
      class="ant-checkbox-group-item"
      *ngFor="let o of options; trackBy: trackByOption"
      [nzDisabled]="o.disabled || nzDisabled"
      [nzChecked]="o.checked!"
      (nzCheckedChange)="onCheckedChange(o, $event)"
    >
      <span>{{ o.label }}</span>
    </label>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzCheckboxGroupComponent),
      multi: true
    }
  ],
  host: {
    class: 'ant-checkbox-group',
    '[class.ant-checkbox-group-rtl]': `dir === 'rtl'`
  }
})
export class NzCheckboxGroupComponent implements ControlValueAccessor, OnInit, OnDestroy {
  static ngAcceptInputType_nzDisabled: BooleanInput;

  onChange: OnChangeType = () => {};
  onTouched: OnTouchedType = () => {};
  options: NzCheckBoxOptionInterface[] = [];
  @Input() @InputBoolean() nzDisabled = false;

  dir: Direction = 'ltr';

  private destroy$ = new Subject<void>();
  private isNzDisableFirstChange: boolean = true;

  trackByOption(_: number, option: NzCheckBoxOptionInterface): string {
    return option.value;
  }

  onCheckedChange(option: NzCheckBoxOptionInterface, checked: boolean): void {
    option.checked = checked;
    this.onChange(this.options);
  }

  constructor(
    private elementRef: ElementRef,
    private focusMonitor: FocusMonitor,
    private cdr: ChangeDetectorRef,
    @Optional() private directionality: Directionality
  ) {}

  ngOnInit(): void {
    this.focusMonitor
      .monitor(this.elementRef, true)
      .pipe(takeUntil(this.destroy$))
      .subscribe(focusOrigin => {
        if (!focusOrigin) {
          Promise.resolve().then(() => this.onTouched());
        }
      });

    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;
  }

  ngOnDestroy(): void {
    this.focusMonitor.stopMonitoring(this.elementRef);
    this.destroy$.next();
    this.destroy$.complete();
  }

  writeValue(value: NzCheckBoxOptionInterface[]): void {
    this.options = value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: OnChangeType): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: OnTouchedType): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.nzDisabled = (this.isNzDisableFirstChange && this.nzDisabled) || disabled;
    this.isNzDisableFirstChange = false;
    this.cdr.markForCheck();
  }
}
