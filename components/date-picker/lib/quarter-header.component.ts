/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgClass, NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { DateHelperService } from 'ng-zorro-antd/i18n';

import { AbstractPanelHeader } from './abstract-panel-header';
import { PanelSelector } from './interface';
import { transCompatFormat } from './util';
import { NzDateMode } from '../standard-types';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'quarter-header', // eslint-disable-line @angular-eslint/component-selector
  exportAs: 'quarterHeader',
  templateUrl: './abstract-panel-header.html',
  standalone: true,
  imports: [NgForOf, NgIf, NgClass]
})
export class QuarterHeaderComponent extends AbstractPanelHeader {
  override mode: NzDateMode = 'quarter';

  constructor(private dateHelper: DateHelperService) {
    super();
  }

  getSelectors(): PanelSelector[] {
    return [
      {
        className: `${this.prefixCls}-quarter-btn`,
        title: this.locale.yearSelect,
        onClick: () => {
          this.mode = 'year';
          this.changeMode('year');
        },
        label: this.dateHelper.format(this.value.nativeDate, transCompatFormat(this.locale.yearFormat))
      }
    ];
  }
}
