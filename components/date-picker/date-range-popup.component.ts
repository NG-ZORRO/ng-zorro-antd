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

import { CandyDate, cloneDate, CompatibleValue, normalizeRangeValue, SingleValue, sortRangeValue } from 'ng-zorro-antd/core/time';
import { FunctionProp } from 'ng-zorro-antd/core/types';
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
        [selectedValue]="datePickerService?.value"
        [hoverValue]="hoverValue"
        [enablePrev]="enablePrevNext('prev', partType)"
        [enableNext]="enablePrevNext('next', partType)"
        (dayHover)="onDayHover($event)"
        (selectDate)="changeValueFromSelect($event, !showTime)"
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
        [okDisabled]="!isAllowed(datePickerService?.value)"
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
    this.datePickerService.valueChange$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.initActiveDate();
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

  initActiveDate(): void {
    const activeDate = this.datePickerService.hasValue()
      ? this.datePickerService.value
      : this.datePickerService.makeValue(this.defaultPickerValue);
    this.datePickerService.setActiveDate(activeDate);
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
    this.changeValueFromSelect(value, !this.showTime);
  }

  onDayHover(value: CandyDate): void {
    if (!this.isRange) {
      return;
    }
    const otherInputIndex = { left: 1, right: 0 }[this.datePickerService.activeInput];
    const base = (this.datePickerService.value as CandyDate[])[otherInputIndex]!;
    if (base) {
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
      this.datePickerService.setValue(newValue);
    } else {
      const newValue = this.overrideHms(value, this.datePickerService.value as CandyDate);
      this.datePickerService.setValue(newValue); // If not select a date currently, use today
    }
    this.buildTimeOptions();
  }

  changeValueFromSelect(value: CandyDate, emitValue: boolean = true): void {
    if (this.isRange) {
      let selectedValue: SingleValue[] = cloneDate(this.datePickerService.value) as CandyDate[];
      let otherPart: RangePartType;
      if (this.datePickerService.activeInput === 'left') {
        otherPart = 'right';
        selectedValue[0] = value;
      } else {
        otherPart = 'left';
        selectedValue[1] = value;
      }

      if (!this.isAllowed(selectedValue)) {
        return;
      }

      this.hoverValue = selectedValue;
      selectedValue = sortRangeValue(selectedValue); // Sort
      this.datePickerService.setValue(selectedValue);
      this.datePickerService.setActiveDate(selectedValue);

      if (emitValue) {
        // If the other input has value
        if (this.isBothAllowed(selectedValue)) {
          this.calendarChange.emit(selectedValue);
          this.clearHoverValue();
          this.datePickerService.emitValue$.next();
        } else {
          this.calendarChange.emit([value.clone()]);
          this.datePickerService.inputPartChange$.next(otherPart!);
        }
      }
    } else {
      if (!this.isAllowed(value)) {
        return;
      }
      this.datePickerService.setValue(value);
      this.datePickerService.setActiveDate(value);
      if (emitValue) {
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

  disabledStartTime = (value: Date | Date[]): DisabledTimeConfig => {
    return this.disabledTime && this.disabledTime(value, 'start');
  };

  disabledEndTime = (value: Date | Date[]): DisabledTimeConfig => {
    return this.disabledTime && this.disabledTime(value, 'end');
  };

  isOneAllowed(selectedValue: SingleValue[]): boolean {
    return (
      isAllowedDate(selectedValue[0]!, this.disabledDate, this.disabledStartTime) ||
      isAllowedDate(selectedValue[1]!, this.disabledDate, this.disabledStartTime)
    );
  }

  isBothAllowed(selectedValue: SingleValue[]): boolean {
    return (
      isAllowedDate(selectedValue[0]!, this.disabledDate, this.disabledStartTime) &&
      isAllowedDate(selectedValue[1]!, this.disabledDate, this.disabledEndTime)
    );
  }

  isAllowed(value: CompatibleValue, isBoth: boolean = false): boolean {
    if (this.isRange) {
      return isBoth ? this.isBothAllowed(value as CandyDate[]) : this.isOneAllowed(value as CandyDate[]);
    } else {
      return isAllowedDate(value as CandyDate, this.disabledDate, this.disabledTime);
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
