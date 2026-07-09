/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';

import { NzDateAdapter } from 'ng-zorro-antd/core/time';

import { AbstractPanelHeader } from './abstract-panel-header';
import { PanelSelector } from './interface';
import { transCompatFormat } from './util';

@Component({
  selector: 'date-header', // eslint-disable-line @angular-eslint/component-selector
  templateUrl: './abstract-panel-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class DateHeaderComponent extends AbstractPanelHeader {
  private readonly dateAdapter = inject(NzDateAdapter);

  getSelectors(): PanelSelector[] {
    return [
      {
        className: `${this.prefixCls}-year-btn`,
        title: this.locale.yearSelect,
        onClick: () => {
          this.mode = 'year';
          this.changeMode('year');
        },
        label: this.dateAdapter.format(this.value.nativeDate, transCompatFormat(this.locale.yearFormat))
      },
      {
        className: `${this.prefixCls}-month-btn`,
        title: this.locale.monthSelect,
        onClick: () => {
          this.mode = 'month';
          this.changeMode('month');
        },
        label: this.dateAdapter.format(this.value.nativeDate, transCompatFormat(this.locale.monthFormat || 'MMM'))
      }
    ];
  }
}
