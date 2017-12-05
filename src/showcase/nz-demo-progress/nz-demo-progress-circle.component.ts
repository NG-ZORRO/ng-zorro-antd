import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-progress-circle',
  template: `
    <nz-progress [ngModel]="75" [nzType]="'circle'"></nz-progress>
    <nz-progress [ngModel]="70" [nzType]="'circle'" [nzStatus]="'exception'"></nz-progress>
    <nz-progress [ngModel]="100" [nzType]="'circle'"></nz-progress>
  `,
  styles  : []
})
export class NzDemoProgressCircleComponent { }
