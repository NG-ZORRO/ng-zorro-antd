import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-switch-text',
  template: `
    <nz-switch [ngModel]="true">
      <i class=" anticon anticon-check" checked></i>
      <i class=" anticon anticon-cross" unchecked></i>
    </nz-switch>
    <div style="margin-top:8px;">
      <nz-switch [ngModel]="false">
        <span checked>开</span>
        <span unchecked>关</span>
      </nz-switch>
    </div>
  `,
  styles  : []
})
export class NzDemoSwitchTextComponent { }
