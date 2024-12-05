import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzRadioModule } from 'ng-zorro-antd/radio';

@Component({
  selector: 'nz-demo-radio-disable',
  imports: [FormsModule, NzButtonModule, NzRadioModule],
  template: `
    <div>
      <label nz-radio [nzDisabled]="disabled">Disabled</label>
      <br />
      <label nz-radio [nzDisabled]="disabled" [ngModel]="true">Disabled</label>
      <br />
      <br />
      <button nz-button nzType="primary" (click)="disabled = !disabled">Toggle disabled</button>
    </div>
  `
})
export class NzDemoRadioDisableComponent {
  disabled = true;
}
