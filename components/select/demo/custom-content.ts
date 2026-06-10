import { Component } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'nz-demo-select-custom-content',
  imports: [NzIconModule, NzSelectModule],
  template: `
    <nz-select nzShowSearch nzAllowClear nzPlaceHolder="Select OS">
      <nz-option nzCustomContent nzLabel="Windows" nzValue="windows">
        <nz-icon nzType="windows" />
        Windows
      </nz-option>
      <nz-option nzCustomContent nzLabel="Mac" nzValue="mac">
        <nz-icon nzType="apple" />
        Mac
      </nz-option>
      <nz-option nzCustomContent nzLabel="Android" nzValue="android">
        <nz-icon nzType="android" />
        Android
      </nz-option>
    </nz-select>
  `,
  styles: `
    nz-select {
      width: 200px;
    }
  `
})
export class NzDemoSelectCustomContentComponent {}
