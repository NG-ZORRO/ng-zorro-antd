import { Component } from '@angular/core';

import { NzBorderBeamModule } from 'ng-zorro-antd/border-beam';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'nz-demo-border-beam-line-width',
  imports: [NzBorderBeamModule, NzCardModule],
  template: `
    <nz-card
      class="beam-card"
      nzBorderBeam
      [nzBorderBeamLineWidth]="2"
      nzTitle="Custom line width"
      style="border-width: 2px"
    >
      Set nzBorderBeamLineWidth to match the border width of this container.
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
export class NzDemoBorderBeamLineWidthComponent {}
