import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzRadioModule } from 'ng-zorro-antd/radio';

@Component({
  selector: 'nz-demo-radio-solid',
  standalone: true,
  imports: [FormsModule, NzRadioModule],
  template: `
    <nz-radio-group [(ngModel)]="radioValue" nzButtonStyle="solid">
      <label nz-radio-button nzValue="A">Hangzhou</label>
      <label nz-radio-button nzValue="B">Shanghai</label>
      <label nz-radio-button nzValue="C">Beijing</label>
      <label nz-radio-button nzValue="D">Chengdu</label>
    </nz-radio-group>
  `
})
export class NzDemoRadioSolidComponent {
  radioValue = 'A';
}
