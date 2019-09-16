/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef
} from '@angular/core';

import {
  toBoolean,
  valueFunctionProp,
  CandyDate,
  FunctionProp,
  InputBoolean,
  NzNoAnimationDirective
} from 'ng-zorro-antd/core';
import { DateHelperService, NzI18nService } from 'ng-zorro-antd/i18n';

import { AbstractPickerComponent } from './abstract-picker.component';
import { CompatibleDate, DisabledTimeFn, PanelMode, PresetRanges } from './standard-types';

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
  @Input() nzRanges: PresetRanges;
  @Output() readonly nzOnPanelChange = new EventEmitter<PanelMode | PanelMode[]>();
  @Output() readonly nzOnCalendarChange = new EventEmitter<Date[]>();

  private _showTime: object | boolean;
  @Input() get nzShowTime(): object | boolean {
    return this._showTime;
  }
  set nzShowTime(value: object | boolean) {
    this._showTime = typeof value === 'object' ? value : toBoolean(value);
  }

  @Output() readonly nzOnOk = new EventEmitter<CompatibleDate | null>();

  get realShowToday(): boolean {
    // Range not support nzShowToday currently
    return !this.isRange && this.nzShowToday;
  }

  pickerStyle: object; // Final picker style that contains width fix corrections etc.
  extraFooter: TemplateRef<void> | string;

  constructor(
    i18n: NzI18nService,
    cdr: ChangeDetectorRef,
    dateHelper: DateHelperService,
    noAnimation?: NzNoAnimationDirective
  ) {
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

  /**
   * If user press 'Enter' in input box or `nzShowTime` is false, overlay will close.
   */
  onValueChange(value: CandyDate, isEnter: boolean = false): void {
    super.onValueChange(value);

    if (!this.nzShowTime || isEnter) {
      this.closeOverlay();
    }
  }

  // Emit nzOnCalendarChange when select date by nz-range-picker
  onCalendarChange(value: CandyDate[]): void {
    if (this.isRange) {
      const rangeValue = value.map(x => x.nativeDate);
      this.nzOnCalendarChange.emit(rangeValue);
    }
  }

  // Emitted when done with date selecting
  onResultOk(): void {
    if (this.isRange) {
      const value = this.nzValue as CandyDate[];
      if (value.length) {
        this.nzOnOk.emit([value[0].nativeDate, value[1].nativeDate]);
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
