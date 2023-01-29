/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { FocusMonitor } from '@angular/cdk/a11y';
import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Optional,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzFormStatusService } from 'ng-zorro-antd/core/form';
import { BooleanInput, NzSafeAny, OnChangeType, OnTouchedType } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';

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
    '[class.ant-radio-wrapper-in-form-item]': '!!nzFormStatusService',
    '[class.ant-radio-wrapper]': '!isRadioButton',
    '[class.ant-radio-button-wrapper]': 'isRadioButton',
    '[class.ant-radio-wrapper-checked]': 'isChecked && !isRadioButton',
    '[class.ant-radio-button-wrapper-checked]': 'isChecked && isRadioButton',
    '[class.ant-radio-wrapper-disabled]': 'nzDisabled && !isRadioButton',
    '[class.ant-radio-button-wrapper-disabled]': 'nzDisabled && isRadioButton',
    '[class.ant-radio-wrapper-rtl]': `!isRadioButton && dir === 'rtl'`,
    '[class.ant-radio-button-wrapper-rtl]': `isRadioButton && dir === 'rtl'`
  }
})
export class NzRadioComponent implements ControlValueAccessor, AfterViewInit, OnDestroy, OnInit {
  static ngAcceptInputType_nzDisabled: BooleanInput;
  static ngAcceptInputType_nzAutoFocus: BooleanInput;

  private isNgModel = false;
  private destroy$ = new Subject<void>();
  private isNzDisableFirstChange: boolean = true;
  isChecked = false;
  name: string | null = null;
  isRadioButton = !!this.nzRadioButtonDirective;
  onChange: OnChangeType = () => {};
  onTouched: OnTouchedType = () => {};
  @ViewChild('inputElement', { static: true }) inputElement!: ElementRef<HTMLInputElement>;
  @Input() nzValue: NzSafeAny | null = null;
  @Input() @InputBoolean() nzDisabled = false;
  @Input() @InputBoolean() nzAutoFocus = false;

  dir: Direction = 'ltr';

  focus(): void {
    this.focusMonitor.focusVia(this.inputElement!, 'keyboard');
  }

  blur(): void {
    this.inputElement!.nativeElement.blur();
  }

  constructor(
    private ngZone: NgZone,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private focusMonitor: FocusMonitor,
    @Optional() private directionality: Directionality,
    @Optional() @Inject(NzRadioService) private nzRadioService: NzRadioService | null,
    @Optional() @Inject(NzRadioButtonDirective) private nzRadioButtonDirective: NzRadioButtonDirective | null,
    @Optional() public nzFormStatusService?: NzFormStatusService
  ) {}

  setDisabledState(disabled: boolean): void {
    this.nzDisabled = (this.isNzDisableFirstChange && this.nzDisabled) || disabled;
    this.isNzDisableFirstChange = false;
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
        this.nzDisabled = (this.isNzDisableFirstChange && this.nzDisabled) || disabled;
        this.isNzDisableFirstChange = false;
        this.cdr.markForCheck();
      });
      this.nzRadioService.selected$.pipe(takeUntil(this.destroy$)).subscribe(value => {
        const isChecked = this.isChecked;
        this.isChecked = this.nzValue === value;
        // We don't have to run `onChange()` on each `nz-radio` button whenever the `selected$` emits.
        // If we have 8 `nz-radio` buttons within the `nz-radio-group` and they're all connected with
        // `ngModel` or `formControl` then `onChange()` will be called 8 times for each `nz-radio` button.
        // We prevent this by checking if `isChecked` has been changed or not.
        if (
          this.isNgModel &&
          isChecked !== this.isChecked &&
          // We're only intereted if `isChecked` has been changed to `false` value to emit `false` to the ascendant form,
          // since we already emit `true` within the `setupClickListener`.
          this.isChecked === false
        ) {
          this.onChange(false);
        }
        this.cdr.markForCheck();
      });
    }
    this.focusMonitor
      .monitor(this.elementRef, true)
      .pipe(takeUntil(this.destroy$))
      .subscribe(focusOrigin => {
        if (!focusOrigin) {
          Promise.resolve().then(() => this.onTouched());
          if (this.nzRadioService) {
            this.nzRadioService.touch();
          }
        }
      });

    this.directionality.change.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;

    this.setupClickListener();
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

  private setupClickListener(): void {
    this.ngZone.runOutsideAngular(() => {
      fromEvent<MouseEvent>(this.elementRef.nativeElement, 'click')
        .pipe(takeUntil(this.destroy$))
        .subscribe(event => {
          /** prevent label click triggered twice. **/
          event.stopPropagation();
          event.preventDefault();
          if (this.nzDisabled || this.isChecked) {
            return;
          }
          this.ngZone.run(() => {
            this.nzRadioService?.select(this.nzValue);
            if (this.isNgModel) {
              this.isChecked = true;
              this.onChange(true);
            }
            this.cdr.markForCheck();
          });
        });
    });
  }
}
