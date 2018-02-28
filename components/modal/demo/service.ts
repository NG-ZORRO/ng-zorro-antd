/* entryComponents: NzModalCustomComponent */

import { Component, Input, TemplateRef } from '@angular/core';
import { ModalPublicAgent, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-modal-service',
  template: `
    <button nz-button nzType="primary" (click)="createModal()">
      <span>使用文本</span>
    </button>

    <button nz-button nzType="primary" (click)="createTplModal(tplTitle, tplContent, tplFooter)">
      <span>使用模板</span>
    </button>
    <ng-template #tplTitle>
      <span>对话框标题模板</span>
    </ng-template>
    <ng-template #tplContent>
      <p>对话框的内容</p>
      <p>对话框的内容</p>
      <p>对话框的内容</p>
      <p>对话框的内容</p>
      <p>对话框的内容</p>
    </ng-template>
    <ng-template #tplFooter>
      <button nz-button nzType="primary" [nzSize]="'large'" (click)="destroyTplModal()" [nzLoading]="tplModalButtonLoading">提交后关闭</button>
    </ng-template>

    <br /><br />

    <button nz-button nzType="primary" (click)="createComponentModal()">
      <span>使用Component</span>
    </button>

    <button nz-button nzType="primary" (click)="createCustomButtonModal()">使用自定义按钮</button>
  `
})
export class NzDemoModalServiceComponent {
  tplModal: ModalPublicAgent;
  tplModalButtonLoading = false;

  constructor(private modalService: NzModalService) { }

  createModal(): void {
    this.modalService.create({
      nzTitle: '对话框标题',
      nzContent: '纯文本内容，点确认 1 秒后关闭',
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
      nzTitle: '对话框标题',
      nzContent: NzModalCustomComponent,
      nzComponentParams: {
        title: '这是Component内部标题',
        subtitle: '这是Component中的副标题，2秒后会被动态改变'
      },
      nzFooter: [{
        label: '从外部改变Component标题',
        onClick: (componentInstance: NzModalCustomComponent) => {
          componentInstance.title = '内部Component标题被改变啦！！！！！！！！！';
        }
      }],
    });

    // 从外部改变副标题（注：当对话框实例还未初始化完毕时，getContentComponentRef()将返回undefined）
    window.setTimeout(() => {
      const instance = modal.getContentComponentRef().instance as NzModalCustomComponent;
      instance.subtitle = '副标题已改变！！！！！！！！';
    }, 2000);
  }

  createCustomButtonModal(): void {
    const modal = this.modalService.create({
      nzTitle: '自定义按钮举例',
      nzContent: '通过传入按钮配置数组到nzFooter，用于创建多个自定义按钮',
      nzFooter: [
        {
          label: 'X',
          shape: 'circle',
          onClick: () => modal.destroy(),
        },
        {
          label: '弹出确认框',
          type: 'primary',
          onClick: () => this.modalService.confirm({ nzTitle: '确认框标题！', nzContent: '确认框描述' }),
        },
        {
          label: '自动改变按钮状态',
          type: 'danger',
          loading: false,
          onClick(): void { // 注：这里由于要得到this，所以不能用箭头函数
            this.loading = true;
            window.setTimeout(() => this.loading = false, 1000);
            window.setTimeout(() => {
              this.loading = false;
              this.disabled = true;
              this.label = '不能点击了！';
            }, 2000);
          }
        },
        {
          label: '异步加载',
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
        <span>可以在弹出框中的Component内访问到模态框实例</span>
        <button nz-button [nzType]="'primary'" (click)="destroyModal()">从内部销毁模态框</button>
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
