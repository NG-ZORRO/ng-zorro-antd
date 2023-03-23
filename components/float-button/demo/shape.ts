import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-float-button-shape',
  template: `
    <div class="shape">
      <nz-float-button nzShape="circle" style="right: 94px" nzType="primary"></nz-float-button>
      <nz-float-button nzShape="square" style="right: 24px" nzType="primary"> </nz-float-button>
    </div>
  `,
  styles: [
    `
      .shape {
        height: 300px;
        position: relative;
      }
      nz-float-button {
        position: absolute;
      }
    `
  ]
})
export class NzDemoFloatButtonShapeComponent {}
