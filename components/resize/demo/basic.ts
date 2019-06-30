import { Component } from '@angular/core';
import { NzResizePosition } from 'ng-zorro-antd/resize';

@Component({
  selector: 'nz-demo-resize-basic',
  template: `
    <div class="horizontal-box" #base>
      <div class="left-content" [style.width.px]="left">Left</div>
      <div class="right-content">Right</div>
      <nz-resize [nzLeft]="left" [nzBaseElement]="base" (nzResizeChange)="onResizeChange($event)"> </nz-resize>
    </div>
  `,
  styles: [
    `
      .horizontal-box {
        display: flex;
        height: 300px;
        position: relative;
        flex-direction: row;
      }

      .left-content,
      .right-content {
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;
        color: white;
      }

      .left-content {
        flex-grow: 0;
        background-color: rgba(16, 142, 233, 1);
      }

      .right-content {
        flex-grow: 1;
        background-color: #7dbcea;
      }
    `
  ]
})
export class NzDemoResizeBasicComponent {
  left = 60;

  onResizeChange(pos: Required<NzResizePosition>): void {
    this.left = pos.left;
  }
}
