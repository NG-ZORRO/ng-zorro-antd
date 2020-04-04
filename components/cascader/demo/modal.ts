import { Component } from '@angular/core';
import { NzCascaderOption } from 'ng-zorro-antd/cascader';

const options = [
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
  template: `
    <nz-modal [(nzVisible)]="isVisible" nzTitle="Please select" (nzOnCancel)="handleCancel($event)" (nzOnOk)="handleOk($event)">
      <nz-cascader [nzOptions]="nzOptions" [(ngModel)]="values" (ngModelChange)="onChanges($event)"> </nz-cascader>
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
