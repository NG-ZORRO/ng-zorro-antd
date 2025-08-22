import { Component, inject } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'nz-demo-modal-loading',
  imports: [NzButtonModule, NzModalModule, NzFlexModule],
  template: `
    <div nz-flex nzWrap="wrap" [nzGap]="8">
      <button nz-button nzType="primary" (click)="openBasicModal()">
        <span>Open Modal</span>
      </button>
      <button nz-button nzType="primary" (click)="openComponentModal()">Open with service</button>
    </div>

    <nz-modal
      [nzVisible]="open"
      nzTitle="Loading Modal"
      [nzFooter]="footerTpl"
      [nzLoading]="loading"
      (nzOnCancel)="open = false"
    >
      <ng-container *nzModalContent>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </ng-container>
    </nz-modal>

    <ng-template #footerTpl>
      <button nz-button nzType="primary" (click)="showLoading()">Reload</button>
    </ng-template>
  `
})
export class NzDemoModalLoadingComponent {
  private readonly nzModalService = inject(NzModalService);
  open = false;
  loading = true;

  openBasicModal(): void {
    this.open = true;
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  openComponentModal(): void {
    const modalRef = this.nzModalService.create<NzModalCustomComponent>({
      nzTitle: 'Modal Title',
      nzContent: NzModalCustomComponent,
      nzLoading: true
    });

    setTimeout(() => {
      modalRef.updateConfig({ nzLoading: false });
    }, 2000);
  }

  showLoading(): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }
}

@Component({
  selector: 'nz-modal-custom-component',
  imports: [NzButtonModule],
  template: `
    <div>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </div>
  `
})
export class NzModalCustomComponent {}
