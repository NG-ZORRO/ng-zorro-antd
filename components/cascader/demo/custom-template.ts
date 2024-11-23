/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzCascaderModule, NzCascaderOption } from 'ng-zorro-antd/cascader';

const options: NzCascaderOption[] = [
  {
    label: 'Ant Design',
    value: 'antd',
    children: [
      {
        label: 'ng-zorro-antd',
        value: 'ng-zorro-antd',
        isLeaf: true
      }
    ]
  },
  {
    label: 'Angular',
    value: 'angular',
    children: [
      {
        label: 'CDK',
        value: 'cdk',
        isLeaf: true
      }
    ]
  }
];

@Component({
  selector: 'nz-demo-cascader-custom-template',
  standalone: true,
  imports: [FormsModule, NzCascaderModule],
  template: `
    <nz-cascader
      [nzOptionRender]="renderTpl"
      [nzOptions]="nzOptions"
      [(ngModel)]="values"
      (ngModelChange)="onChanges($event)"
    ></nz-cascader>
    <ng-template #renderTpl let-option let-index="index">{{ index + 1 }}. {{ option.label }}</ng-template>
  `
})
export class NzDemoCascaderCustomTemplateComponent {
  nzOptions = options;
  values: string[] | null = null;

  onChanges(values: string): void {
    console.log(values, this.values);
  }
}
