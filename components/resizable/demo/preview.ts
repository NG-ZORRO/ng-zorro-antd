import { Component } from '@angular/core';

import { NzResizableModule, NzResizeEvent } from 'ng-zorro-antd/resizable';

@Component({
  selector: 'nz-demo-resizable-preview',
  imports: [NzResizableModule],
  template: `
    <div
      class="box"
      nz-resizable
      nzPreview
      (nzResizeEnd)="onResize($event)"
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
export class NzDemoResizablePreviewComponent {
  width = 400;
  height = 200;

  onResize({ width, height }: NzResizeEvent): void {
    this.width = width!;
    this.height = height!;
  }
}
