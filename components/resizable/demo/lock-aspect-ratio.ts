import { Component, signal } from '@angular/core';

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
      [style.height.px]="height()"
      [style.width.px]="width()"
    >
      <nz-resize-handles />
      content
    </div>
  `,
  styles: `
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
})
export class NzDemoResizableLockAspectRatioComponent {
  readonly width = signal(400);
  readonly height = signal(200);
  id = -1;

  onResize({ width, height }: NzResizeEvent): void {
    cancelAnimationFrame(this.id);
    this.id = requestAnimationFrame(() => {
      this.width.set(width!);
      this.height.set(height!);
    });
  }
}
