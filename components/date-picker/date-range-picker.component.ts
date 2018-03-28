import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';

import { FunctionProp } from '../core/types/common-wrap';
import { toBoolean, valueFunctionProp, InputBoolean } from '../core/util/convert';
import { LoggerService } from '../core/util/logger/logger.service';
import { NzI18nService } from '../i18n';
import { NzDatePickerI18nInterface } from '../i18n/nz-i18n.interface';
import { CandyDate } from './lib/candy-date';
// import { DateChangeEvent } from './lib/date-change-event';
// import { CommonPickerApi } from './standard-types';

import { AbstractPickerComponent, CompatibleValue } from './abstract-picker.component';
import { NzPickerComponent } from './picker.component';
import { DisabledTimeFn, PanelMode, PresetRanges } from './standard-types';

@Component({ })

export abstract class DateRangePickerComponent extends AbstractPickerComponent implements OnInit, OnChanges {
  showWeek: boolean = false; // Should show as week picker

  @Input() nzDateRender: FunctionProp<TemplateRef<CandyDate> | string>;
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

  @Output() nzOnOk = new EventEmitter<CompatibleValue>();

  get realShowToday(): boolean { // Range not support nzShowToday currently
    return !this.isRange && this.nzShowToday;
  }

  extraFooter: TemplateRef<void> | string;

  constructor(i18n: NzI18nService, private logger: LoggerService) {
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
    this.nzOnOk.emit(this.nzValue);
    this.closeOverlay();
  }

  onOpenChange(open: boolean): void {
    this.nzOnOpenChange.emit(open);
  }
}
