import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'nz-demo-drawer-basic-right',
  imports: [NzButtonModule, NzDrawerModule],
  template: `
    <button nz-button nzType="primary" (click)="open()">Open</button>
    <nz-drawer
      [nzClosable]="false"
      [nzVisible]="visible"
      nzPlacement="right"
      nzTitle="Basic Drawer"
      (nzOnClose)="close()"
    >
      <ng-container *nzDrawerContent>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </ng-container>
    </nz-drawer>
  `
})
export class NzDemoDrawerBasicRightComponent {
  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
