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
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { CandyDate } from 'ng-zorro-antd/core';
import { DateHelperService, NzCalendarI18nInterface } from 'ng-zorro-antd/i18n';

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
  @Input() format: string;
  @Input() placeholder: string;
  @Input() disabledDate: (d: Date) => boolean;

  @Input() value: CandyDate;
  @Input() autoFocus: boolean;
  @ViewChild('inputElement', { static: true }) inputRef: ElementRef;

  @Output() readonly valueChange = new EventEmitter<{ date: CandyDate; isEnter: boolean }>();

  prefixCls: string = 'ant-calendar';
  invalidInputClass: string = '';

  constructor(private dateHelper: DateHelperService) {}

  ngOnInit(): void {
    if (this.autoFocus) {
      setTimeout(() => this.inputRef.nativeElement.focus());
    }
  }

  onInputKeyup(event: KeyboardEvent, isEnter: boolean = false): void {
    const date = this.checkValidInputDate(event);

    if (!date || (this.disabledDate && this.disabledDate(date.nativeDate))) {
      return;
    }

    this.value = date;
    this.valueChange.emit({ date, isEnter });
  }

  toReadableInput(value: CandyDate): string {
    return value ? this.dateHelper.format(value.nativeDate, this.format) : '';
  }

  private checkValidInputDate(event: Event): CandyDate | null {
    const input = (event.target as HTMLInputElement).value;
    const date = new CandyDate(input);

    this.invalidInputClass = '';
    if (!date.isValid() || input !== this.toReadableInput(date)) {
      // Should also match the input format exactly
      this.invalidInputClass = `${this.prefixCls}-input-invalid`;
      return null;
    }

    return date;
  }
}
