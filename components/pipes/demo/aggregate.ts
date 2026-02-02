import { Component } from '@angular/core';

import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzAggregatePipe } from 'ng-zorro-antd/pipes';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';

@Component({
  selector: 'nz-demo-pipes-aggregate',
  imports: [NzGridModule, NzStatisticModule, NzAggregatePipe],
  template: `
    <nz-row [nzGutter]="16">
      <nz-col [nzSpan]="6">
        <nz-statistic [nzValue]="[7, 8, 2, 3] | nzAggregate: 'max'" nzTitle="Max [7, 8, 2, 3]" />
      </nz-col>
      <nz-col [nzSpan]="6">
        <nz-statistic [nzValue]="[7, 8, 2, 3] | nzAggregate: 'min'" nzTitle="Min [7, 8, 2, 3]" />
      </nz-col>
      <nz-col [nzSpan]="6">
        <nz-statistic [nzValue]="[7, 8, 2, 3] | nzAggregate: 'sum'" nzTitle="Sum [7, 8, 2, 3]" />
      </nz-col>
      <nz-col [nzSpan]="6">
        <nz-statistic [nzValue]="[7, 8, 2, 3] | nzAggregate: 'avg'" nzTitle="Avg [7, 8, 2, 3]" />
      </nz-col>
    </nz-row>
  `
})
export class NzDemoPipesAggregateComponent {}
