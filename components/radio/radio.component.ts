/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { FocusMonitor } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { BooleanInput, NzSafeAny, OnChangeType, OnTouchedType } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzRadioButtonDirective } from './radio-button.directive';
import { NzRadioService } from './radio.service';

@Component({
  selector: '[nz-radio],[nz-radio-button]',
  exportAs: 'nzRadio',
  preserveWhitespaces: false,
  template: `
    <span
      [class.ant-radio]="!isRadioButton"
      [class.ant-radio-checked]="isChecked && !isRadioButton"
      [class.ant-radio-disabled]="nzDisabled && !isRadioButton"
      [class.ant-radio-button]="isRadioButton"
      [class.ant-radio-button-checked]="isChecked && isRadioButton"
      [class.ant-radio-button-disabled]="nzDisabled && isRadioButton"
    >
      <input
        #inputElement
        type="radio"
        [attr.autofocus]="nzAutoFocus ? 'autofocus' : null"
        [class.ant-radio-input]="!isRadioButton"
        [class.ant-radio-button-input]="isRadioButton"
        [disabled]="nzDisabled"
        [checked]="isChecked"
        [attr.name]="name"
      />
      <span [class.ant-radio-inner]="!isRadioButton" [class.ant-radio-button-inner]="isRadioButton"></span>
    </span>
    <span><ng-content></ng-content></span>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzRadioComponent),
      multi: true
    }
  ],
  host: {
    '[class.ant-radio-wrapper]': '!isRadioButton',
    '[class.ant-radio-button-wrapper]': 'isRadioButton',
    '[class.ant-radio-wrapper-checked]': 'isChecked && !isRadioButton',
    '[class.ant-radio-button-wrapper-checked]': 'isChecked && isRadioButton',
    '[class.ant-radio-wrapper-disabled]': 'nzDisabled && !isRadioButton',
    '[class.ant-radio-button-wrapper-disabled]': 'nzDisabled && isRadioButton',
    '(click)': 'onHostClick($event)'
  }
})
export class NzRadioComponent implements ControlValueAccessor, AfterViewInit, OnDestroy, OnInit {
  static ngAcceptInputType_nzDisabled: BooleanInput;
  static ngAcceptInputType_nzAutoFocus: BooleanInput;

  private isNgModel = false;
  private destroy$ = new Subject<void>();
  isChecked = false;
  name: string | null = null;
  isRadioButton = !!this.nzRadioButtonDirective;
  onChange: OnChangeType = () => {};
  onTouched: OnTouchedType = () => {};
  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;
  @Input() nzValue: NzSafeAny | null = null;
  @Input() @InputBoolean() nzDisabled = false;
  @Input() @InputBoolean() nzAutoFocus = false;

  onHostClick(event: MouseEvent): void {
    /** prevent label click triggered twice. **/
    event.stopPropagation();
    event.preventDefault();
    if (!this.nzDisabled && !this.isChecked) {
      if (this.nzRadioService) {
        this.nzRadioService.select(this.nzValue);
      }
      if (this.isNgModel) {
        this.isChecked = true;
        this.onChange(true);
      }
    }
  }

  focus(): void {
    this.focusMonitor.focusVia(this.inputElement!, 'keyboard');
  }

  blur(): void {
    this.inputElement!.nativeElement.blur();
  }

  constructor(
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private focusMonitor: FocusMonitor,
    @Optional() private nzRadioService: NzRadioService,
    @Optional() private nzRadioButtonDirective: NzRadioButtonDirective
  ) {}

  setDisabledState(disabled: boolean): void {
    this.nzDisabled = disabled;
    this.cdr.markForCheck();
  }

  writeValue(value: boolean): void {
    this.isChecked = value;
    this.cdr.markForCheck();
  }

  registerOnChange(fn: OnChangeType): void {
    this.isNgModel = true;
    this.onChange = fn;
  }

  registerOnTouched(fn: OnTouchedType): void {
    this.onTouched = fn;
  }

  ngOnInit(): void {
    if (this.nzRadioService) {
      this.nzRadioService.name$.pipe(takeUntil(this.destroy$)).subscribe(name => {
        this.name = name;
        this.cdr.markForCheck();
      });
      this.nzRadioService.disabled$.pipe(takeUntil(this.destroy$)).subscribe(disabled => {
        this.nzDisabled = disabled;
        this.cdr.markForCheck();
      });
      this.nzRadioService.selected$.pipe(takeUntil(this.destroy$)).subscribe(value => {
        this.isChecked = this.nzValue === value;
        this.cdr.markForCheck();
      });
    }
    this.focusMonitor.monitor(this.elementRef, true).subscribe(focusOrigin => {
      if (!focusOrigin) {
        Promise.resolve().then(() => this.onTouched());
        if (this.nzRadioService) {
          this.nzRadioService.touch();
        }
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.nzAutoFocus) {
      this.focus();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.focusMonitor.stopMonitoring(this.elementRef);
  }
}
