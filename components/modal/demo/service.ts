import { Component, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalRef, NzModalService, NZ_MODAL_DATA, NzModalModule } from 'ng-zorro-antd/modal';

interface IModalData {
  favoriteLibrary: string;
  favoriteFramework: string;
}

@Component({
  selector: 'nz-demo-modal-service',
  imports: [NzButtonModule, NzModalModule],
  template: `
    <button nz-button nzType="primary" (click)="createModal()">
      <span>String</span>
    </button>

    <button nz-button nzType="primary" (click)="createTplModal(tplTitle, tplContent, tplFooter)">
      <span>Template</span>
    </button>
    <ng-template #tplTitle>
      <span>Title Template</span>
    </ng-template>
    <ng-template #tplContent let-params>
      <p>some contents...</p>
      <p>some contents...</p>
      <p>{{ params?.value }}</p>
    </ng-template>
    <ng-template #tplFooter let-ref="modalRef">
      <button nz-button (click)="ref.destroy()">Destroy</button>
      <button nz-button nzType="primary" (click)="destroyTplModal(ref)" [nzLoading]="tplModalButtonLoading">
        Close after submit
      </button>
    </ng-template>

    <br />
    <br />

    <button nz-button nzType="primary" (click)="createComponentModal()">
      <span>Use Component</span>
    </button>

    <button nz-button nzType="primary" (click)="createCustomButtonModal()">Custom Button</button>

    <br />
    <br />

    <button nz-button nzType="primary" (click)="openAndCloseAll()">Open more modals then close all after 2s</button>
  `,
  styles: [
    `
      button {
        margin-right: 8px;
      }
    `
  ]
})
export class NzDemoModalServiceComponent {
  tplModalButtonLoading = false;
  disabled = false;

  constructor(
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) {}

  createModal(): void {
    this.modal.create({
      nzTitle: 'Modal Title',
      nzContent: 'string, will close after 1 sec',
      nzClosable: false,
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000))
    });
  }

  createTplModal(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>): void {
    this.modal.create({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzFooter: tplFooter,
      nzMaskClosable: false,
      nzClosable: false,
      nzOnOk: () => console.log('Click ok')
    });
  }

  destroyTplModal(modelRef: NzModalRef): void {
    this.tplModalButtonLoading = true;
    setTimeout(() => {
      this.tplModalButtonLoading = false;
      modelRef.destroy();
    }, 1000);
  }

  createComponentModal(): void {
    const modal = this.modal.create<NzModalCustomComponent, IModalData>({
      nzTitle: 'Modal Title',
      nzContent: NzModalCustomComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzData: {
        favoriteLibrary: 'angular',
        favoriteFramework: 'angular'
      },
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      nzFooter: [
        {
          label: 'change component title from outside',
          onClick: componentInstance => {
            componentInstance!.title = 'title in inner component is changed';
          }
        }
      ]
    });
    const instance = modal.getContentComponent();
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modal.afterClose.subscribe(result => console.log('[afterClose] The result is:', result));

    // delay until modal instance created
    setTimeout(() => {
      instance.subtitle = 'sub title is changed';
    }, 2000);
  }

  createCustomButtonModal(): void {
    const modal: NzModalRef = this.modal.create({
      nzTitle: 'custom button demo',
      nzContent: 'pass array of button config to nzFooter to create multiple buttons',
      nzFooter: [
        {
          label: 'Close',
          shape: 'round',
          onClick: () => modal.destroy()
        },
        {
          label: 'Confirm',
          type: 'primary',
          onClick: () => this.modal.confirm({ nzTitle: 'Confirm Modal Title', nzContent: 'Confirm Modal Content' })
        },
        {
          label: 'Change Button Status',
          type: 'primary',
          danger: true,
          loading: false,
          onClick(): void {
            this.loading = true;
            setTimeout(() => (this.loading = false), 1000);
            setTimeout(() => {
              this.loading = false;
              this.disabled = true;
              this.label = 'can not be clicked！';
            }, 2000);
          }
        },
        {
          label: 'async load',
          type: 'dashed',
          onClick: () => new Promise(resolve => setTimeout(resolve, 2000))
        }
      ]
    });
  }

  openAndCloseAll(): void {
    let pos = 0;

    ['create', 'info', 'success', 'error'].forEach(method =>
      // @ts-ignore
      this.modal[method]({
        nzMask: false,
        nzTitle: `Test ${method} title`,
        nzContent: `Test content: <b>${method}</b>`,
        nzStyle: { position: 'absolute', top: `${pos * 70}px`, left: `${pos++ * 300}px` }
      })
    );

    this.modal.afterAllClose.subscribe(() => console.log('afterAllClose emitted!'));

    setTimeout(() => this.modal.closeAll(), 2000);
  }
}

@Component({
  selector: 'nz-modal-custom-component',
  imports: [NzButtonModule],
  template: `
    <div>
      <h2>{{ title }}</h2>
      <h4>{{ subtitle }}</h4>
      <p
        >My favorite framework is {{ nzModalData.favoriteFramework }} and my favorite library is
        {{ nzModalData.favoriteLibrary }}
      </p>
      <p>
        <span>Get Modal instance in component</span>
        <button nz-button [nzType]="'primary'" (click)="destroyModal()">destroy modal in the component</button>
      </p>
    </div>
  `
})
export class NzModalCustomComponent {
  @Input() title?: string;
  @Input() subtitle?: string;

  readonly #modal = inject(NzModalRef);
  readonly nzModalData: IModalData = inject(NZ_MODAL_DATA);

  destroyModal(): void {
    this.#modal.destroy({ data: 'this the result data' });
  }
}
