import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-progress-circle-mini',
  template: `
    <nz-progress [ngModel]="75" [nzType]="'circle'" [nzWidth]="80"></nz-progress>
    <nz-progress [ngModel]="70" [nzType]="'circle'" [nzWidth]="80" [nzStatus]="'exception'"></nz-progress>
    <nz-progress [ngModel]="100" [nzType]="'circle'" [nzWidth]="80"></nz-progress>
  `,
  styles  : []
})
export class NzDemoProgressCircleMiniComponent { }
