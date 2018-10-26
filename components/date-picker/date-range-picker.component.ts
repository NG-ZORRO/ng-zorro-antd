import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';

import { FunctionProp } from '../core/types/common-wrap';
import { toBoolean, valueFunctionProp, InputBoolean } from '../core/util/convert';
import { NzI18nService } from '../i18n/nz-i18n.service';
import { CandyDate } from './lib/candy-date';

import { AbstractPickerComponent, CompatibleDate } from './abstract-picker.component';
import { DisabledTimeFn, PanelMode, PresetRanges } from './standard-types';

@Component({
  template: `` // Just for rollup
})

export class DateRangePickerComponent extends AbstractPickerComponent implements OnInit, OnChanges {
  showWeek: boolean = false; // Should show as week picker

  @Input() nzDateRender: FunctionProp<TemplateRef<Date> | string>;
  @Input() nzDisabledTime: DisabledTimeFn;
  @Input() nzRenderExtraFooter: FunctionProp<TemplateRef<void> | string>;
  @Input() @InputBoolean() nzShowToday: boolean = true;
  @Input() nzMode: PanelMode | PanelMode[];
  @Input() nzRanges: FunctionProp<PresetRanges>;
  @Output() nzOnPanelChange = new EventEmitter<PanelMode | PanelMode[]>();

  private _showTime: object | boolean;
  @Input() get nzShowTime(): object | boolean { return this._showTime; }
  set nzShowTime(value: object | boolean) {
    this._showTime = typeof value === 'object' ? value : toBoolean(value);
  }

  @Output() nzOnOk = new EventEmitter<CompatibleDate>();

  get realShowToday(): boolean { // Range not support nzShowToday currently
    return !this.isRange && this.nzShowToday;
  }

  pickerStyle: object; // Final picker style that contains width fix corrections etc.
  extraFooter: TemplateRef<void> | string;

  constructor(i18n: NzI18nService) {
    super(i18n);
  }

  ngOnInit(): void {
    super.ngOnInit();

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
    super.ngOnChanges(changes);

    if (changes.nzRenderExtraFooter) {
      this.extraFooter = valueFunctionProp(this.nzRenderExtraFooter);
    }

    if (changes.nzShowTime || changes.nzStyle) {
      this.setFixedPickerStyle();
    }
  }

  // If has no timepicker and the user select a date by date panel, then close picker
  onValueChange(value: CandyDate): void {
    super.onValueChange(value);

    if (!this.nzShowTime) {
      this.closeOverlay();
    }
  }

  // Emitted when done with date selecting
  onResultOk(): void {
    if (this.isRange) {
      if ((this.nzValue as CandyDate[]).length) {
        this.nzOnOk.emit([ this.nzValue[ 0 ].nativeDate, this.nzValue[ 1 ].nativeDate ]);
      } else {
        this.nzOnOk.emit([]);
      }
    } else {
      if (this.nzValue) {
        this.nzOnOk.emit((this.nzValue as CandyDate).nativeDate);
      } else {
        this.nzOnOk.emit(null);
      }
    }
    this.closeOverlay();
  }

  onOpenChange(open: boolean): void {
    this.nzOnOpenChange.emit(open);
  }

  // Setup fixed style for picker
  private setFixedPickerStyle(): void {
    const showTimeFixes: { width?: string } = {};
    if (this.nzShowTime) {
      showTimeFixes.width = this.isRange ? '350px' : '195px';
    }

    this.pickerStyle = { ...showTimeFixes, ...this.nzStyle };
  }
}
