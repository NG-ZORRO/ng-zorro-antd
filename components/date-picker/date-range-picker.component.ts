import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';

import { NzNoAnimationDirective } from '../core/no-animation/nz-no-animation.directive';
import { FunctionProp } from '../core/types/common-wrap';
import { toBoolean, valueFunctionProp, InputBoolean } from '../core/util/convert';
import { NzI18nService } from '../i18n/nz-i18n.service';
import { CandyDate } from './lib/candy-date';

import { DateHelperService } from '../i18n/date-helper.service';
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
  @Output() readonly nzOnPanelChange = new EventEmitter<PanelMode | PanelMode[]>();

  private _showTime: object | boolean;
  @Input() get nzShowTime(): object | boolean { return this._showTime; }
  set nzShowTime(value: object | boolean) {
    this._showTime = typeof value === 'object' ? value : toBoolean(value);
  }

  @Output() readonly nzOnOk = new EventEmitter<CompatibleDate | null>();

  get realShowToday(): boolean { // Range not support nzShowToday currently
    return !this.isRange && this.nzShowToday;
  }

  pickerStyle: object; // Final picker style that contains width fix corrections etc.
  extraFooter: TemplateRef<void> | string;

  constructor(i18n: NzI18nService, cdr: ChangeDetectorRef, dateHelper: DateHelperService, noAnimation?: NzNoAnimationDirective) {
    super(i18n, cdr, dateHelper, noAnimation);
  }

  ngOnInit(): void {
    super.ngOnInit();

    // Default format when it's empty
    if (!this.nzFormat) {
      if (this.showWeek) {
        this.nzFormat = this.dateHelper.relyOnDatePipe ? 'yyyy-ww' : 'YYYY-WW'; // Format for week
      } else {
        if (this.dateHelper.relyOnDatePipe) {
          this.nzFormat = this.nzShowTime ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd';
        } else {
          this.nzFormat = this.nzShowTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
        }
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
      const value = this.nzValue as CandyDate[];
      if (value.length) {
        this.nzOnOk.emit([ value[ 0 ].nativeDate, value[ 1 ].nativeDate ]);
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
