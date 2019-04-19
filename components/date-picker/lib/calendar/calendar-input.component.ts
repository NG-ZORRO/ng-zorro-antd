import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';

import { DateHelperService } from 'ng-zorro-antd/i18n';
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
  @Input() format: string;
  @Input() placeholder: string;
  @Input() disabledDate: (d: Date) => boolean;

  @Input() value: CandyDate;
  @Output() readonly valueChange = new EventEmitter<CandyDate>();

  prefixCls: string = 'ant-calendar';
  invalidInputClass: string = '';

  constructor(private dateHelper: DateHelperService) {}

  ngOnInit(): void {}

  onInputKeyup(event: Event): void {
    const date = this.checkValidInputDate(event);

    if (!date || (this.disabledDate && this.disabledDate(date.nativeDate))) {
      return;
    }

    if (!date.isSame(this.value, 'second')) {
      // Not same with original value
      this.value = date;
      this.valueChange.emit(this.value);
    }
  }

  toReadableInput(value: CandyDate): string {
    return value ? this.dateHelper.format(value.nativeDate, this.format) : '';
  }

  private checkValidInputDate(event: Event): CandyDate | null {
    const input = (event.target as HTMLInputElement).value;
    const date = new CandyDate(input);

    this.invalidInputClass = '';
    if (date.isInvalid() || input !== this.toReadableInput(date)) {
      // Should also match the input format exactly
      this.invalidInputClass = `${this.prefixCls}-input-invalid`;
      return null;
    }

    return date;
  }
}
