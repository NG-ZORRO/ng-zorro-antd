/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { PanelSelector } from './interface';

import { DateHelperByDatePipe, DateHelperService } from 'ng-zorro-antd/i18n';
import { AbstractPanelHeader } from './abstract-panel-header';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'date-header', // tslint:disable-line:component-selector
  exportAs: 'dateHeader',
  templateUrl: './abstract-panel-header.html'
})
export class DateHeaderComponent extends AbstractPanelHeader {
  constructor(private dateHelper: DateHelperService) {
    super();
  }

  getSelectors(): PanelSelector[] {
    let yearFormat: string = this.locale.yearFormat;
    if (this.dateHelper.relyOnDatePipe) {
      yearFormat = (this.dateHelper as DateHelperByDatePipe).transCompatFormat(yearFormat);
    }
    return [
      {
        className: `${this.prefixCls}-year-btn`,
        title: this.locale.yearSelect,
        onClick: () => this.changeMode('year'),
        label: this.dateHelper.format(this.value.nativeDate, yearFormat)
      },
      {
        className: `${this.prefixCls}-month-btn`,
        title: this.locale.monthSelect,
        onClick: () => this.changeMode('month'),
        label: this.dateHelper.format(this.value.nativeDate, this.locale.monthFormat || 'MMM')
      }
    ];
  }
}
