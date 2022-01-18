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
  selector: 'decade-header', // eslint-disable-line @angular-eslint/component-selector
  exportAs: 'decadeHeader',
  templateUrl: './abstract-panel-header.html'
})
export class DecadeHeaderComponent extends AbstractPanelHeader {
  override previous(): void {}
  override next(): void {}

  get startYear(): number {
    return parseInt(`${this.value.getYear() / 100}`, 10) * 100;
  }

  get endYear(): number {
    return this.startYear + 99;
  }

  override superPrevious(): void {
    this.changeValue(this.value.addYears(-100));
  }

  override superNext(): void {
    this.changeValue(this.value.addYears(100));
  }

  getSelectors(): PanelSelector[] {
    return [
      {
        className: `${this.prefixCls}-decade-btn`,
        title: '',
        onClick: () => {
          // noop
        },
        label: `${this.startYear}-${this.endYear}`
      }
    ];
  }
}
