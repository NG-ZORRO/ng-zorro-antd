import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-drawer-placement',
  template: `
    <nz-radio-group [(ngModel)]="placement">
      <label nz-radio nzValue="top">top</label>
      <label nz-radio nzValue="right">right</label>
      <label nz-radio nzValue="bottom">bottom</label>
      <label nz-radio nzValue="left">left</label>
    </nz-radio-group>
    <button nz-button nzType="primary" (click)="open()">Open</button>
    <nz-drawer [nzClosable]="false" [nzVisible]="visible" [nzPlacement]="placement" nzTitle="Basic Drawer" (nzOnClose)="close()">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </nz-drawer>
  `
})
export class NzDemoDrawerPlacementComponent {
  visible = false;
  placement = 'left';
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
