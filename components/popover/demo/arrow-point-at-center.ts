import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

@Component({
  selector: 'nz-demo-popover-arrow-point-at-center',
  standalone: true,
  imports: [NzButtonModule, NzPopoverModule, NzNoAnimationModule],
  template: `
    <button nz-button nzPopoverTitle="Title" nzPopoverContent="Content" nzPopoverPlacement="topLeft" nz-popover>
      Align edge / 边缘对齐
    </button>
    <button
      nz-button
      nz-popover
      nzPopoverTitle="Title"
      nzPopoverContent="Content"
      nzPopoverPlacement="topLeft"
      [nzPopoverArrowPointAtCenter]="true"
      nzNoAnimation
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
export class NzDemoPopoverArrowPointAtCenterComponent {}
