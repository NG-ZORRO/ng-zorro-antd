/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { getLocaleNumberSymbol, NgTemplateOutlet, NumberSymbol } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  LOCALE_ID,
  OnChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { NzStatisticValueType } from './typings';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-statistic-content-value',
  exportAs: 'nzStatisticContentValue',
  template: `
    @if (nzValueTemplate) {
      <ng-container [ngTemplateOutlet]="nzValueTemplate" [ngTemplateOutletContext]="{ $implicit: nzValue }" />
    } @else {
      @if (displayInt) {
        <span class="ant-statistic-content-value-int">{{ displayInt }}</span>
      }
      @if (displayDecimal) {
        <span class="ant-statistic-content-value-decimal">{{ displayDecimal }}</span>
      }
    }
  `,
  imports: [NgTemplateOutlet],
  host: {
    class: 'ant-statistic-content-value'
  }
})
export class NzStatisticContentValueComponent implements OnChanges {
  @Input() nzValue?: NzStatisticValueType;
  @Input() nzValueTemplate?: TemplateRef<{ $implicit: NzStatisticValueType }>;

  displayInt = '';
  displayDecimal = '';

  private locale_id = inject(LOCALE_ID);

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
