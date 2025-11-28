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
  imports: [FormsModule, NzCascaderModule],
  template: `
    <nz-cascader
      [nzOptionRender]="renderTpl"
      [nzOptions]="nzOptions"
      [(ngModel)]="values"
      (ngModelChange)="onChanges($event)"
    />
    <ng-template #renderTpl let-option let-index="index">{{ index + 1 }}. {{ option.label }}</ng-template>
  `
})
export class NzDemoCascaderCustomTemplateComponent {
  readonly nzOptions = options;
  values: string[] | null = null;

  onChanges(values: string): void {
    console.log(values, this.values);
  }
}
