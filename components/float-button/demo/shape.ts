import { Component } from '@angular/core';

import { NzFloatButtonModule } from 'ng-zorro-antd/float-button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'nz-demo-float-button-shape',
  imports: [NzFloatButtonModule, NzIconModule],
  template: `
    <div class="shape">
      <nz-float-button nzShape="circle" style="right: 94px" nzType="primary" [nzIcon]="icon"> </nz-float-button>
      <nz-float-button nzShape="square" style="right: 24px" nzType="primary" [nzIcon]="icon"></nz-float-button>
      <ng-template #icon>
        <nz-icon nzType="customer-service" nzTheme="outline"></nz-icon>
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
