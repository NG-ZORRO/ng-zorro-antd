import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-popover-placement',
  template: `
    <div style="margin-left: 60px">
      <button nz-button nz-popover nzPopoverTitle="Title" [nzPopoverContent]="contentTemplate" nzPopoverPlacement="topLeft">
        TL
      </button>
      <button nz-button nz-popover nzPopoverTitle="Title" [nzPopoverContent]="contentTemplate" nzPopoverPlacement="top">
        Top
      </button>
      <button nz-button nz-popover nzPopoverTitle="Title" [nzPopoverContent]="contentTemplate" nzPopoverPlacement="topRight">
        TR
      </button>
    </div>
    <div style="width: 60px; float: left;">
      <button nz-button nz-popover nzPopoverTitle="Title" [nzPopoverContent]="contentTemplate" nzPopoverPlacement="leftTop">
        LT
      </button>
      <button nz-button nz-popover nzPopoverTitle="Title" [nzPopoverContent]="contentTemplate" nzPopoverPlacement="left">
        Left
      </button>
      <button nz-button nz-popover nzPopoverTitle="Title" [nzPopoverContent]="contentTemplate" nzPopoverPlacement="leftBottom">
        LB
      </button>
    </div>
    <div style="width: 60px; margin-left: 252px;">
      <button nz-button nz-popover nzPopoverTitle="Title" [nzPopoverContent]="contentTemplate" nzPopoverPlacement="rightTop">
        RT
      </button>
      <button nz-button nz-popover nzPopoverTitle="Title" [nzPopoverContent]="contentTemplate" nzPopoverPlacement="right">
        Right
      </button>
      <button nz-button nz-popover nzPopoverTitle="Title" [nzPopoverContent]="contentTemplate" nzPopoverPlacement="rightBottom">
        RB
      </button>
    </div>
    <div style="margin-left: 60px; clear: both;">
      <button nz-button nz-popover nzPopoverTitle="Title" [nzPopoverContent]="contentTemplate" nzPopoverPlacement="bottomLeft">
        BL
      </button>
      <button nz-button nz-popover nzPopoverTitle="Title" [nzPopoverContent]="contentTemplate" nzPopoverPlacement="bottom">
        Bottom
      </button>
      <button nz-button nz-popover nzPopoverTitle="Title" [nzPopoverContent]="contentTemplate" nzPopoverPlacement="bottomRight">
        BR
      </button>
    </div>
    <ng-template #contentTemplate>
      <div>
        <p>Content</p>
        <p>Content</p>
      </div>
    </ng-template>
  `,
  styles: [
    `
      button {
        margin-right: 8px;
        margin-bottom: 8px;
        width: 70px;
        text-align: center;
        padding: 0;
      }
    `
  ]
})
export class NzDemoPopoverPlacementComponent {}
