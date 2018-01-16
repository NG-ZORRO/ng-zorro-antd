import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tooltip-placement',
  template: `
    <div style="margin-left:60px;">
      <nz-tooltip [nzTitle]="'prompt text'" [nzPlacement]="'topLeft'">
        <button nz-button nz-tooltip>TL</button>
      </nz-tooltip>
      <nz-tooltip [nzTitle]="'prompt text'" [nzPlacement]="'top'">
        <button nz-button nz-tooltip>Top</button>
      </nz-tooltip>
      <nz-tooltip [nzTitle]="'prompt text'" [nzPlacement]="'topRight'">
        <button nz-button nz-tooltip>TR</button>
      </nz-tooltip>
    </div>
    <div style="float:left;width: 60px;">
      <nz-tooltip [nzTitle]="'prompt text'" [nzPlacement]="'leftTop'">
        <button nz-button nz-tooltip>LT</button>
      </nz-tooltip>
      <nz-tooltip [nzTitle]="'prompt text'" [nzPlacement]="'left'">
        <button nz-button nz-tooltip>Left</button>
      </nz-tooltip>
      <nz-tooltip [nzTitle]="'prompt text'" [nzPlacement]="'leftBottom'">
        <button nz-button nz-tooltip>LB</button>
      </nz-tooltip>
    </div>
    <div style="margin-left:270px;width: 60px;">
      <nz-tooltip [nzTitle]="'prompt text'" [nzPlacement]="'rightTop'">
        <button nz-button nz-tooltip>RT</button>
      </nz-tooltip>
      <nz-tooltip [nzTitle]="'prompt text'" [nzPlacement]="'right'">
        <button nz-button nz-tooltip>Right</button>
      </nz-tooltip>
      <nz-tooltip [nzTitle]="'prompt text'" [nzPlacement]="'rightBottom'">
        <button nz-button nz-tooltip>RB</button>
      </nz-tooltip>
    </div>
    <div style="margin-left:60px;clear: both;">
      <nz-tooltip [nzTitle]="'prompt text'" [nzPlacement]="'bottomLeft'">
        <button nz-button nz-tooltip>BL</button>
      </nz-tooltip>
      <nz-tooltip [nzTitle]="'prompt text'" [nzPlacement]="'bottom'">
        <button nz-button nz-tooltip>Bottom</button>
      </nz-tooltip>
      <nz-tooltip [nzTitle]="'prompt text'" [nzPlacement]="'bottomRight'">
        <button nz-button nz-tooltip>BR</button>
      </nz-tooltip>
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
