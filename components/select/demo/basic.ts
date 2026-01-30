import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'nz-demo-select-basic',
  imports: [FormsModule, NzSelectModule],
  template: `
    <nz-select ngModel="lucy">
      <nz-option nzValue="jack" nzLabel="Jack" />
      <nz-option nzValue="lucy" nzLabel="Lucy" />
      <nz-option nzValue="disabled" nzLabel="Disabled" nzDisabled />
    </nz-select>
    <nz-select ngModel="lucy" nzDisabled>
      <nz-option nzValue="lucy" nzLabel="Lucy" />
    </nz-select>
    <nz-select ngModel="lucy" nzLoading>
      <nz-option nzValue="lucy" nzLabel="Lucy" />
    </nz-select>
    <nz-select ngModel="lucy" nzAllowClear nzPlaceHolder="Choose">
      <nz-option nzValue="lucy" nzLabel="Lucy" />
    </nz-select>
  `,
  styles: `
    nz-select {
      margin: 0 8px 10px 0;
      width: 120px;
    }
  `
})
export class NzDemoSelectBasicComponent {}
