import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-progress-dashboard',
  template: `
    <nz-progress [ngModel]="75" [nzType]="'dashboard'"></nz-progress>
  `,
  styles  : []
})
export class NzDemoProgressDashboardComponent { }
