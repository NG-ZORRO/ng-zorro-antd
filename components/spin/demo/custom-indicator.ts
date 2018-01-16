import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-spin-custom-indicator',
  template: `
    <nz-spin>
      <ng-template #indicator><i class="anticon anticon-spin anticon-loading" style="font-size: 24px;"></i></ng-template>
    </nz-spin>`,
  styles  : []
})
export class NzDemoSpinCustomIndicatorComponent { }
