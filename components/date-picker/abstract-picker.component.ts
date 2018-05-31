import {
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

import { InputBoolean } from '../core/util/convert';
import { NzDatePickerI18nInterface } from '../i18n/nz-i18n.interface';
import { NzI18nService } from '../i18n/nz-i18n.service';
import { CandyDate } from './lib/candy-date';
import { NzPickerComponent } from './picker.component';

const POPUP_STYLE_PATCH = { 'position': 'relative' }; // Aim to override antd's style to support overlay's position strategy (position:absolute will cause it not working beacuse the overlay can't get the height/width of it's content)

/**
 * The base picker for all common APIs
 */
export abstract class AbstractPickerComponent implements OnInit, OnChanges, ControlValueAccessor {
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
  @Output() nzOnOpenChange = new EventEmitter<boolean>();

  @Input() nzFormat: string;

  @Input() nzValue: CompatibleValue;

  @ViewChild(NzPickerComponent) protected picker: NzPickerComponent;

  isRange: boolean = false; // Indicate whether the value is a range value

  get realOpenState(): boolean {
    return this.picker.animationOpenState;
  } // Use picker's real open state to let re-render the picker's content when shown up

  initValue(): void {
    this.nzValue = this.isRange ? [] : null;
  }

  constructor(protected i18n: NzI18nService) {
  }

  ngOnInit(): void {
    // Default locale (NOTE: Place here to assign default value due to the i18n'locale may change before ngOnInit)
    if (!this.nzLocale) {
      this.nzLocale = this.i18n.getLocaleData('DatePicker', {});
    }

    // Default value
    this.initValue();

    // Default placeholder
    if (!this.nzPlaceHolder) {
      this.nzPlaceHolder = this.isRange ? this.nzLocale.lang.rangePlaceholder : this.nzLocale.lang.placeholder;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzPopupStyle) { // Always assign the popup style patch
      this.nzPopupStyle = this.nzPopupStyle ? { ...this.nzPopupStyle, ...POPUP_STYLE_PATCH } : POPUP_STYLE_PATCH;
    }
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
      if ((this.nzValue as CandyDate[]).length) {
        this.onChangeFn([ this.nzValue[ 0 ].nativeDate, this.nzValue[ 1 ].nativeDate ]);
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
  onChangeFn: (val: CompatibleDate) => void = () => void 0;
  onTouchedFn: () => void = () => void 0;

  writeValue(value: CompatibleDate): void {
    this.setValue(value);
  }

  registerOnChange(fn: any): void { // tslint:disable-line:no-any
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void { // tslint:disable-line:no-any
    this.onTouchedFn = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.nzDisabled = disabled;
  }

  // ------------------------------------------------------------------------
  // | Internal methods
  // ------------------------------------------------------------------------

  private formatDate(date: CandyDate): string {
    return date ? this.i18n.formatDateCompatible(date.nativeDate, this.nzFormat) : '';
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

export type CompatibleValue = CandyDate | CandyDate[];

export type CompatibleDate = Date | Date[];
