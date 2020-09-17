import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-pipes-aggregate',
  template: `
    <nz-row [nzGutter]="16">
      <nz-col [nzSpan]="6">
        <nz-statistic [nzValue]="[7, 8, 2, 3] | nzAggregate: 'max'" [nzTitle]="'Max [7, 8, 2, 3]'"></nz-statistic>
      </nz-col>
      <nz-col [nzSpan]="6">
        <nz-statistic [nzValue]="[7, 8, 2, 3] | nzAggregate: 'min'" [nzTitle]="'Min [7, 8, 2, 3]'"></nz-statistic>
      </nz-col>
      <nz-col [nzSpan]="6">
        <nz-statistic [nzValue]="[7, 8, 2, 3] | nzAggregate: 'sum'" [nzTitle]="'Sum [7, 8, 2, 3]'"></nz-statistic>
      </nz-col>
      <nz-col [nzSpan]="6">
        <nz-statistic [nzValue]="[7, 8, 2, 3] | nzAggregate: 'avg'" [nzTitle]="'Avg [7, 8, 2, 3]'"></nz-statistic>
      </nz-col>
    </nz-row>
  `
})
export class NzDemoPipesAggregateComponent {}
