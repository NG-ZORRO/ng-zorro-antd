import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-popover-placement',
  template: `
    <div style="margin-left: 60px">
      <button nz-button nz-popover nzTitle="Title" [nzContent]="contentTemplate" nzPlacement="topLeft">TL</button>
      <button nz-button nz-popover nzTitle="Title" [nzContent]="contentTemplate" nzPlacement="top">Top</button>
      <button nz-button nz-popover nzTitle="Title" [nzContent]="contentTemplate" nzPlacement="topRight">TR</button>
    </div>
    <div style="width: 60px; float: left;">
      <button nz-button nz-popover nzTitle="Title" [nzContent]="contentTemplate" nzPlacement="leftTop">LT</button>
      <button nz-button nz-popover nzTitle="Title" [nzContent]="contentTemplate" nzPlacement="left">Left</button>
      <button nz-button nz-popover nzTitle="Title" [nzContent]="contentTemplate" nzPlacement="leftBottom">LB</button>
    </div>
    <div style="width: 60px; margin-left: 252px;">
      <button nz-button nz-popover nzTitle="Title" [nzContent]="contentTemplate" nzPlacement="rightTop">RT</button>
      <button nz-button nz-popover nzTitle="Title" [nzContent]="contentTemplate" nzPlacement="right">Right</button>
      <button nz-button nz-popover nzTitle="Title" [nzContent]="contentTemplate" nzPlacement="rightBottom">RB</button>
    </div>
    <div style="margin-left: 60px; clear: both;">
      <button nz-button nz-popover nzTitle="Title" [nzContent]="contentTemplate" nzPlacement="bottomLeft">BL</button>
      <button nz-button nz-popover nzTitle="Title" [nzContent]="contentTemplate" nzPlacement="bottom">Bottom</button>
      <button nz-button nz-popover nzTitle="Title" [nzContent]="contentTemplate" nzPlacement="bottomRight">BR</button>
    </div>
    <ng-template #contentTemplate>
      <div>
        <p>Content</p>
        <p>Content</p>
      </div>
    </ng-template>
  `,
  styles  : [ `
    button {
      margin-right: 8px;
      margin-bottom: 8px;
      width: 70px;
      text-align: center;
      padding: 0;
    }
  ` ]
})

export class NzDemoPopoverPlacementComponent {
}
