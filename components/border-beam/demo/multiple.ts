import { Component } from '@angular/core';

import { NzBorderBeamModule } from 'ng-zorro-antd/border-beam';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'nz-demo-border-beam-multiple',
  imports: [NzBorderBeamModule, NzCardModule],
  template: `
    <nz-card class="beam-card" nzBorderBeam [nzBorderBeamCount]="3" nzTitle="Multiple beams">
      Set count to distribute multiple beams evenly around the container border.
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
export class NzDemoBorderBeamMultipleComponent {}
