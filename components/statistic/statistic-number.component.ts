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
  preserveWhitespaces: false,
  selector: 'nz-statistic-number',
  exportAs: 'nzStatisticNumber',
  template: `
    <span class="ant-statistic-content-value">
      @if (nzValueTemplate) {
        <ng-container
          [ngTemplateOutlet]="nzValueTemplate"
          [ngTemplateOutletContext]="{ $implicit: nzValue }"
        ></ng-container>
      } @else {
        @if (displayInt) {
          <span class="ant-statistic-content-value-int">{{ displayInt }}</span>
        }
        @if (displayDecimal) {
          <span class="ant-statistic-content-value-decimal">{{ displayDecimal }}</span>
        }
      }
    </span>
  `,
  imports: [NgTemplateOutlet],
  standalone: true
})
export class NzStatisticNumberComponent implements OnChanges {
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
