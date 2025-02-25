import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'nz-demo-drawer-size',
  imports: [NzButtonModule, NzDrawerModule, NzSpaceModule],
  template: `
    <nz-space>
      <button *nzSpaceItem nz-button nzType="primary" (click)="showDefault()">Open Default Size (378px)</button>
      <button *nzSpaceItem nz-button nzType="primary" (click)="showLarge()">Open Large Size (736px)</button>
    </nz-space>
    <nz-drawer
      [nzSize]="size"
      [nzVisible]="visible"
      nzPlacement="right"
      [nzTitle]="title"
      [nzExtra]="extra"
      (nzOnClose)="close()"
    >
      <ng-container *nzDrawerContent>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </ng-container>
    </nz-drawer>
    <ng-template #extra>
      <button nz-button nzType="default" (click)="close()">Cancel</button>
      &nbsp;
      <button nz-button nzType="primary" (click)="close()">OK</button>
    </ng-template>
  `
})
export class NzDemoDrawerSizeComponent {
  visible = false;
  size: 'large' | 'default' = 'default';

  get title(): string {
    return `${this.size} Drawer`;
  }

  showDefault(): void {
    this.size = 'default';
    this.open();
  }

  showLarge(): void {
    this.size = 'large';
    this.open();
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
