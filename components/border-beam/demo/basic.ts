import { Component } from '@angular/core';

import { NzBorderBeamModule } from 'ng-zorro-antd/border-beam';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'nz-demo-border-beam-basic',
  imports: [NzBorderBeamModule, NzCardModule],
  template: `
    <nz-card class="beam-card" nzBorderBeam nzTitle="Workspace overview">
      Review task status, deployment health, and recent automation activity in one panel.
    </nz-card>
  `,
  styles: `
    .beam-card {
      position: relative;
      width: 320px;
      overflow: hidden;
    }
  `
})
export class NzDemoBorderBeamBasicComponent {}
