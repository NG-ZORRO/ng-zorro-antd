import { Component } from '@angular/core';

import { NzBorderBeamModule } from 'ng-zorro-antd/border-beam';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'nz-demo-border-beam-size',
  imports: [NzBorderBeamModule, NzCardModule, NzTagModule],
  template: `
    <div class="card-list">
      @for (item of sizes; track item.name) {
        <nz-card
          class="beam-card"
          [class.beam-card-wide]="item.wide"
          nzBorderBeam
          [nzBorderBeamSize]="item.size"
          nzTitle="{{ item.name }}"
          [nzExtra]="extra"
        >
          {{ item.description }}
          <ng-template #extra
            ><nz-tag>{{ item.size }}px</nz-tag></ng-template
          >
        </nz-card>
      }
    </div>
  `,
  styles: `
    .card-list {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
      max-width: 640px;
    }

    .beam-card {
      position: relative;
      min-height: 136px;
      overflow: hidden;
    }

    .beam-card-wide {
      grid-column: 1 / -1;
      min-height: 192px;
    }
  `
})
export class NzDemoBorderBeamSizeComponent {
  readonly sizes = [
    { name: 'Default', size: 100, description: 'Uses the default 100px visible beam segment.', wide: false },
    { name: 'Compact', size: 56, description: 'Keeps the highlight shorter for dense card groups.', wide: false },
    { name: 'Extended', size: 160, description: 'Creates a longer highlight for wider feature panels.', wide: true }
  ];
}
