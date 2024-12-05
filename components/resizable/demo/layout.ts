import { Component } from '@angular/core';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzResizableModule, NzResizeEvent } from 'ng-zorro-antd/resizable';

@Component({
  selector: 'nz-demo-resizable-layout',
  imports: [NzLayoutModule, NzResizableModule],
  template: `
    <nz-layout>
      <nz-header>Header</nz-header>
      <nz-layout>
        <nz-sider
          [nzWidth]="siderWidth"
          nz-resizable
          [nzMinWidth]="50"
          [nzMaxWidth]="300"
          (nzResize)="onSideResize($event)"
        >
          <nz-resize-handle nzDirection="right" nzCursorType="grid">
            <div class="sider-resize-line"></div>
          </nz-resize-handle>
          Sider
        </nz-sider>
        <nz-content>
          <div
            nz-resizable
            class="resizable-box"
            [style.height.px]="contentHeight"
            [nzMaxHeight]="300"
            [nzMinHeight]="50"
            (nzResize)="onContentResize($event)"
          >
            <nz-resize-handle nzDirection="bottom" nzCursorType="grid">
              <div class="content-resize-line"></div>
            </nz-resize-handle>
            Content 1
          </div>
          <div>Content 2</div>
        </nz-content>
      </nz-layout>
    </nz-layout>
  `,
  styles: [
    `
      nz-header {
        background: #7dbcea;
        color: #fff;
      }
      nz-sider {
        background: #3ba0e9;
        color: #fff;
      }

      nz-sider.nz-resizable-resizing {
        transition: none;
      }

      nz-content {
        display: flex;
        flex-direction: column;
        background: rgba(16, 142, 233, 1);
        height: 350px;
        color: #fff;
      }

      nz-content > div {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
      }

      nz-content .resizable-box {
        flex: none;
      }

      nz-content,
      nz-header,
      ::ng-deep nz-sider > .ant-layout-sider-children {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .sider-resize-line {
        height: 100%;
        width: 5px;
        border-right: 1px solid #e8e8e8;
      }

      .content-resize-line {
        width: 100%;
        height: 5px;
        border-bottom: 1px solid #e8e8e8;
      }
    `
  ]
})
export class NzDemoResizableLayoutComponent {
  siderWidth = 120;
  contentHeight = 200;
  id = -1;

  onSideResize({ width }: NzResizeEvent): void {
    cancelAnimationFrame(this.id);
    this.id = requestAnimationFrame(() => {
      this.siderWidth = width!;
    });
  }

  onContentResize({ height }: NzResizeEvent): void {
    cancelAnimationFrame(this.id);
    this.id = requestAnimationFrame(() => {
      this.contentHeight = height!;
    });
  }
}
