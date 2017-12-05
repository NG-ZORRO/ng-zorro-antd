import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tooltip-position',
  template: `
    <div style="margin-left:60px;">
      <nz-tooltip [nzTitle]="'prompt text'" [nzPlacement]="'topLeft'">
        <a nz-tooltip>TL</a>
      </nz-tooltip>
      <nz-tooltip [nzTitle]="'prompt text'" [nzPlacement]="'top'">
        <a nz-tooltip>Top</a>
      </nz-tooltip>
      <nz-tooltip [nzTitle]="'prompt text'" [nzPlacement]="'topRight'">
        <a nz-tooltip>TR</a>
      </nz-tooltip>
    </div>
    <div style="float:left;width: 60px;">
      <nz-tooltip [nzTitle]="'prompt text'" [nzPlacement]="'leftTop'">
        <a nz-tooltip>LT</a>
      </nz-tooltip>
      <nz-tooltip [nzTitle]="'prompt text'" [nzPlacement]="'left'">
        <a nz-tooltip>Left</a>
      </nz-tooltip>
      <nz-tooltip [nzTitle]="'prompt text'" [nzPlacement]="'leftBottom'">
        <a nz-tooltip>LB</a>
      </nz-tooltip>
    </div>
    <div style="margin-left:270px;width: 60px;">
      <nz-tooltip [nzTitle]="'prompt text'" [nzPlacement]="'rightTop'">
        <a nz-tooltip>RT</a>
      </nz-tooltip>
      <nz-tooltip [nzTitle]="'prompt text'" [nzPlacement]="'right'">
        <a nz-tooltip>Right</a>
      </nz-tooltip>
      <nz-tooltip [nzTitle]="'prompt text'" [nzPlacement]="'rightBottom'">
        <a nz-tooltip>RB</a>
      </nz-tooltip>
    </div>
    <div style="margin-left:60px;clear: both;">
      <nz-tooltip [nzTitle]="'prompt text'" [nzPlacement]="'bottomLeft'">
        <a nz-tooltip>BL</a>
      </nz-tooltip>
      <nz-tooltip [nzTitle]="'prompt text'" [nzPlacement]="'bottom'">
        <a nz-tooltip>Bottom</a>
      </nz-tooltip>
      <nz-tooltip [nzTitle]="'prompt text'" [nzPlacement]="'bottomRight'">
        <a nz-tooltip>BR</a>
      </nz-tooltip>
    </div>
  `,
  styles  : [
      `a {
      display: inline-block;
      line-height: 32px;
      height: 32px;
      width: 60px;
      font-size: 14px;
      text-align: center;
      background: #f5f5f5;
      margin-right: 1em;
      margin-bottom: 1em;
      border-radius: 6px;
    }`
  ]
})
export class NzDemoTooltipPositionComponent { }
