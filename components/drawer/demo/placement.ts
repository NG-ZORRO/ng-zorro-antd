import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule, NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { NzRadioModule } from 'ng-zorro-antd/radio';

@Component({
  selector: 'nz-demo-drawer-placement',
  imports: [FormsModule, NzButtonModule, NzDrawerModule, NzRadioModule],
  template: `
    <nz-radio-group [(ngModel)]="placement">
      <label nz-radio nzValue="top">top</label>
      <label nz-radio nzValue="right">right</label>
      <label nz-radio nzValue="bottom">bottom</label>
      <label nz-radio nzValue="left">left</label>
    </nz-radio-group>
    <button nz-button nzType="primary" (click)="open()">Open</button>
    <nz-drawer
      [nzClosable]="false"
      [nzVisible]="visible"
      [nzPlacement]="placement"
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
export class NzDemoDrawerPlacementComponent {
  visible = false;
  placement: NzDrawerPlacement = 'left';
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
