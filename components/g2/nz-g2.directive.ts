/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { Chart, ChartProps } from '@antv/g2';
import { inNextTick } from 'ng-zorro-antd/core';

@Directive({
  selector: 'div[nzG2], div[nz-g2]',
  exportAs: 'nzG2',
  host: {
    '[class.ant-g2]': 'true'
  }
})
export class NzG2Directive implements AfterViewInit {
  @Input() nzChartOptions: Partial<ChartProps>;

  @Output() readonly nzChartInitialized = new EventEmitter<Chart>();

  chartInstance: Chart;

  private el: HTMLDivElement;

  constructor(elementRef: ElementRef, private ngZone: NgZone) {
    this.el = elementRef.nativeElement;
  }

  ngAfterViewInit(): void {
    inNextTick().subscribe(() => {
      this.createChartInstance();
    });
  }

  private createChartInstance(): void {
    this.ngZone.runOutsideAngular(() => {
      this.chartInstance = new Chart({
        container: this.el,
        forceFit: true,
        ...this.nzChartOptions
      });
      this.nzChartInitialized.next(this.chartInstance);
    });
  }
}
