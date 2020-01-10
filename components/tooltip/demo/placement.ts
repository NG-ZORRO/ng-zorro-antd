import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tooltip-placement',
  template: `
    <div style="margin-left:60px;">
      <button nzTooltipTitle="prompt text" nzTooltipPlacement="topLeft" nz-button nz-tooltip>TL</button>
      <button nzTooltipTitle="prompt text" nzTooltipPlacement="top" nz-button nz-tooltip>Top</button>
      <button nzTooltipTitle="prompt text" nzTooltipPlacement="topRight" nz-button nz-tooltip>TR</button>
    </div>
    <div style="float:left;width: 60px;">
      <button nzTooltipTitle="prompt text" nzTooltipPlacement="leftTop" nz-button nz-tooltip>LT</button>
      <button nzTooltipTitle="prompt text" nzTooltipPlacement="left" nz-button nz-tooltip>Left</button>
      <button nzTooltipTitle="prompt text" nzTooltipPlacement="leftBottom" nz-button nz-tooltip>LB</button>
    </div>
    <div style="margin-left:270px;width: 60px;">
      <button nzTooltipTitle="prompt text" nzTooltipPlacement="rightTop" nz-button nz-tooltip>RT</button>
      <button nzTooltipTitle="prompt text" nzTooltipPlacement="right" nz-button nz-tooltip>Right</button>
      <button nzTooltipTitle="prompt text" nzTooltipPlacement="rightBottom" nz-button nz-tooltip>RB</button>
    </div>
    <div style="margin-left:60px;clear: both;">
      <button nzTooltipTitle="prompt text" nzTooltipPlacement="bottomLeft" nz-button nz-tooltip>BL</button>
      <button nzTooltipTitle="prompt text" nzTooltipPlacement="bottom" nz-button nz-tooltip>Bottom</button>
      <button nzTooltipTitle="prompt text" nzTooltipPlacement="bottomRight" nz-button nz-tooltip>BR</button>
    </div>
  `,
  styles: [
    `
      button {
        width: 70px;
        text-align: center;
        padding: 0;
        margin-right: 8px;
        margin-bottom: 8px;
      }
    `
  ]
})
export class NzDemoTooltipPlacementComponent {}
