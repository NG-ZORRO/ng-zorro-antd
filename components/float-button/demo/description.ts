import { Component } from '@angular/core';

import { NzFloatButtonModule } from 'ng-zorro-antd/float-button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'nz-demo-float-button-description',
  imports: [NzFloatButtonModule, NzIconModule],
  template: `
    <div class="description">
      <nz-float-button
        [nzIcon]="icon"
        [nzDescription]="description"
        nzShape="square"
        style="right: 24px"
      ></nz-float-button>
      <nz-float-button [nzDescription]="description" nzShape="square" style="right: 94px"></nz-float-button>
    </div>
    <ng-template #description>HELP</ng-template>

    <ng-template #icon>
      <nz-icon nzType="file-text" nzTheme="outline"></nz-icon>
    </ng-template>
  `,
  styles: [
    `
      .description {
        height: 300px;
        position: relative;
      }
      nz-float-button {
        position: absolute;
      }
    `
  ]
})
export class NzDemoFloatButtonDescriptionComponent {}
