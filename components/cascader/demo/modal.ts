import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCascaderModule, NzCascaderOption } from 'ng-zorro-antd/cascader';
import { NzModalModule } from 'ng-zorro-antd/modal';

const options: NzCascaderOption[] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
            isLeaf: true
          }
        ]
      },
      {
        value: 'ningbo',
        label: 'Ningbo',
        isLeaf: true
      }
    ]
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
            isLeaf: true
          }
        ]
      }
    ]
  }
];

@Component({
  selector: 'nz-demo-cascader-modal',
  imports: [FormsModule, NzButtonModule, NzModalModule, NzCascaderModule],
  template: `
    <nz-modal
      [(nzVisible)]="isVisible"
      nzTitle="Please select"
      (nzOnCancel)="handleCancel($event)"
      (nzOnOk)="handleOk($event)"
    >
      <nz-cascader
        *nzModalContent
        [nzOptions]="nzOptions"
        [(ngModel)]="values"
        (ngModelChange)="onChanges($event)"
      ></nz-cascader>
    </nz-modal>

    <button nz-button (click)="open()">Open Dialog</button>
  `
})
export class NzDemoCascaderModalComponent {
  nzOptions: NzCascaderOption[] = options;
  values: string[] | null = null;
  isVisible = false;

  onChanges(values: string[]): void {
    console.log(values, this.values);
  }

  open(): void {
    this.isVisible = true;
  }

  handleOk($event: MouseEvent): void {
    console.log('Button ok clicked!', this.values, $event);
    this.isVisible = false;
  }

  handleCancel($event: MouseEvent): void {
    console.log('Button cancel clicked!', $event);
    this.isVisible = false;
  }
}
