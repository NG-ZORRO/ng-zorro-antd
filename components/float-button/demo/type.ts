import { Component } from '@angular/core';

import { NzFloatButtonModule } from 'ng-zorro-antd/float-button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'nz-demo-float-button-type',
  imports: [NzFloatButtonModule, NzIconModule],
  template: `
    <div class="type">
      <nz-float-button nzType="primary" style="right: 24px" [nzIcon]="icon"></nz-float-button>
      <nz-float-button nzType="default" style="right: 94px" [nzIcon]="icon"></nz-float-button>
    </div>
    <ng-template #icon>
      <nz-icon nzType="question-circle" nzTheme="outline"></nz-icon>
    </ng-template>
  `,
  styles: [
    `
      .type {
        height: 300px;
        position: relative;
      }
      nz-float-button {
        position: absolute;
      }
    `
  ]
})
export class NzDemoFloatButtonTypeComponent {}
