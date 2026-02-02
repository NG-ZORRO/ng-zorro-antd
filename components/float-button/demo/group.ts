import { Component } from '@angular/core';

import { NzFloatButtonModule } from 'ng-zorro-antd/float-button';

@Component({
  selector: 'nz-demo-float-button-group',
  imports: [NzFloatButtonModule],
  template: `
    <div class="group">
      <nz-float-button-group nzShape="circle" style="right: 24px">
        <nz-float-button nzIcon="question-circle" />
        <nz-float-button />
        <nz-float-button-top [nzVisibilityHeight]="600" />
        <nz-float-button nzIcon="customer-service" />
      </nz-float-button-group>
      <nz-float-button-group nzShape="square" style="right: 94px">
        <nz-float-button nzIcon="question-circle" />
        <nz-float-button />
        <nz-float-button-top [nzVisibilityHeight]="600" />
        <nz-float-button nzIcon="customer-service" />
      </nz-float-button-group>
    </div>
  `,
  styles: `
    .group {
      height: 300px;
      position: relative;
    }
    nz-float-button-group {
      position: absolute;
    }
  `
})
export class NzDemoFloatButtonGroupComponent {}
