import { Component, signal } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFlexModule } from 'ng-zorro-antd/flex';

@Component({
  selector: 'nz-demo-drawer-extra',
  imports: [NzButtonModule, NzDrawerModule, NzFlexModule],
  template: `
    <button nz-button nzType="primary" (click)="open()">Open</button>
    <nz-drawer
      [nzClosable]="false"
      nzPlacement="right"
      nzTitle="Basic Drawer"
      (nzOnClose)="close()"
      [nzVisible]="visible()"
      [nzExtra]="extra"
    >
      <ng-container *nzDrawerContent>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </ng-container>

      <ng-template #extra>
        <div nz-flex nzGap="small">
          <button nz-button nzType="primary" (click)="close()">OK</button>
          <button nz-button nzType="default" (click)="close()">Cancel</button>
        </div>
      </ng-template>
    </nz-drawer>
  `
})
export class NzDemoDrawerExtraComponent {
  readonly visible = signal(false);

  open(): void {
    this.visible.set(true);
  }

  close(): void {
    this.visible.set(false);
  }
}
