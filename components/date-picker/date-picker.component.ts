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
import { warnDeprecation } from 'ng-zorro-antd/core/logger';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { CandyDate, cloneDate, CompatibleValue } from 'ng-zorro-antd/core/time';
import { BooleanInput, FunctionProp, NzSafeAny, OnChangeType, OnTouchedType } from 'ng-zorro-antd/core/types';
import { InputBoolean, toBoolean, valueFunctionProp } from 'ng-zorro-antd/core/util';
import { DateHelperService, NzDatePickerI18nInterface, NzI18nService } from 'ng-zorro-antd/i18n';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DatePickerService } from './date-picker.service';

import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { NzPickerComponent } from './picker.component';
import { CompatibleDate, DisabledTimeFn, NzDateMode, PresetRanges, SupportTimeOptions } from './standard-types';

const POPUP_STYLE_PATCH = { position: 'relative' }; // Aim to override antd's style to support overlay's position strategy (position:absolute will cause it not working beacuse the overlay can't get the height/width of it's content)
const NZ_CONFIG_COMPONENT_NAME = 'datePicker';

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
      [separator]="nzSeparator"
      [disabled]="nzDisabled"
      [format]="nzFormat"
      [allowClear]="nzAllowClear"
      [autoFocus]="nzAutoFocus"
      [placeholder]="nzPlaceHolder"
      [ngClass]="nzClassName"
      style="display: inherit; align-items: center; width: 100%;"
      [ngStyle]="nzStyle"
      [dropdownClassName]="nzDropdownClassName"
      [popupStyle]="nzPopupStyle"
      [noAnimation]="!!noAnimation?.nzNoAnimation"
      [suffixIcon]="nzSuffixIcon"
      (openChange)="onOpenChange($event)"
      (focusChange)="onFocusChange($event)"
    >
      <date-range-popup
        *ngIf="realOpenState"
        [isRange]="isRange"
        [defaultPickerValue]="nzDefaultPickerValue"
        [showWeek]="showWeek"
        [panelMode]="nzMode"
        (panelModeChange)="onPanelModeChange($event)"
        (calendarChange)="onCalendarChange($event)"
        [locale]="nzLocale?.lang!"
        [showToday]="realShowToday"
        [showTime]="nzShowTime"
        [format]="nzFormat"
        [dateRender]="nzDateRender"
        [disabledDate]="nzDisabledDate"
        [disabledTime]="nzDisabledTime"
        [placeholder]="nzPlaceHolder"
        [extraFooter]="extraFooter"
        [ranges]="nzRanges"
        (resultOk)="onResultOk()"
      ></date-range-popup>
    </div>
  `,
  host: {
    '[class.ant-picker]': `true`,
    '[class.ant-picker-range]': `isRange`,
    '[class.ant-picker-large]': `nzSize === 'large'`,
    '[class.ant-picker-small]': `nzSize === 'small'`,
    '[class.ant-picker-disabled]': `nzDisabled`,
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
  static ngAcceptInputType_nzAllowClear: BooleanInput;
  static ngAcceptInputType_nzAutoFocus: BooleanInput;
  static ngAcceptInputType_nzDisabled: BooleanInput;
  static ngAcceptInputType_nzOpen: BooleanInput;
  static ngAcceptInputType_nzShowToday: BooleanInput;
  static ngAcceptInputType_nzMode: NzDateMode | NzDateMode[] | string | string[] | null | undefined;
  static ngAcceptInputType_nzShowTime: BooleanInput | SupportTimeOptions | null | undefined;

  isRange: boolean = false; // Indicate whether the value is a range value
  showWeek: boolean = false; // Should show as week picker
  focused: boolean = false;
  extraFooter?: TemplateRef<NzSafeAny> | string;

  protected destroyed$: Subject<void> = new Subject();
  protected isCustomPlaceHolder: boolean = false;
  private showTime: SupportTimeOptions | boolean = false;

  // --- Common API
  @Input() @InputBoolean() nzAllowClear: boolean = true;
  @Input() @InputBoolean() nzAutoFocus: boolean = false;
  @Input() @InputBoolean() nzDisabled: boolean = false;
  @Input() @InputBoolean() nzOpen?: boolean;
  /**
   * @deprecated 10.0.0. This is deprecated and going to be removed in 10.0.0.
   */
  @Input() nzClassName: string = '';
  @Input() nzDisabledDate?: (d: Date) => boolean;
  @Input() nzLocale!: NzDatePickerI18nInterface;
  @Input() nzPlaceHolder: string | [string, string] = '';
  @Input() nzPopupStyle: object = POPUP_STYLE_PATCH;
  @Input() nzDropdownClassName?: string;
  @Input() nzSize: 'large' | 'small' | 'default' = 'default';
  /**
   * @deprecated 10.0.0. This is deprecated and going to be removed in 10.0.0.
   */
  @Input() nzStyle: object | null = null;
  @Input() nzFormat!: string;
  @Input() nzDateRender?: TemplateRef<NzSafeAny> | string | FunctionProp<TemplateRef<Date> | string>;
  @Input() nzDisabledTime?: DisabledTimeFn;
  @Input() nzRenderExtraFooter?: TemplateRef<NzSafeAny> | string | FunctionProp<TemplateRef<NzSafeAny> | string>;
  @Input() @InputBoolean() nzShowToday: boolean = true;
  @Input() nzMode: NzDateMode | NzDateMode[] = 'date';
  @Input() nzRanges?: PresetRanges;
  @Input() nzDefaultPickerValue: CompatibleDate | null = null;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME) nzSeparator?: string = undefined;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME) nzSuffixIcon: string | TemplateRef<NzSafeAny> = 'calendar';

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

  get realOpenState(): boolean {
    return this.picker.animationOpenState;
  } // Use picker's real open state to let re-render the picker's content when shown up

  constructor(
    public nzConfigService: NzConfigService,
    public datePickerService: DatePickerService,
    protected i18n: NzI18nService,
    protected cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    protected dateHelper: DateHelperService,
    @Host() @Optional() public noAnimation?: NzNoAnimationDirective
  ) {}

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
          this.onChangeFn([vAsRange[0].nativeDate, vAsRange[1].nativeDate]);
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
      this.picker.hideOverlay();
    });

    // Default format when it's empty
    if (!this.nzFormat) {
      if (this.showWeek) {
        this.nzFormat = 'yyyy-ww'; // Format for week
      } else {
        this.nzFormat = this.nzShowTime ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd';
      }
    }
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

    if (changes.nzRenderExtraFooter) {
      this.extraFooter = valueFunctionProp(this.nzRenderExtraFooter!);
    }

    if (changes.nzStyle) {
      warnDeprecation(
        `'nzStyle' in DatePicker is going to be removed in 10.0.0. Please use CSS style attribute like <nz-date-picker style="..."></nz-date-picker> instead.`
      );
    }

    if (changes.nzClassName) {
      warnDeprecation(
        `'nzClassName' in DatePicker is going to be removed in 10.0.0. Please use CSS class attribute like <nz-date-picker class="..."></nz-date-picker> instead.`
      );
    }

    if (changes.nzMode) {
      this.setPanelMode();
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  setPanelMode(): void {
    if (!this.nzMode) {
      this.nzMode = this.isRange ? ['date', 'date'] : 'date';
    }
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
      this.nzPlaceHolder = this.isRange ? (this.nzLocale.lang.rangePlaceholder as [string, string]) : this.nzLocale.lang.placeholder!;
    }
  }

  // Safe way of setting value with default
  private setValue(value: CompatibleDate): void {
    const newValue: CompatibleValue = this.datePickerService.makeValue(value);
    this.datePickerService.setValue(newValue);
    this.datePickerService.initialValue = newValue;
  }

  get realShowToday(): boolean {
    // Range only support in single date picker
    return this.nzMode === 'date' && this.nzShowToday;
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
    // this.nzMode = panelMode;
    this.nzOnPanelChange.emit(panelMode);
  }

  // Emit nzOnCalendarChange when select date by nz-range-picker
  onCalendarChange(value: CompatibleValue): void {
    if (this.isRange && Array.isArray(value)) {
      const rangeValue = value.filter(x => x instanceof CandyDate).map(x => x!.nativeDate);
      this.nzOnCalendarChange.emit(rangeValue);
    }
  }

  // Emitted when done with date selecting
  onResultOk(): void {
    if (this.isRange) {
      const value = this.datePickerService.value as CandyDate[];
      if (value.length) {
        this.nzOnOk.emit([value[0].nativeDate, value[1].nativeDate]);
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
    this.datePickerService.emitValue$.next();
  }
}
