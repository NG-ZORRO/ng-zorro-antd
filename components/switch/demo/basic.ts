import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'nz-demo-switch-basic',
  imports: [FormsModule, NzSwitchModule],
  template: `<nz-switch [ngModel]="switchValue()" (ngModelChange)="switchValue.set($event)" />`
})
export class NzDemoSwitchBasicComponent {
  readonly switchValue = signal(false);
}
