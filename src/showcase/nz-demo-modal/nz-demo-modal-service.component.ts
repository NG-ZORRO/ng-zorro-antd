import { Component } from '@angular/core';
import { NzModalService } from '../../../index.showcase';

import { NzModalCustomizeComponent } from './nz-modal-customize.component';

@Component({
  selector: 'nz-demo-modal-service',
  template: `
    <button nz-button [nzType]="'primary'" (click)="showModal()">
      <span>使用文本</span>
    </button>
    <button nz-button [nzType]="'primary'" (click)="showModalForTemplate(title, content, footer)">
      <span>使用模板</span>
    </button>
    <ng-template #title>
      <span>对话框标题模板</span>
    </ng-template>
    <ng-template #content>
      <div>
        <p>对话框的内容</p>
        <p>对话框的内容</p>
        <p>对话框的内容</p>
        <p>对话框的内容</p>
        <p>对话框的内容</p>
      </div>
    </ng-template>
    <ng-template #footer>
      <div>
        <button nz-button [nzType]="'primary'" [nzSize]="'large'" (click)="handleOk($event)" [nzLoading]="isConfirmLoading">
          提 交
        </button>
      </div>
    </ng-template>
    <button nz-button [nzType]="'primary'" (click)="showModalForComponent()">
      <span>使用Component</span>
    </button>
  `
})
export class NzDemoModalServiceComponent {

  currentModal;
  isConfirmLoading = false;

  constructor(private modalService: NzModalService) {
  }

  showModal() {
    const modal = this.modalService.open({
      title   : '对话框标题',
      content : '纯文本内容，点确认 1 秒后关闭',
      closable: false,
      showConfirmLoading: true,
      onOk() {
        return new Promise((resolve) => {
          setTimeout(resolve, 1000);
        });
      },
      onCancel() {
      }
    });
  }

  showModalForTemplate(titleTpl, contentTpl, footerTpl) {
    this.currentModal = this.modalService.open({
      title       : titleTpl,
      content     : contentTpl,
      footer      : footerTpl,
      maskClosable: false,
      onOk() {
        console.log('Click ok');
      }
    });
  }

  showModalForComponent() {
    const subscription = this.modalService.open({
      title          : '对话框标题',
      content        : NzModalCustomizeComponent,
      onOk() {
      },
      onCancel() {
        console.log('Click cancel');
      },
      footer         : false,
      componentParams: {
        name: '测试渲染Component'
      }
    });
    subscription.subscribe(result => {
      console.log(result);
    })
  }

  handleOk(e) {
    this.isConfirmLoading = true;
    setTimeout(() => {
      /* destroy方法可以传入onOk或者onCancel。默认是onCancel */
      this.currentModal.destroy('onOk');
      this.isConfirmLoading = false;
      this.currentModal = null;
    }, 1000);
  }

}


/* 用户自定义的component NzDemoComponent的代码如下

import { Component, Input, OnInit } from '@angular/core';
import { NzModalSubject } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-component',
  template: `
    <div>
      <h4>{{_name}}</h4>
      <br/>
      <p>可以通过Subject传递数据</p>
      <div class="customize-footer">
        <button nz-button [nzType]="'primary'" [nzSize]="'large'" (click)="emitDataOutside($event)">
          传递数据到上层
        </button>
        <button nz-button [nzType]="'default'" [nzSize]="'large'" (click)="handleCancel($event)">
          返 回
        </button>
      </div>
    </div>
  `,
  styles  : [
      `
      :host ::ng-deep .customize-footer {
        border-top: 1px solid #e9e9e9;
        padding: 10px 18px 0 10px;
        text-align: right;
        border-radius: 0 0 0px 0px;
        margin: 15px -16px -5px -16px;
      }
    `
  ]
})
export class NzModalCustomizeComponent implements OnInit {
  _name: string;

  @Input()
  set name(value: string) {
    this._name = value;
  }

  emitDataOutside() {
    this.subject.next('传出数据');
  }

  handleCancel(e) {
    this.subject.destroy('onCancel');
  }

  constructor(private subject: NzModalSubject) {
    this.subject.on('onDestory', () => {
      console.log('destroy');
    });
  }

  ngOnInit() {
  }
}
 */
