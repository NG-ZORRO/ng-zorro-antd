import { Component } from '@angular/core';

import { NzBorderBeamModule } from 'ng-zorro-antd/border-beam';

@Component({
  selector: 'nz-demo-border-beam-custom',
  imports: [NzBorderBeamModule],
  template: `
    <section class="beam-card" nzBorderBeam>
      Review task status, deployment health, and recent automation activity in one custom container.
    </section>
  `,
  styles: `
    .beam-card {
      position: relative;
      width: 320px;
      min-height: 160px;
      padding: 24px;
      color: rgba(0, 0, 0, 0.65);
      line-height: 1.5715;
      background: #fff;
      border: 1px solid #f0f0f0;
      border-radius: 8px;
    }
  `
})
export class NzDemoBorderBeamCustomComponent {}
