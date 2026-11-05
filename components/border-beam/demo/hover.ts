import { Component, ViewEncapsulation } from '@angular/core';

import { NzBorderBeamModule } from 'ng-zorro-antd/border-beam';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'nz-demo-border-beam-hover',
  encapsulation: ViewEncapsulation.None,
  imports: [NzBorderBeamModule, NzCardModule],
  template: `
    <nz-card class="nz-demo-border-beam-hover-card" nzBorderBeam nzTitle="Hover over the card">
      The border beam appears when the pointer moves over this card.
    </nz-card>
  `,
  styles: `
    .nz-demo-border-beam-hover-card {
      position: relative;
      width: 320px;
      overflow: hidden;
    }

    .nz-demo-border-beam-hover-card .ant-border-beam {
      opacity: 0;
      transition: opacity 0.2s;
    }

    .nz-demo-border-beam-hover-card .ant-border-beam::before {
      animation-play-state: paused;
    }

    .nz-demo-border-beam-hover-card:hover .ant-border-beam {
      opacity: 1;
    }

    .nz-demo-border-beam-hover-card:hover .ant-border-beam::before {
      animation-play-state: running;
    }
  `
})
export class NzDemoBorderBeamHoverComponent {}
