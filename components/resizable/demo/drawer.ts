import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzResizableModule, NzResizeEvent } from 'ng-zorro-antd/resizable';

@Component({
  selector: 'nz-demo-resizable-drawer',
  imports: [NzButtonModule, NzDrawerModule, NzResizableModule],
  template: `
    <button nz-button nzType="primary" (click)="open()">Open</button>
    <nz-drawer
      [nzClosable]="false"
      [nzVisible]="visible"
      [nzBodyStyle]="{
        padding: 0,
        height: 'calc(100vh - 55px)'
      }"
      [nzWidth]="width"
      nzPlacement="left"
      nzTitle="Resizable Drawer"
      (nzOnClose)="close()"
    >
      <ng-container *nzDrawerContent>
        @if (visible) {
          <div class="drawer-body" nz-resizable nzBounds="window" [nzMinWidth]="256" (nzResize)="onResize($event)">
            <nz-resize-handles [nzDirections]="['right']" />
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </div>
        }
      </ng-container>
    </nz-drawer>
  `,
  styles: `
    .drawer-body {
      width: 100%;
      height: 100%;
      padding: 24px;
    }
  `
})
export class NzDemoResizableDrawerComponent {
  width = 256;
  visible = false;
  id = -1;

  onResize({ width }: NzResizeEvent): void {
    cancelAnimationFrame(this.id);
    this.id = requestAnimationFrame(() => {
      this.width = width!;
    });
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
