import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-float-button-shape',
  template: `
    <div class="shape">
      <nz-float-button nzShape="circle" style="right: 94px" nzType="primary" [nzIcon]="icon"> </nz-float-button>
      <nz-float-button nzShape="square" style="right: 24px" nzType="primary" [nzIcon]="icon"></nz-float-button>
      <ng-template #icon>
        <span nz-icon nzType="customer-service" nzTheme="outline"></span>
      </ng-template>
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
