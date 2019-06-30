import { Component } from '@angular/core';
import { NzResizePosition } from 'ng-zorro-antd/resize';

@Component({
  selector: 'nz-demo-resize-horizontal',
  template: `
    <div class="horizontal-box" #base>
      <div class="top-content" [style.height.px]="top">Top</div>
      <div class="bottom-content">Bottom</div>
      <nz-resize
        [nzTop]="top"
        [nzMode]="'horizontal'"
        [nzMax]="200"
        [nzBaseElement]="base"
        (nzResizeChange)="onResizeChange($event)"
      >
      </nz-resize>
    </div>
  `,
  styles: [
    `
      .horizontal-box {
        display: flex;
        height: 300px;
        position: relative;
        flex-direction: column;
      }

      .top-content,
      .bottom-content {
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
      }

      .top-content {
        flex-grow: 0;
        background-color: rgba(16, 142, 233, 1);
      }

      .bottom-content {
        flex-grow: 1;
        background-color: #7dbcea;
      }
    `
  ]
})
export class NzDemoResizeHorizontalComponent {
  top = 60;

  onResizeChange(pos: Required<NzResizePosition>): void {
    this.top = pos.top;
  }
}
