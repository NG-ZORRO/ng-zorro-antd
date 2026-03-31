import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzCascaderModule, NzCascaderOption } from 'ng-zorro-antd/cascader';
import { NzDividerModule } from 'ng-zorro-antd/divider';

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
  selector: 'nz-demo-cascader-popup-render',
  imports: [FormsModule, NgTemplateOutlet, NzCascaderModule, NzDividerModule],
  template: `
    <nz-cascader [nzOptions]="nzOptions" [nzPopupRender]="popupRenderTpl" [(ngModel)]="values" />

    <ng-template #popupRenderTpl let-menu>
      <div style="padding: 8px; color: #1890ff">This is header.</div>
      <nz-divider style="margin: 0" />
      <ng-container [ngTemplateOutlet]="menu" />
      <nz-divider style="margin: 0" />
      <div style="padding: 8px">The footer is not very short.</div>
    </ng-template>
  `
})
export class NzDemoCascaderPopupRenderComponent {
  readonly nzOptions: NzCascaderOption[] = options;
  values: string[] | null = null;
}
