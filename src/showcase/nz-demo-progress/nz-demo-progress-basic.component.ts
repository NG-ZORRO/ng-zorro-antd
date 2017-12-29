import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-progress-basic',
  template: `
    <nz-progress [ngModel]="30"></nz-progress>
    <nz-progress [ngModel]="50" [nzStatus]="'active'"></nz-progress>
    <nz-progress [ngModel]="70" [nzStatus]="'exception'"></nz-progress>
    <nz-progress [ngModel]="100"></nz-progress>
    <nz-progress [ngModel]="50" [nzShowInfo]="false"></nz-progress>
  `,
  styles  : []
})
export class NzDemoProgressBasicComponent { }
