import { Component } from '@angular/core';

import { NzFloatButtonModule } from 'ng-zorro-antd/float-button';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'nz-demo-float-button-tooltip',
  imports: [NzFloatButtonModule, NzTooltipDirective],
  template: `
    <div class="tooltip">
      <nz-float-button
        style="bottom: 108px"
        nz-tooltip
        nzTooltipTitle="Documents"
        nzTooltipPlacement="top"
        nzTooltipColor="blue"
      />
      <nz-float-button nz-tooltip [nzTooltipTitle]="titleTemplate" />
      <ng-template #titleTemplate>
        <div>Documents</div>
      </ng-template>
    </div>
  `,
  styles: `
    .tooltip {
      height: 300px;
      position: relative;
    }
    nz-float-button {
      position: absolute;
    }
  `
})
export class NzDemoFloatButtonTooltipComponent {}
