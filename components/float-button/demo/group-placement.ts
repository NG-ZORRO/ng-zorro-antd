import { Component } from '@angular/core';

import { NzFloatButtonModule } from 'ng-zorro-antd/float-button';

@Component({
  selector: 'nz-demo-float-button-group-placement',
  imports: [NzFloatButtonModule],
  template: `
    <div class="container">
      <div class="box">
        @for (placement of placements; track placement) {
          <nz-float-button-group
            class="{{ placement }}"
            [nzIcon]="icons[$index]"
            nzType="primary"
            nzTrigger="click"
            [nzPlacement]="placement"
          >
            <nz-float-button />
            <nz-float-button nzIcon="comment" />
          </nz-float-button-group>
        }
      </div>
    </div>
  `,
  styles: `
    .container {
      display: flex;
      height: 300px;
      justify-content: space-evenly;
      align-items: center;

      .box {
        height: 100px;
        width: 100px;
        position: relative;

        .top {
          inset-inline-end: 30px;
          bottom: 80px;
        }
        .bottom {
          inset-inline-end: 30px;
          bottom: -20px;
        }
        .left {
          right: 80px;
          bottom: 30px;
        }
        .right {
          left: 80px;
          bottom: 30px;
        }
      }
      nz-float-button-group {
        position: absolute;
      }
    }
  `
})
export class NzDemoFloatButtonGroupPlacementComponent {
  readonly placements = ['top', 'bottom', 'left', 'right'] as const;
  readonly icons = ['up', 'down', 'left', 'right'];
}
