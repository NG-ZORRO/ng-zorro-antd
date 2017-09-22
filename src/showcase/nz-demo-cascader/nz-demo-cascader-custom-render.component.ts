import {Component, OnInit, ViewChild, TemplateRef} from '@angular/core';

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
    }],
  }, {
    value: 'ningbo',
    label: 'Ningbo',
    isLeaf: true
  }],
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
    }],
  }],
}];


@Component({
  selector: 'nz-demo-cascader-custom-render',
  template: `
    <nz-cascader
      [nzDisplayRender]="_displayRender"
      [nzOptions]="_options"
      [(ngModel)]="_value"
      (ngModelChange)="_console($event)"
      (nzChange)="_console($event)"
      style="width: 300px">
    </nz-cascader>
    <ng-template #renderTpl let-labels="labels" let-selectedOptions="selectedOptions">
      <ng-container *ngFor="let label of labels; let i = index; let isLast = last">
        <span *ngIf="!isLast">{{label}} / </span>
        <span *ngIf="isLast">
          {{label}} (<a href="javascript:;" (click)="handleAreaClick($event)"> {{selectedOptions[i].code}} </a>)
        </span>
      </ng-container>
    </ng-template>`,
  styles  : []
})
export class NzDemoCascaderCustomRenderComponent implements OnInit {
  /** init data */
  _options = options;

  _value: any[] = null;

  @ViewChild('renderTpl') tpl: TemplateRef<any>;

  _console(value) {
    console.log(value);
  }

  constructor() {
  }

  ngOnInit() {
  }

  get _displayRender(): Function {
    return this.displayRender.bind(this);
  }

  displayRender(labels: string[], selectedOptions: any[]): any {
    return this.tpl;
  }

  handleAreaClick(e: Event, label: string, option: any): void {
    e.preventDefault();
    e.stopPropagation();
    console.log('clicked', label, option);
  }

}

