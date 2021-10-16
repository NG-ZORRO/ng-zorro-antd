import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tooltip-arrow-point-at-center',
  template: `
    <button nz-button nzTooltipTitle="prompt text" nzTooltipPlacement="topLeft" nz-tooltip>
      Align edge / 边缘对齐
    </button>
    <button
      nz-button
      nz-tooltip
      nzTooltipTitle="prompt text"
      nzTooltipPlacement="topLeft"
      [nzTooltipArrowPointAtCenter]="true"
    >
      Arrow points to center / 箭头指向中心
    </button>
  `,
  styles: [
    `
      button {
        margin-right: 8px;
        margin-bottom: 8px;
      }
    `
  ]
})
export class NzDemoTooltipArrowPointAtCenterComponent {}
