import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-popconfirm-hide-arrow',
  template: ` <a nz-popconfirm nzPopconfirmTitle="Are you sure?" [nzPopconfirmShowArrow]="false">Delete</a> `
})
export class NzDemoPopconfirmHideArrowComponent {}
