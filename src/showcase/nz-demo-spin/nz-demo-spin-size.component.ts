import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-spin-size',
  template: `
    <nz-spin [nzSize]="'small'"></nz-spin>
    <nz-spin></nz-spin>
    <nz-spin [nzSize]="'large'"></nz-spin>`,
  styles  : [
      `:host ::ng-deep nz-spin > div {
      display: inline-block;
    }
    `
  ]
})
export class NzDemoSpinSizeComponent { }
