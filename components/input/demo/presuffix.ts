import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'nz-demo-input-presuffix',
  imports: [NzInputModule, NzIconModule, NzSelectModule, NzCascaderModule, FormsModule],
  template: `
    <nz-input-wrapper>
      <nz-icon nzInputPrefix nzType="user" />
      <input nz-input placeholder="Enter your username" />
      <nz-icon nzInputSuffix nzType="info-circle" />
    </nz-input-wrapper>
    <br />
    <br />
    <nz-input-wrapper nzPrefix="¥" nzSuffix="RMB">
      <input nz-input />
    </nz-input-wrapper>
    <br />
    <br />
    <nz-input-wrapper nzPrefix="¥" nzSuffix="RMB">
      <input nz-input disabled />
    </nz-input-wrapper>
    <br />
    <br />
    <nz-input-wrapper>
      <input nz-input placeholder="input password support suffix" />
      <nz-icon nzInputSuffix class="ant-input-password-icon" nzType="eye-invisible" />
      <nz-icon nzInputSuffix nzType="lock" />
    </nz-input-wrapper>
  `
})
export class NzDemoInputPresuffixComponent {
  readonly value = signal('mysite');
}
