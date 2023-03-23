import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-float-button-tooltip',
  template: `
    <div class="tooltip">
      <nz-float-button nz-tooltip nzTooltipTitle="HELP INFO" nzTooltipPlacement="left"></nz-float-button>
    </div>
  `,
  styles: [
    `
      .tooltip {
        height: 300px;
        position: relative;
      }
      nz-float-button {
        position: absolute;
      }
    `
  ]
})
export class NzDemoFloatButtonTooltipComponent {}
