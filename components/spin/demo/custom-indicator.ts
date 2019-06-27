import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-spin-custom-indicator',
  template: `
    <ng-template #indicatorTemplate><i nz-icon nzType="loading" style="font-size: 24px;"></i> </ng-template>
    <nz-spin nzSimple [nzIndicator]="indicatorTemplate"> </nz-spin>
  `
})
export class NzDemoSpinCustomIndicatorComponent {}
