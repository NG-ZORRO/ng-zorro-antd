import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tooltip-placement',
  template: `
    <div style="margin-left:60px;">
      <button nzTitle="prompt text" nzPlacement="topLeft" nz-button nz-tooltip>TL</button>
      <button nzTitle="prompt text" nzPlacement="top" nz-button nz-tooltip>Top</button>
      <button nzTitle="prompt text" nzPlacement="topRight" nz-button nz-tooltip>TR</button>
    </div>
    <div style="float:left;width: 60px;">
      <button nzTitle="prompt text" nzPlacement="leftTop" nz-button nz-tooltip>LT</button>
      <button nzTitle="prompt text" nzPlacement="left" nz-button nz-tooltip>Left</button>
      <button nzTitle="prompt text" nzPlacement="leftBottom" nz-button nz-tooltip>LB</button>
    </div>
    <div style="margin-left:270px;width: 60px;">
      <button nzTitle="prompt text" nzPlacement="rightTop" nz-button nz-tooltip>RT</button>
      <button nzTitle="prompt text" nzPlacement="right" nz-button nz-tooltip>Right</button>
      <button nzTitle="prompt text" nzPlacement="rightBottom" nz-button nz-tooltip>RB</button>
    </div>
    <div style="margin-left:60px;clear: both;">
      <button nzTitle="prompt text" nzPlacement="bottomLeft" nz-button nz-tooltip>BL</button>
      <button nzTitle="prompt text" nzPlacement="bottom" nz-button nz-tooltip>Bottom</button>
      <button nzTitle="prompt text" nzPlacement="bottomRight" nz-button nz-tooltip>BR</button>
    </div>
  `,
  styles  : [
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
export class NzDemoTooltipPlacementComponent {
}
