import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-drawer-basic-left',
  template: `
    <button nz-button nzType="primary" (click)="open()">Open</button>
    <nz-drawer [nzClosable]="false" [nzVisible]="visible" nzPlacement="left" nzTitle="Basic Drawer" (nzOnClose)="close()">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </nz-drawer>
  `
})

export class NzDemoDrawerBasicLeftComponent {

  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
