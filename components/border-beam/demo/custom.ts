import { Component } from '@angular/core';

import { NzBorderBeamModule } from 'ng-zorro-antd/border-beam';

@Component({
  selector: 'nz-demo-border-beam-custom',
  imports: [NzBorderBeamModule],
  template: `
    <section
      class="beam-card"
      nzBorderBeam
      [nzBorderBeamColor]="gradient"
      [nzBorderBeamCount]="2"
      [nzBorderBeamDuration]="4"
      [nzBorderBeamLineWidth]="2"
      [nzBorderBeamSize]="140"
    >
      <h3>Two gradient beams</h3>
      <p>Use the inputs to control color, count, pace, line width, and size.</p>
    </section>
  `,
  styles: `
    .beam-card {
      position: relative;
      width: 320px;
      padding: 24px;
      overflow: hidden;
      border: 2px solid #d9d9d9;
      border-radius: 12px;
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
export class NzDemoBorderBeamCustomComponent {
  readonly gradient = [
    { color: '#1677ff', percent: 0 },
    { color: '#36cfc9', percent: 55 },
    { color: '#95de64', percent: 100 }
  ];
}
