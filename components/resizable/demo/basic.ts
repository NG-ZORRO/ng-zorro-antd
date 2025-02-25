import { Component } from '@angular/core';

import { NzResizableModule, NzResizeDirection, NzResizeEvent } from 'ng-zorro-antd/resizable';

@Component({
  selector: 'nz-demo-resizable-basic',
  imports: [NzResizableModule],
  template: `
    <div
      class="box"
      nz-resizable
      [nzMaxWidth]="600"
      [nzMinWidth]="80"
      [nzMaxHeight]="200"
      [nzMinHeight]="80"
      [nzDisabled]="disabled"
      [style.height.px]="height"
      [style.width.px]="width"
      (nzResize)="onResize($event)"
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
export class NzDemoResizableBasicComponent {
  width = 400;
  height = 200;
  id = -1;
  disabled = false;
  resizeDirection: NzResizeDirection | null = null;

  onResize({ width, height, direction }: NzResizeEvent): void {
    cancelAnimationFrame(this.id);
    this.id = requestAnimationFrame(() => {
      this.width = width!;
      this.height = height!;
      this.resizeDirection = direction!;
    });
  }
}
