import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-switch-loading',
  template: `
    <nz-switch [ngModel]="true" nzLoading></nz-switch>
    <div style="margin-top:8px;">
      <nz-switch [nzSize]="'small'" [ngModel]="false" nzLoading></nz-switch>
    </div>
  `,
  styles  : []
})
export class NzDemoSwitchLoadingComponent { }
