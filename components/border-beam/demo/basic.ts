import { Component } from '@angular/core';

import { NzBorderBeamModule } from 'ng-zorro-antd/border-beam';

@Component({
  selector: 'nz-demo-border-beam-basic',
  imports: [NzBorderBeamModule],
  template: `
    <section class="beam-card" nzBorderBeam>
      <h3>Deployments are healthy</h3>
      <p>All services are running normally.</p>
    </section>
  `,
  styles: `
    .beam-card {
      position: relative;
      width: 320px;
      padding: 24px;
      overflow: hidden;
      border: 1px solid #d9d9d9;
      border-radius: 8px;
    }

    h3 {
      margin: 0 0 8px;
    }

    p {
      margin: 0;
      color: rgba(0, 0, 0, 0.65);
    }
  `
})
export class NzDemoBorderBeamBasicComponent {}
