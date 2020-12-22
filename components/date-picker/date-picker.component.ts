/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Host,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { CandyDate, cloneDate, CompatibleValue } from 'ng-zorro-antd/core/time';
import { BooleanInput, FunctionProp, NzSafeAny, OnChangeType, OnTouchedType } from 'ng-zorro-antd/core/types';
import { InputBoolean, toBoolean, valueFunctionProp } from 'ng-zorro-antd/core/util';
import { DateHelperService, NzDatePickerI18nInterface, NzDatePickerLangI18nInterface, NzI18nService } from 'ng-zorro-antd/i18n';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DatePickerService } from './date-picker.service';

import { Direction, Directionality } from '@angular/cdk/bidi';
import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { NzPickerComponent } from './picker.component';
import { CompatibleDate, DisabledTimeFn, NzDateMode, PresetRanges, SupportTimeOptions } from './standard-types';

const POPUP_STYLE_PATCH = { position: 'relative' }; // Aim to override antd's style to support overlay's position strategy (position:absolute will cause it not working beacuse the overlay can't get the height/width of it's content)
const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'datePicker';

export type NzDatePickerSizeType = 'large' | 'default' | 'small';

/**
 * The base picker for all common APIs
 */
@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nz-date-picker,nz-week-picker,nz-month-picker,nz-year-picker,nz-range-picker',
  exportAs: 'nzDatePicker',
  template: `
    <div
      nz-picker
      [isRange]="isRange"
      [open]="nzOpen"
      [dir]="dir"
      [separator]="nzSeparator"
      [disabled]="nzDisabled"
      [inputReadOnly]="nzInputReadOnly"
      [format]="nzFormat"
      [allowClear]="nzAllowClear"
      [autoFocus]="nzAutoFocus"
      [placeholder]="nzPlaceHolder"
      style="display: inherit; align-items: center; width: 100%;"
      [dropdownClassName]="nzDropdownClassName"
      [class.ant-picker-dropdown-rtl]="dir === 'rtl'"
      [popupStyle]="nzPopupStyle"
      [noAnimation]="!!noAnimation?.nzNoAnimation"
      [suffixIcon]="nzSuffixIcon"
      (openChange)="onOpenChange($event)"
      (focusChange)="onFocusChange($event)"
      [id]="nzId"
    >
      <date-range-popup
        [isRange]="isRange"
        [defaultPickerValue]="nzDefaultPickerValue"
        [showWeek]="nzMode === 'week'"
        [panelMode]="panelMode"
        (panelModeChange)="onPanelModeChange($event)"
        (calendarChange)="onCalendarChange($event)"
        [locale]="nzLocale?.lang!"
        [showToday]="nzMode === 'date' && nzShowToday && !isRange && !nzShowTime"
        [showNow]="nzMode === 'date' && nzShowNow && !isRange && !!nzShowTime"
        [showTime]="nzShowTime"
        [dateRender]="nzDateRender"
        [disabledDate]="nzDisabledDate"
        [disabledTime]="nzDisabledTime"
        [extraFooter]="extraFooter"
        [ranges]="nzRanges"
        [dir]="dir"
        (resultOk)="onResultOk()"
      ></date-range-popup>
    </div>
  `,
  host: {
    '[class.ant-picker-range]': `isRange`,
    '[class.ant-picker-large]': `nzSize === 'large'`,
    '[class.ant-picker-small]': `nzSize === 'small'`,
    '[class.ant-picker-disabled]': `nzDisabled`,
    '[class.ant-picker-rtl]': `dir === 'rtl'`,
    '[class.ant-picker-borderless]': `nzBorderless`,
    '(click)': 'picker.onClickInputBox($event)'
  },
  providers: [
    DatePickerService,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => NzDatePickerComponent)
    }
  ]
})
export class NzDatePickerComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;
  static ngAcceptInputType_nzAllowClear: BooleanInput;
  static ngAcceptInputType_nzAutoFocus: BooleanInput;
  static ngAcceptInputType_nzDisabled: BooleanInput;
  static ngAcceptInputType_nzBorderless: BooleanInput;
  static ngAcceptInputType_nzInputReadOnly: BooleanInput;
  static ngAcceptInputType_nzOpen: BooleanInput;
  static ngAcceptInputType_nzShowToday: BooleanInput;
  static ngAcceptInputType_nzShowNow: BooleanInput;
  static ngAcceptInputType_nzMode: NzDateMode | NzDateMode[] | string | string[] | null | undefined;
  static ngAcceptInputType_nzShowTime: BooleanInput | SupportTimeOptions | null | undefined;

  isRange: boolean = false; // Indicate whether the value is a range value
  focused: boolean = false;
  extraFooter?: TemplateRef<NzSafeAny> | string;
  dir: Direction = 'ltr';

  public panelMode: NzDateMode | NzDateMode[] = 'date';
  private destroyed$: Subject<void> = new Subject();
  private isCustomPlaceHolder: boolean = false;
  private isCustomFormat: boolean = false;
  private showTime: SupportTimeOptions | boolean = false;

  // --- Common API
  @Input() @InputBoolean() nzAllowClear: boolean = true;
  @Input() @InputBoolean() nzAutoFocus: boolean = false;
  @Input() @InputBoolean() nzDisabled: boolean = false;
  @Input() @InputBoolean() nzBorderless: boolean = false;
  @Input() @InputBoolean() nzInputReadOnly: boolean = false;
  @Input() @InputBoolean() nzOpen?: boolean;
  @Input() nzDisabledDate?: (d: Date) => boolean;
  @Input() nzLocale!: NzDatePickerI18nInterface;
  @Input() nzPlaceHolder: string | string[] = '';
  @Input() nzPopupStyle: object = POPUP_STYLE_PATCH;
  @Input() nzDropdownClassName?: string;
  @Input() nzSize: NzDatePickerSizeType = 'default';
  @Input() nzFormat!: string;
  @Input() nzDateRender?: TemplateRef<NzSafeAny> | string | FunctionProp<TemplateRef<Date> | string>;
  @Input() nzDisabledTime?: DisabledTimeFn;
  @Input() nzRenderExtraFooter?: TemplateRef<NzSafeAny> | string | FunctionProp<TemplateRef<NzSafeAny> | string>;
  @Input() @InputBoolean() nzShowToday: boolean = true;
  @Input() nzMode: NzDateMode = 'date';
  @Input() @InputBoolean() nzShowNow: boolean = true;
  @Input() nzRanges?: PresetRanges;
  @Input() nzDefaultPickerValue: CompatibleDate | null = null;
  @Input() @WithConfig() nzSeparator?: string = undefined;
  @Input() @WithConfig() nzSuffixIcon: string | TemplateRef<NzSafeAny> = 'calendar';
  @Input() nzId: string | null = null;

  // TODO(@wenqi73) The PanelMode need named for each pickers and export
  @Output() readonly nzOnPanelChange = new EventEmitter<NzDateMode | NzDateMode[] | string | string[]>();
  @Output() readonly nzOnCalendarChange = new EventEmitter<Array<Date | null>>();
  @Output() readonly nzOnOk = new EventEmitter<CompatibleDate | null>();
  @Output() readonly nzOnOpenChange = new EventEmitter<boolean>();

  @ViewChild(NzPickerComponent, { static: true }) picker!: NzPickerComponent;

  @Input() get nzShowTime(): SupportTimeOptions | boolean {
    return this.showTime;
  }

  set nzShowTime(value: SupportTimeOptions | boolean) {
    this.showTime = typeof value === 'object' ? value : toBoolean(value);
  }

  constructor(
    public nzConfigService: NzConfigService,
    public datePickerService: DatePickerService,
    protected i18n: NzI18nService,
    protected cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    protected dateHelper: DateHelperService,
    @Optional() private directionality: Directionality,
    @Host() @Optional() public noAnimation?: NzNoAnimationDirective
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('ant-picker');
  }

  ngOnInit(): void {
    // Subscribe the every locale change if the nzLocale is not handled by user
    if (!this.nzLocale) {
      this.i18n.localeChange.pipe(takeUntil(this.destroyed$)).subscribe(() => this.setLocale());
    }

    // Default value
    this.datePickerService.isRange = this.isRange;
    this.datePickerService.initValue();
    this.datePickerService.emitValue$.pipe(takeUntil(this.destroyed$)).subscribe(_ => {
      const value = this.datePickerService.value;
      this.datePickerService.initialValue = cloneDate(value);
      if (this.isRange) {
        const vAsRange = value as CandyDate[];
        if (vAsRange.length) {
          this.onChangeFn([vAsRange[0]?.nativeDate ?? null, vAsRange[1]?.nativeDate ?? null]);
        } else {
          this.onChangeFn([]);
        }
      } else {
        if (value) {
          this.onChangeFn((value as CandyDate).nativeDate);
        } else {
          this.onChangeFn(null);
        }
      }
      this.onTouchedFn();
      // When value emitted, overlay will be closed
      this.close();
    });

    this.setModeAndFormat();

    this.directionality.change?.pipe(takeUntil(this.destroyed$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });
    this.dir = this.directionality.value;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzPopupStyle) {
      // Always assign the popup style patch
      this.nzPopupStyle = this.nzPopupStyle ? { ...this.nzPopupStyle, ...POPUP_STYLE_PATCH } : POPUP_STYLE_PATCH;
    }

    // Mark as customized placeholder by user once nzPlaceHolder assigned at the first time
    if (changes.nzPlaceHolder?.currentValue) {
      this.isCustomPlaceHolder = true;
    }

    if (changes.nzFormat?.currentValue) {
      this.isCustomFormat = true;
    }

    if (changes.nzLocale) {
      // The nzLocale is currently handled by user
      this.setDefaultPlaceHolder();
    }

    if (changes.nzRenderExtraFooter) {
      this.extraFooter = valueFunctionProp(this.nzRenderExtraFooter!);
    }

    if (changes.nzMode) {
      this.setDefaultPlaceHolder();
      this.setModeAndFormat();
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  setModeAndFormat(): void {
    const inputFormats: { [key in NzDateMode]?: string } = {
      year: 'yyyy',
      month: 'yyyy-MM',
      week: this.i18n.getDateLocale() ? 'RRRR-II' : 'yyyy-ww', // Format for week
      date: this.nzShowTime ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd'
    };

    if (!this.nzMode) {
      this.nzMode = 'date';
    }

    this.panelMode = this.isRange ? [this.nzMode, this.nzMode] : this.nzMode;

    // Default format when it's empty
    if (!this.isCustomFormat) {
      this.nzFormat = inputFormats[this.nzMode as NzDateMode]!;
    }
  }

  /**
   * Triggered when overlayOpen changes (different with realOpenState)
   * @param open The overlayOpen in picker component
   */
  onOpenChange(open: boolean): void {
    this.nzOnOpenChange.emit(open);
  }

  public open(): void {
    this.picker.showOverlay();
  }

  public close(): void {
    this.picker.hideOverlay();
  }

  // ------------------------------------------------------------------------
  // | Control value accessor implements
  // ------------------------------------------------------------------------

  // NOTE: onChangeFn/onTouchedFn will not be assigned if user not use as ngModel
  onChangeFn: OnChangeType = () => void 0;
  onTouchedFn: OnTouchedType = () => void 0;

  writeValue(value: CompatibleDate): void {
    this.setValue(value);
    this.cdr.markForCheck();
  }

  registerOnChange(fn: OnChangeType): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: OnTouchedType): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = isDisabled;
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
      const defaultPlaceholder: { [key in NzDateMode]?: string } = {
        year: this.getPropertyOfLocale('yearPlaceholder'),
        month: this.getPropertyOfLocale('monthPlaceholder'),
        week: this.getPropertyOfLocale('weekPlaceholder'),
        date: this.getPropertyOfLocale('placeholder')
      };

      const defaultRangePlaceholder: { [key in NzDateMode]?: string[] } = {
        year: this.getPropertyOfLocale('rangeYearPlaceholder'),
        month: this.getPropertyOfLocale('rangeMonthPlaceholder'),
        week: this.getPropertyOfLocale('rangeWeekPlaceholder'),
        date: this.getPropertyOfLocale('rangePlaceholder')
      };

      this.nzPlaceHolder = this.isRange
        ? defaultRangePlaceholder[this.nzMode as NzDateMode]!
        : defaultPlaceholder[this.nzMode as NzDateMode]!;
    }
  }

  private getPropertyOfLocale<T extends keyof NzDatePickerLangI18nInterface>(type: T): NzDatePickerLangI18nInterface[T] {
    return this.nzLocale.lang[type] || this.i18n.getLocaleData(`DatePicker.lang.${type}`);
  }

  // Safe way of setting value with default
  private setValue(value: CompatibleDate): void {
    const newValue: CompatibleValue = this.datePickerService.makeValue(value);
    this.datePickerService.setValue(newValue);
    this.datePickerService.initialValue = newValue;
  }

  onFocusChange(value: boolean): void {
    this.focused = value;
    // TODO: avoid autoFocus cause change after checked error
    if (this.focused) {
      this.renderer.addClass(this.elementRef.nativeElement, 'ant-picker-focused');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'ant-picker-focused');
    }
  }

  onPanelModeChange(panelMode: NzDateMode | NzDateMode[]): void {
    this.nzOnPanelChange.emit(panelMode);
  }

  // Emit nzOnCalendarChange when select date by nz-range-picker
  onCalendarChange(value: CompatibleValue): void {
    if (this.isRange && Array.isArray(value)) {
      const rangeValue = value.filter(x => x instanceof CandyDate).map(x => x!.nativeDate);
      this.nzOnCalendarChange.emit(rangeValue);
    }
  }

  onResultOk(): void {
    if (this.isRange) {
      const value = this.datePickerService.value as CandyDate[];
      if (value.length) {
        this.nzOnOk.emit([value[0]?.nativeDate || null, value[1]?.nativeDate || null]);
      } else {
        this.nzOnOk.emit([]);
      }
    } else {
      if (this.datePickerService.value) {
        this.nzOnOk.emit((this.datePickerService.value as CandyDate).nativeDate);
      } else {
        this.nzOnOk.emit(null);
      }
    }
  }
}
