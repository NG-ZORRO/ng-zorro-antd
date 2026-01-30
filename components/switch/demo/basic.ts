import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'nz-demo-switch-basic',
  imports: [FormsModule, NzSwitchModule],
  template: `<nz-switch [(ngModel)]="switchValue" />`
})
export class NzDemoSwitchBasicComponent {
  switchValue = false;
}
