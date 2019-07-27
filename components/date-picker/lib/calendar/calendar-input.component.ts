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
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';

import { Moment } from 'jalali-moment';
import { NzCalendarI18nInterface } from 'ng-zorro-antd/i18n';
import { CandyDate } from '../candy-date/candy-date';
@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:component-selector
  selector: 'calendar-input',
  exportAs: 'calendarInput',
  templateUrl: 'calendar-input.component.html'
})
export class CalendarInputComponent implements OnInit {
  @Input() locale: NzCalendarI18nInterface;
  @Input() dateLocale: string;
  @Input() format: string;
  @Input() placeholder: string;
  @Input() disabledDate: (d: Moment) => boolean;

  @Input() value: CandyDate;
  @Output() readonly valueChange = new EventEmitter<CandyDate>();

  prefixCls: string = 'ant-calendar';
  invalidInputClass: string = '';

  constructor() {}

  ngOnInit(): void {
    if (this.value) {
      this.value.setLocale(this.dateLocale);
    }
  }

  onInputKeyup(event: Event): void {
    const date = this.checkValidInputDate(event);

    if (!date || (this.disabledDate && this.disabledDate(date._moment))) {
      return;
    }

    if (!date.isSame(this.value, 'second')) {
      // Not same with original value
      this.value = date;
      this.valueChange.emit(this.value);
    }
  }

  toReadableInput(value: CandyDate): string {
    return value ? value._moment.format(this.format) : '';
  }

  private checkValidInputDate(event: Event): CandyDate | null {
    const input = (event.target as HTMLInputElement).value;
    const date = new CandyDate(input, this.dateLocale);

    this.invalidInputClass = '';
    if (date.isInvalid() || input !== this.toReadableInput(date)) {
      // Should also match the input format exactly
      this.invalidInputClass = `${this.prefixCls}-input-invalid`;
      return null;
    }

    return date;
  }
}
