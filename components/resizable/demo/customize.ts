import { Component } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzResizableModule, NzResizeEvent } from 'ng-zorro-antd/resizable';

@Component({
  selector: 'nz-demo-resizable-customize',
  imports: [NzIconModule, NzResizableModule],
  template: `
    <div class="box" nz-resizable (nzResize)="onResize($event)" [style.height.px]="height" [style.width.px]="width">
      content
      <nz-resize-handle nzDirection="bottomRight">
        <nz-icon class="bottom-right" nzType="caret-up" nzTheme="outline" [nzRotate]="135" />
      </nz-resize-handle>
      <nz-resize-handle nzDirection="right">
        <div class="right-wrap">
          <nz-icon class="right" nzType="more" nzTheme="outline" />
        </div>
      </nz-resize-handle>
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

    .bottom-right {
      position: absolute;
      top: 0;
      left: 0;
    }

    .right-wrap {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .right {
      background: #fff;
      border: 1px solid #ddd;
      text-align: center;
      font-size: 12px;
      height: 20px;
      line-height: 20px;
    }
  `
})
export class NzDemoResizableCustomizeComponent {
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
