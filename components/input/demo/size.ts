import { Component } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'nz-demo-input-size',
  imports: [NzInputModule, NzIconModule],
  template: `
    <nz-input-wrapper>
      <nz-icon nzInputPrefix nzType="user" />
      <input nz-input placeholder="large size" nzSize="large" />
    </nz-input-wrapper>
    <br />
    <br />
    <nz-input-wrapper>
      <nz-icon nzInputPrefix nzType="user" />
      <input nz-input placeholder="default size" nzSize="default" />
    </nz-input-wrapper>
    <br />
    <br />
    <nz-input-wrapper>
      <nz-icon nzInputPrefix nzType="user" />
      <input nz-input placeholder="small size" nzSize="small" />
    </nz-input-wrapper>
  `
})
export class NzDemoInputSizeComponent {}
