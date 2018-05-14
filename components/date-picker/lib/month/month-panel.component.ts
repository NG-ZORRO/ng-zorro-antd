import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { NzCalendarI18nInterface } from '../../../i18n/nz-i18n.interface';
import { CandyDate } from '../candy-date';

@Component({
  selector: 'month-panel',
  templateUrl: 'month-panel.component.html'
})

export class MonthPanelComponent implements OnInit {
  @Input() locale: NzCalendarI18nInterface;

  @Input() value: CandyDate;
  @Output() valueChange = new EventEmitter<CandyDate>();

  @Input() disabledDate: (date: Date) => boolean;

  @Output() yearPanelShow = new EventEmitter<void>();

  prefixCls: string = 'ant-calendar-month-panel';

  constructor() { }

  ngOnInit(): void { }

  previousYear(): void {
    this.gotoYear(-1);
  }

  nextYear(): void {
    this.gotoYear(1);
  }

  // Re-render panel content by the header's buttons (NOTE: Do not try to trigger final value change)
  private gotoYear(amount: number): void {
    this.value = this.value.addYears(amount);
    // this.valueChange.emit(this.value); // Do not try to trigger final value change
  }
}
