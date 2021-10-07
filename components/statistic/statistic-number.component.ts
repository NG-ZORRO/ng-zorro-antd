/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { getLocaleNumberSymbol, NumberSymbol } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  NgZone,
  LOCALE_ID,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { CountUp } from 'countup.js';

import { InputBoolean } from 'ng-zorro-antd/core/util';

import { NzStatisticValueType } from './typings';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  selector: 'nz-statistic-number',
  exportAs: 'nzStatisticNumber',
  template: `
    <span class="ant-statistic-content-value">
      <ng-container
        *ngIf="nzValueTemplate"
        [ngTemplateOutlet]="nzValueTemplate"
        [ngTemplateOutletContext]="{ $implicit: nzValue }"
      ></ng-container>
      <ng-container *ngIf="!nzValueTemplate">
        <span *ngIf="displayInt" class="ant-statistic-content-value-int">{{ displayInt }}</span>
        <span *ngIf="displayDecimal" class="ant-statistic-content-value-decimal">{{ displayDecimal }}</span>
      </ng-container>
    </span>
  `
})
export class NzStatisticNumberComponent implements OnChanges {
  @Input() nzValue?: NzStatisticValueType;
  @Input() nzValueTemplate?: TemplateRef<{ $implicit: NzStatisticValueType }>;
  @Input() @InputBoolean() nzCountUp: boolean = false;
  @Output() readonly countUpFinish = new EventEmitter<void>();

  displayInt = '';
  displayDecimal = '';
  countUp?: CountUp;

  constructor(@Inject(LOCALE_ID) private locale_id: string, private el: ElementRef, private zone: NgZone) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.formatNumber();
    if (this.nzCountUp && changes.nzValue && changes.nzValue.currentValue !== undefined) {
      this.nzValue = Number(this.nzValue?.toString().replace(/,/g, ''));
      this.countUp = new CountUp(this.el.nativeElement, this.nzValue);
      this.animate();
    }
  }

  private formatNumber(): void {
    const decimalSeparator: string =
      typeof this.nzValue === 'number' ? '.' : getLocaleNumberSymbol(this.locale_id, NumberSymbol.Decimal);
    const value = String(this.nzValue);
    const [int, decimal] = value.split(decimalSeparator);

    this.displayInt = int;
    this.displayDecimal = decimal ? `${decimalSeparator}${decimal}` : '';
  }

  private animate() {
    this.zone.runOutsideAngular(() => {
      this.countUp?.reset();
      this.countUp?.start(() => {
        this.zone.run(() => {
          this.countUpFinish.emit();
        });
      });
    });
  }
}
