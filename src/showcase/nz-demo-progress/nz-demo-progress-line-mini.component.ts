import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-progress-line-mini',
  template: `
    <div style="width: 170px;">
      <nz-progress [ngModel]="30" [nzStrokeWidth]="5"></nz-progress>
      <nz-progress [ngModel]="50" [nzStrokeWidth]="5" [nzStatus]="'active'"></nz-progress>
      <nz-progress [ngModel]="70" [nzStrokeWidth]="5" [nzStatus]="'exception'"></nz-progress>
      <nz-progress [ngModel]="100" [nzStrokeWidth]="5"></nz-progress>
      <nz-progress [ngModel]="50" [nzStrokeWidth]="5" [nzShowInfo]="false"></nz-progress>
    </div>
  `,
  styles  : []
})
export class NzDemoProgressLineMiniComponent { }
