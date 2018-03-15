// tslint:disable:no-any
import { Component } from '@angular/core';

const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
      code: 752100,
      isLeaf: true
    }]
  }, {
    value: 'ningbo',
    label: 'Ningbo',
    code: '315000',
    isLeaf: true
  }]
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
      code: 453400,
      isLeaf: true
    }]
  }]
}];

@Component({
  selector: 'nz-demo-cascader-custom-render',
  template: `
    <nz-cascader
      [nzLabelRender]="renderTpl"
      [nzOptions]="nzOptions"
      [(ngModel)]="values"
      (ngModelChange)="onChanges($event)">
    </nz-cascader>

    <ng-template #renderTpl let-labels="labels" let-selectedOptions="selectedOptions">
      <ng-container *ngFor="let label of labels; let i = index; let isLast = last">
        <span *ngIf="!isLast">{{label}} / </span>
        <span *ngIf="isLast">
          {{label}} (<a href="javascript:;" (click)="handleAreaClick($event, label, selectedOptions[i])"> {{selectedOptions[i].code}} </a>)
        </span>
      </ng-container>
    </ng-template>`,
  styles  : [
    `
    .ant-cascader-picker {
      width: 300px;
    }
    `
  ]
})
export class NzDemoCascaderCustomRenderComponent {
  /** init data */
  nzOptions = options;

  /** ngModel value */
  public values: any[] = null;

  public onChanges(values: any): void {
    console.log(values, this.values);
  }

  handleAreaClick(e: Event, label: string, option: any): void {
    e.preventDefault();
    e.stopPropagation();
    console.log('clicked \"', label, '\"', option);
  }
}
