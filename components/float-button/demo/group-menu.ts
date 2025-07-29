import { Component } from '@angular/core';

import { NzFloatButtonModule } from 'ng-zorro-antd/float-button';

@Component({
  selector: 'nz-demo-float-button-group-menu',
  imports: [NzFloatButtonModule],
  template: `
    <div class="menu">
      <nz-float-button-group
        nzIcon="customer-service"
        nzType="primary"
        nzTrigger="click"
        style="right: 24px"
        (nzOnOpenChange)="openChange($event)"
      >
        <nz-float-button></nz-float-button>
        <nz-float-button nzIcon="comment"></nz-float-button>
      </nz-float-button-group>
      <nz-float-button-group
        nzIcon="customer-service"
        nzType="primary"
        nzTrigger="hover"
        style="right: 94px"
        (nzOnOpenChange)="openChange($event)"
      >
        <nz-float-button></nz-float-button>
        <nz-float-button nzIcon="comment"></nz-float-button>
      </nz-float-button-group>
    </div>
  `,
  styles: [
    `
      .menu {
        height: 300px;
        position: relative;
      }
      nz-float-button-group {
        position: absolute;
      }
    `
  ]
})
export class NzDemoFloatButtonGroupMenuComponent {
  openChange(status: boolean): void {
    console.log(status);
  }
}
