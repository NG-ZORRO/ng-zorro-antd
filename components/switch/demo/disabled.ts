import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'nz-demo-switch-disabled',
  imports: [FormsModule, NzButtonModule, NzSwitchModule],
  template: `
    <nz-switch [(ngModel)]="switchValue" [nzDisabled]="isDisabled" />
    <br />
    <br />
    <button nz-button nzType="primary" (click)="isDisabled = !isDisabled">Toggle disabled</button>
  `
})
export class NzDemoSwitchDisabledComponent {
  switchValue = false;
  isDisabled = true;
}
