import { Component } from '@angular/core';

import { NzResizableModule, NzResizeEvent } from 'ng-zorro-antd/resizable';

@Component({
  selector: 'nz-demo-resizable-lock-aspect-ratio',
  imports: [NzResizableModule],
  template: `
    <div
      class="box"
      nz-resizable
      nzLockAspectRatio
      (nzResize)="onResize($event)"
      [style.height.px]="height"
      [style.width.px]="width"
    >
      <nz-resize-handles></nz-resize-handles>
      content
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 200px;
      }
      .box {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #eee;
        border: 1px solid #ddd;
      }
    `
  ]
})
export class NzDemoResizableLockAspectRatioComponent {
  width = 400;
  height = 200;
  id = -1;

  onResize({ width, height }: NzResizeEvent): void {
    cancelAnimationFrame(this.id);
    this.id = requestAnimationFrame(() => {
      this.width = width!;
      this.height = height!;
    });
  }
}
