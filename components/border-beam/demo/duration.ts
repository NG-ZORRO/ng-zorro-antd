import { Component } from '@angular/core';

import { NzBorderBeamModule } from 'ng-zorro-antd/border-beam';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'nz-demo-border-beam-duration',
  imports: [NzBorderBeamModule, NzCardModule, NzTagModule],
  template: `
    <div class="card-list">
      @for (item of durations; track item.name) {
        <nz-card
          class="beam-card"
          nzBorderBeam
          [nzBorderBeamDuration]="item.seconds"
          nzTitle="{{ item.name }}"
          [nzExtra]="extra"
        >
          {{ item.description }}
          <ng-template #extra
            ><nz-tag>{{ item.seconds }}s</nz-tag></ng-template
          >
        </nz-card>
      }
    </div>
  `,
  styles: `
    .card-list {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
    }

    .beam-card {
      position: relative;
      width: 220px;
      overflow: hidden;
    }
  `
})
export class NzDemoBorderBeamDurationComponent {
  readonly durations = [
    { name: 'Fast', seconds: 3, description: 'A quick loop for temporary highlights and active modules.' },
    { name: 'Default', seconds: 6, description: 'The original pacing for most emphasized containers.' },
    { name: 'Slow', seconds: 12, description: 'A calmer loop for persistent panels and ambient surfaces.' }
  ];
}
