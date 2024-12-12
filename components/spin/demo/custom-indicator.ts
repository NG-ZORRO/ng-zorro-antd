import { Component } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'nz-demo-spin-custom-indicator',
  imports: [NzIconModule, NzSpinModule],
  template: `
    <ng-template #indicatorTemplate><nz-icon nzType="loading" /></ng-template>
    <nz-spin nzSimple [nzIndicator]="indicatorTemplate"></nz-spin>
  `,
  styles: [
    `
      nz-icon {
        font-size: 24px;
      }
    `
  ]
})
export class NzDemoSpinCustomIndicatorComponent {}
