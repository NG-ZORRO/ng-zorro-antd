// tslint:disable:no-any
import { Component } from '@angular/core';

const options = [
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
  template: `
    <nz-cascader [nzOptionRender]="renderTpl" [nzOptions]="nzOptions" [(ngModel)]="values" (ngModelChange)="onChanges($event)">
    </nz-cascader>
    <ng-template #renderTpl let-option let-index="index"> {{ index + 1 }}. {{ option.label }} </ng-template>
  `
})
export class NzDemoCascaderCustomTemplateComponent {
  nzOptions = options;
  values: any[] | null = null;

  onChanges(values: any): void {
    console.log(values, this.values);
  }
}
