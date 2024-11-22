import { Component } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'nz-demo-spin-custom-indicator',
  standalone: true,
  imports: [NzIconModule, NzSpinModule],
  template: `
    <ng-template #indicatorTemplate><span nz-icon nzType="loading"></span></ng-template>
    <nz-spin nzSimple [nzIndicator]="indicatorTemplate"></nz-spin>
  `,
  styles: [
    `
      span[nz-icon] {
        font-size: 24px;
      }
    `
  ]
})
export class NzDemoSpinCustomIndicatorComponent {}
