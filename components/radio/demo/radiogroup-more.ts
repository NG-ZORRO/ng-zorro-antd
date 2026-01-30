import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';

@Component({
  selector: 'nz-demo-radio-radiogroup-more',
  imports: [FormsModule, NzInputModule, NzRadioModule],
  template: `
    <nz-radio-group [(ngModel)]="radioValue">
      <label nz-radio nzValue="A">Option A</label>
      <label nz-radio nzValue="B">Option B</label>
      <label nz-radio nzValue="C">Option C</label>
      <label nz-radio nzValue="M">
        More...
        @if (radioValue === 'M') {
          <input type="text" nz-input />
        }
      </label>
    </nz-radio-group>
  `,
  styles: `
    [nz-radio] {
      display: block;
      height: 32px;
      line-height: 32px;
    }

    input {
      width: 100px;
      margin-left: 10px;
    }
  `
})
export class NzDemoRadioRadiogroupMoreComponent {
  radioValue = 'A';
}
