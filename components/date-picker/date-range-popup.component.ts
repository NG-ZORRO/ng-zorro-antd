/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { CandyDate, cloneDate, CompatibleValue, FunctionProp, normalizeRangeValue, SingleValue, sortRangeValue } from 'ng-zorro-antd/core';
import { NzCalendarI18nInterface } from 'ng-zorro-antd/i18n';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DatePickerService } from './date-picker.service';
import {
  CompatibleDate,
  DisabledDateFn,
  DisabledTimeConfig,
  DisabledTimeFn,
  DisabledTimePartial,
  PanelMode,
  PresetRanges,
  RangePartType,
  SupportTimeOptions
} from './standard-types';
import { getTimeConfig, isAllowedDate, PREFIX_CLASS } from './util';

@Component({
  encapsulation: ViewEncapsulation.None,
  // TODO: comment it to pass test
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:component-selector
  selector: 'date-range-popup',
  exportAs: 'dateRangePopup',
  template: `
    <div
      class="{{ prefixCls }}-dropdown {{ dropdownClassName }} {{ prefixCls }}-dropdown-placement-bottomLeft"
      [class.ant-picker-dropdown-range]="isRange"
      [ngStyle]="popupStyle"
    >
      <ng-container *ngIf="isRange; else singlePanel">
        <div class="{{ prefixCls }}-range-wrapper {{ prefixCls }}-date-range-wrapper">
          <div class="{{ prefixCls }}-range-arrow" [style]="datePickerService?.arrowPositionStyle"></div>
          <div class="{{ prefixCls }}-panel-container">
            <div class="{{ prefixCls }}-panels">
              <ng-container *ngTemplateOutlet="tplRangePart; context: { partType: 'left' }"></ng-container>
              <ng-container *ngTemplateOutlet="tplRangePart; context: { partType: 'right' }"></ng-container>
            </div>
            <ng-container *ngTemplateOutlet="tplFooter"></ng-container>
          </div>
        </div>
      </ng-container>
      <ng-template #singlePanel>
        <div
          class="{{ prefixCls }}-panel-container {{ showWeek ? prefixCls + '-week-number' : '' }} {{
            hasTimePicker ? prefixCls + '-time' : ''
          }} {{ isRange ? prefixCls + '-range' : '' }}"
        >
          <div class="{{ prefixCls }}-panel" tabindex="-1">
            <!-- Single ONLY -->
            <ng-container *ngTemplateOutlet="tplInnerPopup"></ng-container>
            <ng-container *ngTemplateOutlet="tplFooter"></ng-container>
          </div>
        </div>
      </ng-template>
    </div>

    <ng-template #tplInnerPopup let-partType="partType">
      <inner-popup
        *ngIf="show(partType)"
        [showWeek]="showWeek"
        [endPanelMode]="getPanelMode(endPanelMode, partType)"
        [locale]="locale"
        [showTimePicker]="hasTimePicker"
        [timeOptions]="getTimeOptions(partType)"
        [panelMode]="getPanelMode(panelMode, partType)"
        (panelModeChange)="onPanelModeChange($event, partType)"
        [activeDate]="getActiveDate(partType)"
        [value]="getValue(partType)"
        [disabledDate]="disabledDate"
        [dateRender]="dateRender"
        [selectedValue]="selectedValue"
        [hoverValue]="hoverValue"
        [enablePrev]="enablePrevNext('prev', partType)"
        [enableNext]="enablePrevNext('next', partType)"
        (dayHover)="onDayHover($event)"
        (selectDate)="changeValueFromSelect($event)"
        (selectTime)="onSelectTime($event, partType)"
        (headerChange)="onActiveDateChange($event, partType)"
      ></inner-popup>
    </ng-template>

    <ng-template #tplFooter>
      <calendar-footer
        *ngIf="hasFooter"
        [locale]="locale"
        [showToday]="showToday"
        [hasTimePicker]="hasTimePicker"
        [timePickerDisabled]="timePickerDisabled()"
        [okDisabled]="okDisabled()"
        [extraFooter]="extraFooter"
        [rangeQuickSelector]="ranges ? tplRangeQuickSelector : null"
        (clickOk)="onClickOk()"
        (clickToday)="onClickToday($event)"
      ></calendar-footer>
    </ng-template>

    <ng-template #tplRangePart let-partType="partType">
      <div class="{{ prefixCls }}-panel">
        <ng-container *ngTemplateOutlet="tplInnerPopup; context: { partType: partType }"></ng-container>
      </div>
    </ng-template>

    <!-- Range ONLY: Range Quick Selector -->
    <ng-template #tplRangeQuickSelector>
      <li
        *ngFor="let name of getObjectKeys(ranges)"
        class="{{ prefixCls }}-preset"
        (click)="onClickPresetRange(ranges[name])"
        (mouseenter)="onHoverPresetRange(ranges[name])"
        (mouseleave)="onPresetRangeMouseLeave()"
      >
        <span class="ant-tag ant-tag-blue">{{ name }}</span>
      </li>
    </ng-template>
  `
})
export class DateRangePopupComponent implements OnInit, OnChanges, OnDestroy {
  @Input() isRange: boolean;
  @Input() showWeek: boolean;
  @Input() locale: NzCalendarI18nInterface;
  @Input() format: string;
  @Input() placeholder: string | string[];
  @Input() disabledDate: DisabledDateFn;
  @Input() disabledTime: DisabledTimeFn; // This will lead to rebuild time options
  @Input() showToday: boolean;
  @Input() showTime: SupportTimeOptions | boolean;
  @Input() extraFooter: TemplateRef<void> | string;
  @Input() ranges: PresetRanges;
  @Input() dateRender: FunctionProp<TemplateRef<Date> | string>;
  @Input() popupStyle: object;
  @Input() dropdownClassName: string;

