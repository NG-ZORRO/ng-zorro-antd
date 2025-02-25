import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'nz-demo-switch-size',
  imports: [FormsModule, NzSwitchModule],
  template: `
    <nz-switch [ngModel]="true"></nz-switch>
    <br />
    <br />
    <nz-switch nzSize="small" [ngModel]="true"></nz-switch>
  `
})
export class NzDemoSwitchSizeComponent {}
