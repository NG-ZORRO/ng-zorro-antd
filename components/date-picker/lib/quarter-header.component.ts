/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';

import { NzDateAdapter } from 'ng-zorro-antd/core/time';

import { NzDateMode } from '../standard-types';
import { AbstractPanelHeader } from './abstract-panel-header';
import { PanelSelector } from './interface';
import { transCompatFormat } from './util';

@Component({
  selector: 'quarter-header', // eslint-disable-line @angular-eslint/component-selector
  templateUrl: './abstract-panel-header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class QuarterHeaderComponent extends AbstractPanelHeader {
  private readonly dateAdapter = inject(NzDateAdapter);

  override mode: NzDateMode = 'quarter';

  getSelectors(): PanelSelector[] {
    return [
      {
        className: `${this.prefixCls}-quarter-btn`,
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
