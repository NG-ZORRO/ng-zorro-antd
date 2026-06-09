import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'nz-demo-switch-disabled',
  imports: [FormsModule, NzButtonModule, NzSwitchModule],
  template: `
    <nz-switch [ngModel]="switchValue()" (ngModelChange)="switchValue.set($event)" [nzDisabled]="isDisabled()" />
    <br />
    <br />
    <button nz-button nzType="primary" (click)="isDisabled.update(value => !value)">Toggle disabled</button>
  `
})
export class NzDemoSwitchDisabledComponent {
  readonly switchValue = signal(false);
  readonly isDisabled = signal(true);
}
