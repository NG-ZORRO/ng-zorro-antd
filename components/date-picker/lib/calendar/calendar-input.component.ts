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
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { CandyDate } from 'ng-zorro-antd/core';
import { DateHelperService, NzCalendarI18nInterface } from 'ng-zorro-antd/i18n';
import { DateRangePopupComponent } from '../popups/date-range-popup.component';

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
  @Input() partType: 'left' | 'right' | undefined;
  @Input() disabledDate: (d: Date) => boolean;

  @Input() value: CandyDate;
  @Input() autoFocus: boolean;
  @ViewChild('inputElement', { static: true }) inputRef: ElementRef;

  prefixCls: string = 'ant-calendar';
  invalidInputClass: string = '';

  constructor(private dateHelper: DateHelperService, private parent: DateRangePopupComponent) {}

  ngOnInit(): void {
    if (this.autoFocus) {
      this.inputRef.nativeElement.focus();
    }
  }

  onInputKeyup(event: KeyboardEvent, isEnter: boolean = false): void {
    const date = this.checkValidInputDate(event);

    if (!date || (this.disabledDate && this.disabledDate(date.nativeDate))) {
      return;
    }

    this.value = date;
    this.parent.changeValueFromInput(date, isEnter, this.partType);
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
