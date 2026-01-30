import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'nz-demo-switch-size',
  imports: [FormsModule, NzSwitchModule],
  template: `
    <nz-switch [ngModel]="true" />
    <br />
    <br />
    <nz-switch nzSize="small" [ngModel]="true" />
  `
})
export class NzDemoSwitchSizeComponent {}
