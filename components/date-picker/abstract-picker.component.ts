/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectorRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CandyDate, InputBoolean, NzNoAnimationDirective } from 'ng-zorro-antd/core';
import { DateHelperService, NzDatePickerI18nInterface, NzI18nService } from 'ng-zorro-antd/i18n';

import { NzPickerComponent } from './picker.component';
import { CompatibleDate, CompatibleValue } from './standard-types';

const POPUP_STYLE_PATCH = { position: 'relative' }; // Aim to override antd's style to support overlay's position strategy (position:absolute will cause it not working beacuse the overlay can't get the height/width of it's content)

/**
 * The base picker for all common APIs
 */
export abstract class AbstractPickerComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {
  // --- Common API
  @Input() @InputBoolean() nzAllowClear: boolean = true;
  @Input() @InputBoolean() nzAutoFocus: boolean = false;
  @Input() @InputBoolean() nzDisabled: boolean = false;
  @Input() @InputBoolean() nzOpen: boolean;
  @Input() nzClassName: string;
  @Input() nzDisabledDate: (d: Date) => boolean;
  @Input() nzLocale: NzDatePickerI18nInterface;
  @Input() nzPlaceHolder: string | string[];
  @Input() nzPopupStyle: object = POPUP_STYLE_PATCH;
  @Input() nzDropdownClassName: string;
  @Input() nzSize: 'large' | 'small';
  @Input() nzStyle: object;
  @Input() nzFormat: string;
  @Input() nzValue: CompatibleValue | null;

  @Output() readonly nzOnOpenChange = new EventEmitter<boolean>();

  @ViewChild(NzPickerComponent, { static: true }) protected picker: NzPickerComponent;

  isRange: boolean = false; // Indicate whether the value is a range value

  get realOpenState(): boolean {
    return this.picker.animationOpenState;
  } // Use picker's real open state to let re-render the picker's content when shown up

  initValue(): void {
    this.nzValue = this.isRange ? [] : null;
  }

  protected destroyed$: Subject<void> = new Subject();
  protected isCustomPlaceHolder: boolean = false;

  constructor(
    protected i18n: NzI18nService,
    protected cdr: ChangeDetectorRef,
    protected dateHelper: DateHelperService,
    public noAnimation?: NzNoAnimationDirective
  ) {}

  ngOnInit(): void {
    // Subscribe the every locale change if the nzLocale is not handled by user
    if (!this.nzLocale) {
      this.i18n.localeChange.pipe(takeUntil(this.destroyed$)).subscribe(() => this.setLocale());
    }

    // Default value
    this.initValue();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzPopupStyle) {
      // Always assign the popup style patch
      this.nzPopupStyle = this.nzPopupStyle ? { ...this.nzPopupStyle, ...POPUP_STYLE_PATCH } : POPUP_STYLE_PATCH;
    }

    // Mark as customized placeholder by user once nzPlaceHolder assigned at the first time
    if (changes.nzPlaceHolder && changes.nzPlaceHolder.firstChange && typeof this.nzPlaceHolder !== 'undefined') {
      this.isCustomPlaceHolder = true;
    }

    if (changes.nzLocale) {
      // The nzLocale is currently handled by user
      this.setDefaultPlaceHolder();
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  closeOverlay(): void {
    this.picker.hideOverlay();
  }

  /**
   * Common handle for value changes
   * @param value changed value
   */
  onValueChange(value: CompatibleValue): void {
    this.nzValue = value;
    if (this.isRange) {
      const vAsRange = this.nzValue as CandyDate[];
      if (vAsRange.length) {
        this.onChangeFn([vAsRange[0].nativeDate, vAsRange[1].nativeDate]);
      } else {
        this.onChangeFn([]);
      }
    } else {
      if (this.nzValue) {
        this.onChangeFn((this.nzValue as CandyDate).nativeDate);
      } else {
        this.onChangeFn(null);
      }
    }
    this.onTouchedFn();
  }

  /**
   * Triggered when overlayOpen changes (different with realOpenState)
   * @param open The overlayOpen in picker component
   */
  onOpenChange(open: boolean): void {
    this.nzOnOpenChange.emit(open);
  }

  // ------------------------------------------------------------------------
  // | Control value accessor implements
  // ------------------------------------------------------------------------

  // NOTE: onChangeFn/onTouchedFn will not be assigned if user not use as ngModel
  onChangeFn: (val: CompatibleDate | null) => void = () => void 0;
  onTouchedFn: () => void = () => void 0;

  writeValue(value: CompatibleDate): void {
    this.setValue(value);
    this.cdr.markForCheck();
  }

  // tslint:disable-next-line:no-any
  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  // tslint:disable-next-line:no-any
  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.nzDisabled = disabled;
    this.cdr.markForCheck();
  }

  // ------------------------------------------------------------------------
  // | Internal methods
  // ------------------------------------------------------------------------

  // Reload locale from i18n with side effects
  private setLocale(): void {
    this.nzLocale = this.i18n.getLocaleData('DatePicker', {});
    this.setDefaultPlaceHolder();
    this.cdr.markForCheck();
  }

  private setDefaultPlaceHolder(): void {
    if (!this.isCustomPlaceHolder && this.nzLocale) {
      this.nzPlaceHolder = this.isRange ? this.nzLocale.lang.rangePlaceholder : this.nzLocale.lang.placeholder;
    }
  }

  // Safe way of setting value with default
  private setValue(value: CompatibleDate): void {
    if (this.isRange) {
      this.nzValue = value ? (value as Date[]).map(val => new CandyDate(val)) : [];
    } else {
      this.nzValue = value ? new CandyDate(value as Date) : null;
    }
  }
}
