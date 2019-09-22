/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { sortRangeValue, CandyDate, FunctionProp } from 'ng-zorro-antd/core';
import { NzCalendarI18nInterface } from 'ng-zorro-antd/i18n';
import {
  CompatibleValue,
  DisabledDateFn,
  DisabledTimeConfig,
  DisabledTimeFn,
  DisabledTimePartial,
  PanelMode,
  PresetRanges,
  SupportTimeOptions
} from '../../standard-types';
import { getTimeConfig, isAllowedDate } from '../util';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:component-selector
  selector: 'date-range-popup',
  exportAs: 'dateRangePopup',
  templateUrl: 'date-range-popup.component.html'
})
export class DateRangePopupComponent implements OnInit, OnChanges {
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
  @Input() value: CompatibleValue;

  @Output() readonly panelModeChange = new EventEmitter<PanelMode | PanelMode[]>();
  @Output() readonly calendarChange = new EventEmitter<CompatibleValue>();
  @Output() readonly valueChange = new EventEmitter<CompatibleValue>();
  @Output() readonly inputChange = new EventEmitter<CompatibleValue>();

  @Output() readonly resultOk = new EventEmitter<void>(); // Emitted when done with date selecting
  @Output() readonly closePicker = new EventEmitter<void>(); // Notify outside to close the picker panel

  prefixCls: string = 'ant-calendar';
  showTimePicker: boolean = false;
  timeOptions: SupportTimeOptions | SupportTimeOptions[] | null;
  valueForRangeShow: CandyDate[]; // Range ONLY
  selectedValue: CandyDate[]; // Range ONLY
  hoverValue: CandyDate[]; // Range ONLY

  get hasTimePicker(): boolean {
    return !!this.showTime;
  }

  get hasFooter(): boolean {
    return this.showToday || this.hasTimePicker || !!this.extraFooter || !!this.ranges;
  }

  private partTypeMap: { [key: string]: number } = { left: 0, right: 1 };

  [property: string]: any; // tslint:disable-line:no-any

  ngOnInit(): void {
    // Initialization for range properties to prevent errors while later assignment
    if (this.isRange) {
      ['placeholder', 'panelMode', 'selectedValue', 'hoverValue'].forEach(prop => this.initialArray(prop));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isRange) {
      if (changes.value) {
        // Re-initialize all related values
        this.clearHoverValue();
        this.selectedValue = this.value as CandyDate[];
        this.valueForRangeShow = this.normalizeRangeValue(this.value as CandyDate[]);
      }
    }

    // Parse showTime options
    if (changes.showTime || changes.disabledTime) {
      if (this.showTime) {
        this.buildTimeOptions();
      }
    }

    // Show time picker when assigned panel mode as "time"
    if (changes.panelMode && this.hasTimePicker) {
      this.showTimePicker = this.panelMode === 'time';
    }
  }

  onShowTimePickerChange(show: boolean): void {
    // this.panelMode = show ? 'time' : 'date';
    // this.panelModeChange.emit(this.panelMode);
    this.panelModeChange.emit(show ? 'time' : 'date');
  }

  onClickOk(): void {
    this.setValue(this.value);
    this.resultOk.emit();
  }

  onClickToday(value: CandyDate): void {
    // if (this.isRange) { // Show today is not support by range
    //   throw new Error('"nzShowToday" is not support for "RangePicker"!');
    // } else {
    if (!this.isRange) {
      // tslint:disable-next-line: no-any
      this.value = null as any; // Clear current value to not sync time by next step
      this.changeValueFromSelect(value);
    }
    this.closePickerPanel();
  }

  onDayHover(value: CandyDate): void {
    if (this.isRange && this.selectedValue[0] && !this.selectedValue[1]) {
      // When right value is selected, don't do hover
      const base = this.selectedValue[0]; // Use the left of selected value as the base to decide later hoverValue
      if (base.isBeforeDay(value)) {
        this.hoverValue = [base, value];
      } else {
        this.hoverValue = [value, base];
      }
    }
  }

  onPanelModeChange(mode: PanelMode, partType?: RangePartType): void {
    if (this.isRange) {
      (this.panelMode as PanelMode[])[this.getPartTypeIndex(partType)] = mode;
    } else {
      this.panelMode = mode;
    }
    this.panelModeChange.emit(this.panelMode);
  }

