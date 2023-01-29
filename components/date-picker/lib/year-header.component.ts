/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { AbstractPanelHeader } from './abstract-panel-header';
import { PanelSelector } from './interface';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'year-header', // eslint-disable-line @angular-eslint/component-selector
  exportAs: 'yearHeader',
  templateUrl: './abstract-panel-header.html'
})
export class YearHeaderComponent extends AbstractPanelHeader {
  get startYear(): number {
    return parseInt(`${this.value.getYear() / 10}`, 10) * 10;
  }

  get endYear(): number {
    return this.startYear + 9;
  }

  override superPrevious(): void {
    this.changeValue(this.value.addYears(-10));
  }

  override superNext(): void {
    this.changeValue(this.value.addYears(10));
  }

  getSelectors(): PanelSelector[] {
    return [
      {
        className: `${this.prefixCls}-year-btn`,
        title: '',
        onClick: () => this.changeMode('decade'),
        label: `${this.startYear}-${this.endYear}`
      }
    ];
  }
}
