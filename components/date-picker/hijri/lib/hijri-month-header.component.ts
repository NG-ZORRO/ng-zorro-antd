/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, inject, ViewEncapsulation } from '@angular/core';

import { NzDateAdapter } from 'ng-zorro-antd/core/time';

import { HijriAbstractPanelHeader } from './hijri-abstract-panel-header';
import { PanelSelector } from '../../lib/interface';
import { transCompatFormat } from '../../lib/util';
import { NzDateMode } from '../../standard-types';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'hijri-month-header',
  templateUrl: '../../lib/abstract-panel-header.html',
  encapsulation: ViewEncapsulation.None
})
export class HijriMonthHeaderComponent extends HijriAbstractPanelHeader {
  private readonly dateAdapter = inject(NzDateAdapter);

  override mode: NzDateMode = 'month';

  getSelectors(): PanelSelector[] {
    return [
      {
        className: `${this.prefixCls}-month-btn`,
        title: this.locale.yearSelect,
        onClick: () => {
          this.mode = 'year';
          this.changeMode('year');
        },
        label: this.dateAdapter.format(this.value.nativeDate, transCompatFormat(this.locale.yearFormat))
      }
    ];
  }
}