  onHeaderChange(value: CandyDate, partType?: RangePartType): void {
    if (this.isRange) {
      this.valueForRangeShow[this.getPartTypeIndex(partType)] = value;
      this.valueForRangeShow = this.normalizeRangeValue(this.valueForRangeShow); // Should always take care of start/end
    }
  }

  onSelectTime(value: CandyDate, partType?: RangePartType): void {
    if (this.isRange) {
      const newValue = this.cloneRangeDate(this.value as CandyDate[]);
      const index = this.getPartTypeIndex(partType);
      newValue[index] = this.overrideHms(value, newValue[index])!;
      this.setValue(newValue);
    } else {
      this.setValue(this.overrideHms(value, (this.value as CandyDate) || new CandyDate())!); // If not select a date currently, use today
    }
  }

  changeValueFromInput(value: { date: CandyDate; isEnter: boolean }, partType?: RangePartType): void {
    const { date, isEnter } = value;
    if (this.isRange) {
      let newRangeValue = partType === 'left' ? [date, this.selectedValue[1]] : [this.selectedValue[0], date];
      const isValidRange = this.isValidRange(newRangeValue);
      if (isValidRange) {
        newRangeValue = sortRangeValue(newRangeValue);
        this.valueForRangeShow = this.normalizeRangeValue(newRangeValue);
      }
      // ? Why Can not use follow code
      // this.selectedValue[index] = date;
      this.selectedValue = this.cloneRangeDate(newRangeValue);
      this.setValueFromInput(this.cloneRangeDate(newRangeValue), isEnter && isValidRange);
    } else {
      this.setValueFromInput(date, isEnter);
    }
  }

  changeValueFromSelect(value: CandyDate): void {
    if (this.isRange) {
      const [left, right] = this.selectedValue as CandyDate[]; // NOTE: the left/right maybe not the sequence it select at the date panels

      if ((!left && !right) || (left && right)) {
        // If totally full or empty, clean up && re-assign left first
        this.hoverValue = this.selectedValue = [value];
        this.calendarChange.emit([value.clone()]);
      } else if (left && !right) {
        // If one of them is empty, assign the other one and sort, then set the final values
        this.clearHoverValue(); // Clean up
        this.setRangeValue('right', value);
        this.selectedValue = sortRangeValue(this.selectedValue); // Sort
        this.valueForRangeShow = this.normalizeRangeValue(this.selectedValue);
        this.setValue(this.cloneRangeDate(this.selectedValue));
        this.calendarChange.emit(this.cloneRangeDate(this.selectedValue));
      }
    } else {
      this.setValue(value);
    }
    // this.selectDate.emit(value);
  }

  enablePrevNext(direction: 'prev' | 'next', partType?: RangePartType): boolean {
    if (this.isRange) {
      const [start, end] = this.valueForRangeShow;
      const showMiddle = !start.addMonths(1).isSame(end, 'month'); // One month diff then don't show middle prev/next
      if ((partType === 'left' && direction === 'next') || (partType === 'right' && direction === 'prev')) {
        return showMiddle;
      }
      return true;
    } else {
      return true;
    }
  }

  getPanelMode(partType?: RangePartType): PanelMode {
    if (this.isRange) {
      return this.panelMode[this.getPartTypeIndex(partType)] as PanelMode;
    } else {
      return this.panelMode as PanelMode;
    }
  }

  // Get single value or part value of a range
  getValue(partType?: RangePartType): CandyDate {
    if (this.isRange) {
      return (this.value as CandyDate[])[this.getPartTypeIndex(partType)];
    } else {
      return this.value as CandyDate;
    }
  }

  getValueBySelector(partType?: RangePartType): CandyDate {
    if (this.isRange) {
      const valueShow = this.showTimePicker ? this.value : this.valueForRangeShow; // Use the real time value that without decorations when timepicker is shown up
      return (valueShow as CandyDate[])[this.getPartTypeIndex(partType)];
    } else {
      return this.value as CandyDate;
    }
  }

  getPartTypeIndex(partType?: RangePartType): number {
    return this.partTypeMap[partType!];
  }

  getPlaceholder(partType?: RangePartType): string {
    return this.isRange ? this.placeholder[this.getPartTypeIndex(partType)] : (this.placeholder as string);
  }

  hasSelectedValue(): boolean {
    return this.selectedValue && !!this.selectedValue[1] && !!this.selectedValue[0];
  }

  disabledStartTime = (value: Date | Date[]): DisabledTimeConfig => {
    return this.disabledTime && this.disabledTime(value, 'start');
  };

