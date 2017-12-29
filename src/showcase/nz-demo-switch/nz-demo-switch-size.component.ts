import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-switch-size',
  template: `
    <nz-switch [ngModel]="true"></nz-switch>
    <div style="margin-top:8px;">
      <nz-switch [nzSize]="'small'" [ngModel]="false"></nz-switch>
    </div>
  `,
  styles  : []
})
export class NzDemoSwitchSizeComponent { }
