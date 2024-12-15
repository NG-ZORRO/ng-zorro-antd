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
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
  booleanAttribute,
  effect,
  forwardRef,
  inject
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzFormStatusService } from 'ng-zorro-antd/core/form';
import { NzSafeAny, OnChangeType, OnTouchedType } from 'ng-zorro-antd/core/types';
import { fromEventOutsideAngular } from 'ng-zorro-antd/core/util';

import { NzCheckboxWrapperComponent } from './checkbox-wrapper.component';
import { NZ_CHECKBOX_GROUP } from './tokens';

@Component({
  selector: '[nz-checkbox]',
  exportAs: 'nzCheckbox',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <span
      class="ant-checkbox"
      [class.ant-checkbox-checked]="nzChecked && !nzIndeterminate"
      [class.ant-checkbox-disabled]="nzDisabled || checkboxGroupComponent?.finalDisabled()"
      [class.ant-checkbox-indeterminate]="nzIndeterminate"
    >
      <input
        #inputElement
        type="checkbox"
        class="ant-checkbox-input"
        [attr.autofocus]="nzAutoFocus ? 'autofocus' : null"
        [attr.id]="nzId"
        [attr.name]="nzName || checkboxGroupComponent?.nzName()"
        [checked]="nzChecked"
        [ngModel]="nzChecked"
        [disabled]="nzDisabled || (checkboxGroupComponent?.finalDisabled() ?? false)"
        (ngModelChange)="innerCheckedChange($event)"
      />
      <span class="ant-checkbox-inner"></span>
    </span>
    <span><ng-content></ng-content></span>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzCheckboxComponent),
      multi: true
    }
  ],
  host: {
    class: 'ant-checkbox-wrapper',
    '[class.ant-checkbox-group-item]': '!!checkboxGroupComponent',
    '[class.ant-checkbox-wrapper-in-form-item]': '!!nzFormStatusService',
    '[class.ant-checkbox-wrapper-checked]': 'nzChecked',
    '[class.ant-checkbox-wrapper-disabled]': 'nzDisabled || checkboxGroupComponent?.finalDisabled()',
    '[class.ant-checkbox-rtl]': `dir === 'rtl'`
  },
  imports: [FormsModule]
})
export class NzCheckboxComponent implements OnInit, ControlValueAccessor, OnDestroy, AfterViewInit {
  dir: Direction = 'ltr';
  private destroy$ = new Subject<void>();
  private isNzDisableFirstChange: boolean = true;

  onChange: OnChangeType = () => {};
  onTouched: OnTouchedType = () => {};
  @ViewChild('inputElement', { static: true }) inputElement!: ElementRef<HTMLInputElement>;
  @Output() readonly nzCheckedChange = new EventEmitter<boolean>();
  @Input() nzValue: NzSafeAny | null = null;
  @Input({ transform: booleanAttribute }) nzAutoFocus = false;
  @Input({ transform: booleanAttribute }) nzDisabled = false;
  @Input({ transform: booleanAttribute }) nzIndeterminate = false;
  @Input({ transform: booleanAttribute }) nzChecked = false;
  @Input() nzId: string | null = null;
  @Input() nzName: string | null = null;

  innerCheckedChange(checked: boolean): void {
    if (!this.nzDisabled && !this.checkboxGroupComponent?.finalDisabled()) {
      this.setValue(checked);
      this.nzCheckboxWrapperComponent?.onChange();
      this.checkboxGroupComponent?.onCheckedChange(this.nzValue, checked);
    }
  }

  writeValue(value: boolean): void {
    this.nzChecked = value;
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

  focus(): void {
    this.focusMonitor.focusVia(this.inputElement, 'keyboard');
  }

  blur(): void {
    this.inputElement.nativeElement.blur();
  }

  /** @deprecated */
  private nzCheckboxWrapperComponent = inject(NzCheckboxWrapperComponent, { optional: true });
  protected checkboxGroupComponent = inject(NZ_CHECKBOX_GROUP, { optional: true });
  protected nzFormStatusService = inject(NzFormStatusService, { optional: true });

  constructor(
    private ngZone: NgZone,
    private elementRef: ElementRef<HTMLElement>,
    private cdr: ChangeDetectorRef,
    private focusMonitor: FocusMonitor,
    private directionality: Directionality
  ) {
    if (this.checkboxGroupComponent) {
      effect(() => {
        const values = this.checkboxGroupComponent!.value() || [];
        this.setValue(values.includes(this.nzValue));
        this.cdr.markForCheck();
      });
    }
  }

  ngOnInit(): void {
    this.focusMonitor
      .monitor(this.elementRef, true)
      .pipe(takeUntil(this.destroy$))
      .subscribe(focusOrigin => {
        if (!focusOrigin) {
          Promise.resolve().then(() => this.onTouched());
        }
      });

    this.nzCheckboxWrapperComponent?.addCheckbox(this);

    this.directionality.change.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;

    fromEventOutsideAngular(this.elementRef.nativeElement, 'click')
      .pipe(takeUntil(this.destroy$))
      .subscribe(event => {
        event.preventDefault();
        this.focus();
        if (this.nzDisabled) {
          return;
        }
        this.ngZone.run(() => {
          this.innerCheckedChange(!this.nzChecked);
          this.cdr.markForCheck();
        });
      });

    fromEventOutsideAngular(this.inputElement.nativeElement, 'click')
      .pipe(takeUntil(this.destroy$))
      .subscribe(event => event.stopPropagation());
  }

  ngAfterViewInit(): void {
    if (this.nzAutoFocus) {
      this.focus();
    }
  }

  ngOnDestroy(): void {
    this.focusMonitor.stopMonitoring(this.elementRef);
    this.nzCheckboxWrapperComponent?.removeCheckbox(this);

    this.destroy$.next();
    this.destroy$.complete();
  }

  private setValue(value: boolean): void {
    this.nzChecked = value;
    this.onChange(value);
    this.nzCheckedChange.emit(value);
  }
}
