import { Component } from '@angular/core';

import { NzFloatButtonModule } from 'ng-zorro-antd/float-button';

@Component({
  selector: 'nz-demo-float-button-type',
  imports: [NzFloatButtonModule],
  template: `
    <div class="type">
      <nz-float-button nzType="primary" style="right: 24px" nzIcon="question-circle" />
      <nz-float-button nzType="default" style="right: 94px" nzIcon="question-circle" />
    </div>
  `,
  styles: `
    .type {
      height: 300px;
      position: relative;
    }
    nz-float-button {
      position: absolute;
    }
  `
})
export class NzDemoFloatButtonTypeComponent {}
