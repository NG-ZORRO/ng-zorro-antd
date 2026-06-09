import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

@Component({
  selector: 'nz-demo-checkbox-basic',
  imports: [FormsModule, NzCheckboxModule],
  template: `<label nz-checkbox [ngModel]="checked()" (ngModelChange)="checked.set($event)">Checkbox</label>`
})
export class NzDemoCheckboxBasicComponent {
  readonly checked = signal(true);
}
