import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-popover-arrow-point-at-center',
  template: `
    <button nz-button nzPopoverTitle="Title" nzPopoverContent="Content" nzPopoverPlacement="topLeft" nz-popover>
      Align edge / 边缘对齐
    </button>
    <button nz-button nzPopoverTitle="Title" nzPopoverContent="Content" nzPopoverPlacement="topCenter" nz-popover>
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
export class NzDemoPopoverArrowPointAtCenterComponent {}
