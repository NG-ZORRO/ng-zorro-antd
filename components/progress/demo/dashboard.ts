import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-progress-dashboard',
  template: `
    <nz-progress [nzPercent]="75" nzType="dashboard"></nz-progress>
  `
})
export class NzDemoProgressDashboardComponent {}
