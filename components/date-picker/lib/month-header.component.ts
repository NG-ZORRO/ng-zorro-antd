/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { DateHelperService } from 'ng-zorro-antd/i18n';
import { AbstractPanelHeader } from './abstract-panel-header';
import { PanelSelector } from './interface';
import { transCompatFormat } from './util';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'month-header', // tslint:disable-line:component-selector
  exportAs: 'monthHeader',
  templateUrl: './abstract-panel-header.html'
})
export class MonthHeaderComponent extends AbstractPanelHeader {
  constructor(private dateHelper: DateHelperService) {
    super();
  }

  getSelectors(): PanelSelector[] {
    return [
      {
        className: `${this.prefixCls}-month-btn`,
        title: this.locale.yearSelect,
        onClick: () => this.changeMode('year'),
        label: this.dateHelper.format(this.value.nativeDate, transCompatFormat(this.locale.yearFormat))
      }
    ];
  }
}
