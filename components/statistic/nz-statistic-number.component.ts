/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { getLocaleNumberSymbol, NumberSymbol } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  LOCALE_ID,
  OnChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { NzStatisticValueType } from './nz-statistic-definitions';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  selector: 'nz-statistic-number',
  exportAs: 'nzStatisticNumber',
  templateUrl: './nz-statistic-number.component.html',
  host: {
    class: 'ant-statistic-content-value'
  },
  styles: ['nz-number { display: inline }']
})
export class NzStatisticNumberComponent implements OnChanges {
  @Input() nzValue: NzStatisticValueType;
  @Input() nzValueTemplate: TemplateRef<{ $implicit: NzStatisticValueType }>;

  displayInt = '';
  displayDecimal = '';

  constructor(@Inject(LOCALE_ID) private locale_id: string) {}

  ngOnChanges(): void {
    this.formatNumber();
  }

  private formatNumber(): void {
    const decimalSeparator: string =
      typeof this.nzValue === 'number' ? '.' : getLocaleNumberSymbol(this.locale_id, NumberSymbol.Decimal);
    const value = String(this.nzValue);
    const [int, decimal] = value.split(decimalSeparator);

    this.displayInt = int;
    this.displayDecimal = decimal ? `${decimalSeparator}${decimal}` : '';
  }
}
