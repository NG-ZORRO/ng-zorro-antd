/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, ViewEncapsulation } from '@angular/core';

import { CandyDate } from 'ng-zorro-antd/core/time';

import { HijriAbstractPanelHeader } from './hijri-abstract-panel-header';
import { PanelSelector } from '../../lib/interface';
import { NzDateMode } from '../../standard-types';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'hijri-year-header',
  templateUrl: '../../lib/abstract-panel-header.html',
  encapsulation: ViewEncapsulation.None
})
export class HijriYearHeaderComponent extends HijriAbstractPanelHeader {
  override mode: NzDateMode = 'year';

  get startYear(): number {
    return parseInt(`${this.hijriAdapter.getYear(this.value.nativeDate) / 10}`, 10) * 10;
  }

  get endYear(): number {
    return this.startYear + 9;
  }

  override superPrevious(): void {
    this.changeValue(new CandyDate(this.hijriAdapter.addCalendarYears(this.value.nativeDate, -10)));
  }

  override superNext(): void {
    this.changeValue(new CandyDate(this.hijriAdapter.addCalendarYears(this.value.nativeDate, 10)));
  }

  getSelectors(): PanelSelector[] {
    return [
      {
        className: `${this.prefixCls}-year-btn`,
        title: '',
        onClick: () => {
          this.mode = 'decade';
          this.changeMode('decade');
        },
        label: `${this.startYear}-${this.endYear}`
      }
    ];
  }
}
