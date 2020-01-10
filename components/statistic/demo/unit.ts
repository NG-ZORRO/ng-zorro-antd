import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-statistic-unit',
  template: `
    <nz-row [nzGutter]="16">
      <nz-col [nzSpan]="12">
        <nz-statistic [nzValue]="1128 | number" [nzTitle]="'Feedback'" [nzPrefix]="prefixTpl"></nz-statistic>
        <ng-template #prefixTpl><i nz-icon nzType="like"></i></ng-template>
      </nz-col>
      <nz-col [nzSpan]="12">
        <nz-statistic [nzValue]="93" [nzTitle]="'Unmerged'" [nzSuffix]="'/ 100'"></nz-statistic>
      </nz-col>
    </nz-row>
  `
})
export class NzDemoStatisticUnitComponent {}