  @Input() panelMode: PanelMode | PanelMode[];
  @Input() defaultPickerValue: CompatibleDate;

  @Output() readonly panelModeChange = new EventEmitter<PanelMode | PanelMode[]>();
  @Output() readonly calendarChange = new EventEmitter<CompatibleValue>();
  @Output() readonly resultOk = new EventEmitter<void>(); // Emitted when done with date selecting

  prefixCls: string = PREFIX_CLASS;
  endPanelMode: PanelMode | PanelMode[] = 'date';
  timeOptions: SupportTimeOptions | SupportTimeOptions[] | null;
  selectedValue: SingleValue[] = []; // Range ONLY
  hoverValue: SingleValue[] = []; // Range ONLY
  destroy$ = new Subject();

  get hasTimePicker(): boolean {
    return !!this.showTime;
  }

  get hasFooter(): boolean {
    return this.showToday || this.hasTimePicker || !!this.extraFooter || !!this.ranges;
  }

  constructor(public datePickerService: DatePickerService, public cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Set panel active date once open
    const activeDate = this.datePickerService.hasValue()
      ? this.datePickerService.value
      : this.datePickerService.makeValue(this.defaultPickerValue);
    this.datePickerService.setActiveDate(activeDate);
    this.datePickerService.valueChange$.pipe(takeUntil(this.destroy$)).subscribe(value => {
      if (this.isRange) {
        // Re-initialize all related values
        this.clearHoverValue();
        this.selectedValue = cloneDate(value) as SingleValue[];
      }
      this.cdr.markForCheck();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Parse showTime options
    if (changes.showTime || changes.disabledTime) {
      if (this.showTime) {
        this.buildTimeOptions();
      }
    }
    if (changes.panelMode) {
      this.endPanelMode = this.panelMode;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onClickOk(): void {
    if (this.datePickerService.hasOnePart()) {
      const otherPart = this.datePickerService.activeInput === 'left' ? 'right' : 'left';
      this.datePickerService.inputPartChange$.next(otherPart);
    } else {
      this.resultOk.emit();
    }
  }

  onClickToday(value: CandyDate): void {
    this.changeValueFromSelect(value);
  }

  onDayHover(value: CandyDate): void {
    const otherInputIndex = { left: 1, right: 0 }[this.datePickerService.activeInput];
    const base = this.selectedValue[otherInputIndex]!;
    if (this.isRange && base) {
      if (base.isBeforeDay(value)) {
        this.hoverValue = [base, value];
      } else {
        this.hoverValue = [value, base];
      }
    }
  }

  onPanelModeChange(mode: PanelMode, partType?: RangePartType): void {
    if (this.isRange) {
      const index = this.datePickerService.getActiveIndex(partType);
      if (index === 0) {
        this.panelMode = [mode, this.panelMode[1]] as PanelMode[];
      } else {
        this.panelMode = [this.panelMode[0], mode] as PanelMode[];
      }
    } else {
      this.panelMode = mode;
    }
    // this.cdr.markForCheck();
    this.panelModeChange.emit(this.panelMode);
  }

  onActiveDateChange(value: CandyDate, partType: RangePartType): void {
    if (this.isRange) {
      if (partType === 'left') {
        this.datePickerService.activeDate = [value, value.addMonths(1)];
      } else {
        this.datePickerService.activeDate = [value.addMonths(-1), value];
      }
    } else {
      this.datePickerService.activeDate = value;
    }
  }

  onSelectTime(value: CandyDate, partType?: RangePartType): void {
    if (this.isRange) {
      const newValue = cloneDate(this.datePickerService.value) as SingleValue[];
      const index = this.datePickerService.getActiveIndex(partType);
      newValue[index] = this.overrideHms(value, newValue[index]);
      this.selectedValue[index] = newValue[index];
      this.datePickerService.setValue(newValue);
    } else {
      const newValue = this.overrideHms(value, this.datePickerService.value as CandyDate);
      this.datePickerService.setValue(newValue); // If not select a date currently, use today
    }
    this.buildTimeOptions();
  }

  changeValueFromSelect(value: CandyDate): void {
    if (this.isRange) {
      const [left, right] = this.selectedValue as CandyDate[]; // NOTE: the left/right maybe not the sequence it select at the date panels

      if (!left && !right && !this.showTime) {
        let otherPart: RangePartType;
        // If totally full or empty, clean up && re-assign left first
        if (this.datePickerService.activeInput === 'left') {
          otherPart = 'right';
          this.hoverValue = this.selectedValue = [value];
        } else {
          otherPart = 'left';
          this.hoverValue = this.selectedValue = [null, value];
        }
        this.datePickerService.setValue(cloneDate(this.selectedValue));
        this.calendarChange.emit([value.clone()]);
        this.datePickerService.inputPartChange$.next(otherPart!);
      } else {
        this.clearHoverValue(); // Clean up
        this.selectedValue[this.datePickerService.getActiveIndex()] = value;
        this.selectedValue = sortRangeValue(this.selectedValue); // Sort
        this.datePickerService.activeDate = normalizeRangeValue(this.selectedValue);
        this.calendarChange.emit(cloneDate(this.selectedValue));
        this.datePickerService.setValue(cloneDate(this.selectedValue));
        if (!this.showTime) {
          this.datePickerService.emitValue$.next();
        }
      }
    } else {
      this.datePickerService.setValue(value);
      if (!this.showTime) {
        this.datePickerService.emitValue$.next();
      }
    }
  }

  enablePrevNext(direction: 'prev' | 'next', partType?: RangePartType): boolean {
    if (this.isRange) {
      const [start, end] = normalizeRangeValue(this.datePickerService.activeDate as CandyDate[]);
      const showMiddle = !start.addMonths(1).isSame(end, 'month'); // One month diff then don't show middle prev/next
      if ((partType === 'left' && direction === 'next') || (partType === 'right' && direction === 'prev')) {
        return showMiddle;
      }
      return true;
    } else {
      return true;
    }
  }

  getPanelMode(panelMode: PanelMode | PanelMode[], partType?: RangePartType): PanelMode {
    if (this.isRange) {
      return panelMode[this.datePickerService.getActiveIndex(partType)] as PanelMode;
    } else {
      return panelMode as PanelMode;
    }
  }

  // Get single value or part value of a range
  getValue(partType?: RangePartType): CandyDate {
    if (this.isRange) {
      return ((this.datePickerService.value as CandyDate[]) || [])[this.datePickerService.getActiveIndex(partType)];
    } else {
      return this.datePickerService.value as CandyDate;
    }
  }

  getActiveDate(partType?: RangePartType): CandyDate {
    if (this.isRange) {
      return (this.datePickerService.activeDate as CandyDate[])[this.datePickerService.getActiveIndex(partType)];
    } else {
      return this.datePickerService.activeDate as CandyDate;
    }
  }

  hasSelectedValue(): boolean {
    const part = this.datePickerService.getActiveIndex();
    return this.selectedValue && !!this.selectedValue[part];
  }

  disabledStartTime = (value: Date | Date[]): DisabledTimeConfig => {
    return this.disabledTime && this.disabledTime(value, 'start');
  };

  disabledEndTime = (value: Date | Date[]): DisabledTimeConfig => {
    return this.disabledTime && this.disabledTime(value, 'end');
  };

  isAllowedSelectedValue(): boolean {
    const selectedValue = this.selectedValue;
    if (selectedValue && selectedValue[0] && !selectedValue[1]) {
      return isAllowedDate(selectedValue[0], this.disabledDate, this.disabledStartTime);
    }
    if (selectedValue && !selectedValue[0] && selectedValue[1]) {
      return isAllowedDate(selectedValue[1], this.disabledDate, this.disabledEndTime);
    }
    if (selectedValue && selectedValue[0] && selectedValue[1]) {
      return (
        isAllowedDate(selectedValue[0], this.disabledDate, this.disabledStartTime) &&
        isAllowedDate(selectedValue[1], this.disabledDate, this.disabledEndTime)
      );
    }
    return false;
  }

  timePickerDisabled(): boolean {
    if (!this.hasTimePicker) {
      return true;
    }

    if (this.isRange) {
      return !this.hasSelectedValue() || !!this.hoverValue.length;
    } else {
      return false;
    }
  }

  okDisabled(): boolean {
    if (!this.hasTimePicker) {
      return true;
    }

    if (this.isRange) {
      return !this.isAllowedSelectedValue() || !this.hasSelectedValue();
    } else {
      return this.datePickerService.value
        ? !isAllowedDate(this.datePickerService.value as CandyDate, this.disabledDate, this.disabledTime)
        : false;
    }
  }

  getTimeOptions(partType?: RangePartType): SupportTimeOptions | null {
    if (this.showTime && this.timeOptions) {
      return this.timeOptions instanceof Array ? this.timeOptions[this.datePickerService.getActiveIndex(partType)] : this.timeOptions;
    }
    return null;
  }

  onClickPresetRange(val: PresetRanges[keyof PresetRanges]): void {
    const value = typeof val === 'function' ? val() : val;
    if (value) {
      this.datePickerService.setValue([new CandyDate(value[0]), new CandyDate(value[1])]);
      this.resultOk.emit();
    }
  }

  onPresetRangeMouseLeave(): void {
    this.clearHoverValue();
  }

  onHoverPresetRange(val: PresetRanges[keyof PresetRanges]): void {
    if (typeof val !== 'function') {
      this.hoverValue = [new CandyDate(val[0]), new CandyDate(val[1])];
    }
  }

  getObjectKeys(obj: object): string[] {
    return obj ? Object.keys(obj) : [];
  }

  show(partType: RangePartType): boolean {
    const hide = this.showTime && this.isRange && this.datePickerService.activeInput !== partType;
    return !hide;
  }

  private clearHoverValue(): void {
    this.hoverValue = [];
  }

  private buildTimeOptions(): void {
    if (this.showTime) {
      const showTime = typeof this.showTime === 'object' ? this.showTime : {};
      if (this.isRange) {
        const value = this.datePickerService.value as CandyDate[];
        this.timeOptions = [this.overrideTimeOptions(showTime, value[0], 'start'), this.overrideTimeOptions(showTime, value[1], 'end')];
      } else {
        this.timeOptions = this.overrideTimeOptions(showTime, this.datePickerService.value as CandyDate);
      }
    } else {
      this.timeOptions = null;
    }
  }

  private overrideTimeOptions(origin: SupportTimeOptions, value: CandyDate, partial?: DisabledTimePartial): SupportTimeOptions {
    let disabledTimeFn;
    if (partial) {
      disabledTimeFn = partial === 'start' ? this.disabledStartTime : this.disabledEndTime;
    } else {
      disabledTimeFn = this.disabledTime;
    }
    return { ...origin, ...getTimeConfig(value, disabledTimeFn) };
  }

  private overrideHms(newValue: CandyDate | null, oldValue: CandyDate | null): CandyDate {
    // tslint:disable-next-line:no-parameter-reassignment
    newValue = newValue || new CandyDate();
    // tslint:disable-next-line:no-parameter-reassignment
    oldValue = oldValue || new CandyDate();
    return oldValue.setHms(newValue.getHours(), newValue.getMinutes(), newValue.getSeconds());
  }
}
