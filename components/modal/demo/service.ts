/* entryComponents: NzModalCustomComponent */

import { Component, Input, TemplateRef } from '@angular/core';
import { ModalPublicAgent, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-modal-service',
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
    <ng-template #tplContent>
      <p>some contents...</p>
      <p>some contents...</p>
      <p>some contents...</p>
      <p>some contents...</p>
      <p>some contents...</p>
    </ng-template>
    <ng-template #tplFooter>
      <button nz-button nzType="primary" (click)="destroyTplModal()" [nzLoading]="tplModalButtonLoading">Close after submit</button>
    </ng-template>

    <br /><br />

    <button nz-button nzType="primary" (click)="createComponentModal()">
      <span>Use Component</span>
    </button>

    <button nz-button nzType="primary" (click)="createCustomButtonModal()">Custom Button</button>
  `
})
export class NzDemoModalServiceComponent {
  tplModal: ModalPublicAgent;
  tplModalButtonLoading = false;

  constructor(private modalService: NzModalService) { }

  createModal(): void {
    this.modalService.create({
      nzTitle: 'Modal Title',
      nzContent: 'string, will close after 1 sec',
      nzClosable: false,
      nzOnOk: () => new Promise((resolve) => window.setTimeout(resolve, 1000))
    });
  }

  createTplModal(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>): void {
    this.tplModal = this.modalService.create({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzFooter: tplFooter,
      nzMaskClosable: false,
      nzClosable: false,
      nzOnOk: () => console.log('Click ok')
    });
  }

  destroyTplModal(): void {
    this.tplModalButtonLoading = true;
    window.setTimeout(() => {
      this.tplModalButtonLoading = false;
      this.tplModal.destroy();
    }, 1000);
  }

  createComponentModal(): void {
    const modal = this.modalService.create({
      nzTitle: 'Modal Title',
      nzContent: NzModalCustomComponent,
      nzComponentParams: {
        title: 'title in component',
        subtitle: 'component sub title，will be changed after 2 sec'
      },
      nzFooter: [{
        label: 'change component tilte from outside',
        onClick: (componentInstance: NzModalCustomComponent) => {
          componentInstance.title = 'title in inner component is changed';
        }
      }]
    });

    // delay until modal instance created
    window.setTimeout(() => {
      const instance = modal.getContentComponentRef().instance as NzModalCustomComponent;
      instance.subtitle = 'sub title is changed';
    }, 2000);
  }

  createCustomButtonModal(): void {
    const modal = this.modalService.create({
      nzTitle: 'custom button demo',
      nzContent: 'pass array of button config to nzFooter to create multiple buttons',
      nzFooter: [
        {
          label: 'Close',
          shape: 'default',
          onClick: () => modal.destroy()
        },
        {
          label: 'Confirm',
          type: 'primary',
          onClick: () => this.modalService.confirm({ nzTitle: 'Confirm Modal Title', nzContent: 'Confirm Modal Content' })
        },
        {
          label: 'Change Button Status',
          type: 'danger',
          loading: false,
          onClick(): void {
            this.loading = true;
            window.setTimeout(() => this.loading = false, 1000);
            window.setTimeout(() => {
              this.loading = false;
              this.disabled = true;
              this.label = 'can not be clicked！';
            }, 2000);
          }
        },
        {
          label: 'async load',
          type: 'dashed',
          onClick: () => new Promise(resolve => window.setTimeout(resolve, 2000))
        }
      ]
    });
  }
}

@Component({
  selector: 'nz-modal-custom-component',
  template: `
    <div>
      <h2>{{ title }}</h2>
      <h4>{{ subtitle }}</h4>
      <p>
        <span>Get Modal instance in component</span>
        <button nz-button [nzType]="'primary'" (click)="destroyModal()">destroy modal in the component</button>
      </p>
    </div>
  `
})
export class NzModalCustomComponent {
  @Input() title: string;
  @Input() subtitle: string;

  constructor(private modal: ModalPublicAgent) { }

  destroyModal(): void {
    this.modal.destroy();
  }
}
