/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

import { CandyDate } from 'ng-zorro-antd/core';
import { NzCalendarI18nInterface } from 'ng-zorro-antd/i18n';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'month-panel', // tslint:disable-line:component-selector
  exportAs: 'monthPanel',
  templateUrl: 'month-panel.component.html'
})
export class MonthPanelComponent {
  @Input() locale: NzCalendarI18nInterface;
  @Input() value: CandyDate;
  @Input() disabledDate: (date: Date) => boolean;

  @Output() readonly valueChange = new EventEmitter<CandyDate>();
  @Output() readonly yearPanelShow = new EventEmitter<void>();

  prefixCls: string = 'ant-calendar-month-panel';

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
