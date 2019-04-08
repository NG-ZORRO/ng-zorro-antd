import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';

import { DateHelperByDatePipe, DateHelperService } from 'ng-zorro-antd/i18n';
import { NzCalendarI18nInterface } from 'ng-zorro-antd/i18n';
import { CandyDate } from '../candy-date/candy-date';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // tslint:disable-next-line:component-selector
  selector: 'today-button',
  exportAs: 'todayButton',
  templateUrl: 'today-button.component.html'
})
export class TodayButtonComponent implements OnInit, OnChanges {
  @Input() locale: NzCalendarI18nInterface;
  @Input() hasTimePicker: boolean = false;
  @Input() disabledDate: (d: Date) => boolean;

  @Output() readonly clickToday = new EventEmitter<CandyDate>();

  prefixCls: string = 'ant-calendar';
  isDisabled: boolean = false;
  title: string;

  private now: CandyDate = new CandyDate();

  constructor(private dateHelper: DateHelperService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.disabledDate) {
      this.isDisabled = this.disabledDate && this.disabledDate(this.now.nativeDate);
    }
    if (changes.locale) {
      // NOTE: Compat for DatePipe formatting rules
      let dateFormat: string = this.locale.dateFormat;
      if (this.dateHelper.relyOnDatePipe) {
        dateFormat = (this.dateHelper as DateHelperByDatePipe).transCompatFormat(dateFormat);
      }
      this.title = this.dateHelper.format(this.now.nativeDate, dateFormat);
    }
  }

  onClickToday(): void {
    this.clickToday.emit(this.now.clone()); // To prevent the "now" being modified from outside, we use clone
  }
}
