import { Component } from '@angular/core';

import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'nz-demo-spin-tip',
  imports: [NzAlertModule, NzSpinModule],
  template: `
    <nz-spin nzTip="Loading...">
      <nz-alert
        nzType="info"
        nzMessage="Alert message title"
        nzDescription="Further details about the context of this alert."
      />
    </nz-spin>
  `
})
export class NzDemoSpinTipComponent {}
