import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-spin-custom-indicator',
  template: `
    <ng-template #indicatorTemplate><i nz-icon nzType="loading"></i></ng-template>
    <nz-spin nzSimple [nzIndicator]="indicatorTemplate"> </nz-spin>
  `,
  styles: [
    `
      i {
        font-size: 24px;
      }
    `
  ]
})
export class NzDemoSpinCustomIndicatorComponent {}
