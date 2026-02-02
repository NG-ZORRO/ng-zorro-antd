import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'nz-demo-spin-nested',
  imports: [FormsModule, NzAlertModule, NzSpinModule, NzSwitchModule],
  template: `
    <nz-spin [nzSpinning]="isSpinning">
      <nz-alert
        nzType="info"
        nzMessage="Alert message title"
        nzDescription="Further details about the context of this alert."
      />
    </nz-spin>
    <br />
    <div>
      Loading state：
      <nz-switch [(ngModel)]="isSpinning" />
    </div>
  `
})
export class NzDemoSpinNestedComponent {
  isSpinning = false;
}
