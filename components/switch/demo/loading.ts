import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'nz-demo-switch-loading',
  imports: [FormsModule, NzSwitchModule],
  template: `
    <nz-switch [ngModel]="true" nzLoading></nz-switch>
    <br />
    <br />
    <nz-switch nzSize="small" [ngModel]="false" nzLoading></nz-switch>
  `
})
export class NzDemoSwitchLoadingComponent {}
