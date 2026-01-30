import { Component } from '@angular/core';

import { NzFloatButtonModule } from 'ng-zorro-antd/float-button';

@Component({
  selector: 'nz-demo-float-button-shape',
  imports: [NzFloatButtonModule],
  template: `
    <div class="shape">
      <nz-float-button nzShape="circle" style="right: 94px" nzType="primary" nzIcon="customer-service" />
      <nz-float-button nzShape="square" style="right: 24px" nzType="primary" nzIcon="customer-service" />
    </div>
  `,
  styles: `
    .shape {
      height: 300px;
      position: relative;
    }
    nz-float-button {
      position: absolute;
    }
  `
})
export class NzDemoFloatButtonShapeComponent {}
