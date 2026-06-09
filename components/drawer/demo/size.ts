import { Component, computed, signal } from '@angular/core';

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
      [nzSize]="size()"
      [nzVisible]="visible()"
      nzPlacement="right"
      [nzTitle]="title()"
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
  readonly visible = signal(false);
  readonly size = signal<'large' | 'default'>('default');
  readonly title = computed(() => `${this.size()} Drawer`);

  showDefault(): void {
    this.size.set('default');
    this.open();
  }

  showLarge(): void {
    this.size.set('large');
    this.open();
  }

  open(): void {
    this.visible.set(true);
  }

  close(): void {
    this.visible.set(false);
  }
}