  disabledEndTime = (value: Date | Date[]): DisabledTimeConfig => {
    return this.disabledTime && this.disabledTime(value, 'end');
  };

  isAllowedSelectedValue(): boolean {
    const selectedValue = this.selectedValue;
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
      return !this.isAllowedSelectedValue() || !this.hasSelectedValue() || !!this.hoverValue.length;
    } else {
      return this.value ? !isAllowedDate(this.value as CandyDate, this.disabledDate, this.disabledTime) : false;
    }
  }

  getTimeOptions(partType?: RangePartType): SupportTimeOptions | null {
    if (this.showTime && this.timeOptions) {
      return this.timeOptions instanceof Array ? this.timeOptions[this.getPartTypeIndex(partType)] : this.timeOptions;
    }
    return null;
  }

  onClickPresetRange(val: PresetRanges[keyof PresetRanges]): void {
    const value = typeof val === 'function' ? val() : val;
    if (value) {
      this.setValue([new CandyDate(value[0]), new CandyDate(value[1])]);
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

  private closePickerPanel(): void {
    this.closePicker.emit();
  }

  private clearHoverValue(): void {
    this.hoverValue = [];
  }

  private buildTimeOptions(): void {
    if (this.showTime) {
      const showTime = typeof this.showTime === 'object' ? this.showTime : {};
      if (this.isRange) {
        const value = this.value as CandyDate[];
        this.timeOptions = [
          this.overrideTimeOptions(showTime, value[0], 'start'),
          this.overrideTimeOptions(showTime, value[1], 'end')
        ];
      } else {
        this.timeOptions = this.overrideTimeOptions(showTime, this.value as CandyDate);
      }
    } else {
      this.timeOptions = null;
    }
  }

  private overrideTimeOptions(
    origin: SupportTimeOptions,
    value: CandyDate,
    partial?: DisabledTimePartial
  ): SupportTimeOptions {
    let disabledTimeFn;
    if (partial) {
      disabledTimeFn = partial === 'start' ? this.disabledStartTime : this.disabledEndTime;
    } else {
      disabledTimeFn = this.disabledTime;
    }
    return { ...origin, ...getTimeConfig(value, disabledTimeFn) };
  }

  private setValueFromInput(value: CompatibleValue, emitValue: boolean = true): void {
    this.value = value;
    if (emitValue) {
      this.inputChange.emit(this.value);
    }
    this.buildTimeOptions();
  }

  // Set value and trigger change event
  private setValue(value: CompatibleValue): void {
    // TODO: Sync original time (NOTE: this should take more care of because it may depend on many change sources)
    // if (this.isRange) {
    //   // TODO: Sync time
    // } else {
    //   if (this.value) { // Sync time from the original one if it's available
    //     newValue = this.overrideHms(this.value as CandyDate, newValue as CandyDate);
    //   }
    // }
    this.value = value;
    this.valueChange.emit(this.value);
    this.buildTimeOptions();
  }

  private overrideHms(from: CandyDate, to: CandyDate): CandyDate | null {
    if (!from || !to) {
      return null;
    }
    return to.setHms(from.getHours(), from.getMinutes(), from.getSeconds());
  }

  // Check if it's a valid range value
  private isValidRange(value: CandyDate[]): boolean {
    if (Array.isArray(value)) {
      const [start, end] = value;
      return !!(start && end);
    }
    return false;
  }

  private normalizeRangeValue(value: CandyDate[]): CandyDate[] {
    const [start, end] = value;
    const newStart = start || new CandyDate();
    const newEnd = end && end.isSameMonth(newStart) ? end.addMonths(1) : end || newStart.addMonths(1);
    return [newStart, newEnd];
  }

  // private isEmptyRangeValue(value: CandyDate[]): boolean {
  //   return !value || !Array.isArray(value) || value.every((val) => !val);
  // }

  // Renew and set a range value to trigger sub-component's change detection
  private setRangeValue(partType: RangePartType, value: CandyDate): void {
    const ref = (this.selectedValue = this.cloneRangeDate(this.selectedValue as CandyDate[]));
    ref[this.getPartTypeIndex(partType)] = value;
  }

  private cloneRangeDate(value: CandyDate[]): CandyDate[] {
    return [value[0] && value[0].clone(), value[1] && value[1].clone()] as CandyDate[];
  }

  private initialArray(key: string): void {
    if (!this[key] || !Array.isArray(this[key])) {
      this[key] = [];
    }
  }
}

export type RangePartType = 'left' | 'right';
