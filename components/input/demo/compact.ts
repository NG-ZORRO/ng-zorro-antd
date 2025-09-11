import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule, NzSelectOptionInterface } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'nz-demo-input-compact',
  imports: [NzInputModule, NzIconModule, NzSelectModule, NzSpaceModule, NzButtonModule, FormsModule],
  template: `
    <nz-space-compact>
      <input nz-input value="26888888" />
    </nz-space-compact>
    <br />
    <br />
    <nz-space-compact>
      <input nz-input value="0571" [style.width.%]="20" />
      <input nz-input value="26888888" [style.width.%]="80" />
    </nz-space-compact>
    <br />
    <br />
    <nz-space-compact>
      <nz-input-wrapper class="ant-input-search">
        <span nzInputAddonBefore>https://</span>
        <input nz-input type="search" placeholder="input search text" />
        <button nzInputAddonAfter nz-button class="ant-input-search-button">
          <nz-icon nzType="search" />
        </button>
      </nz-input-wrapper>
    </nz-space-compact>
    <br />
    <br />
    <nz-space-compact [style.width.%]="100">
      <input nz-input placeholder="Combine input and button" />
      <button nz-button nzType="primary">Submit</button>
    </nz-space-compact>
    <br />
    <br />
    <nz-space-compact>
      <nz-select [ngModel]="'zhejiang'" [nzOptions]="options" />
      <input nz-input placeholder="Xihu District, Hangzhou" />
    </nz-space-compact>
    <br />
    <br />
    <nz-space-compact nzSize="large">
      <nz-input-wrapper>
        <nz-icon nzInputAddonBefore nzType="search" />
        <input nz-input placeholder="large size" />
      </nz-input-wrapper>
      <input nz-input placeholder="another input" />
    </nz-space-compact>
  `
})
export class NzDemoInputCompactComponent {
  options: NzSelectOptionInterface[] = [
    {
      value: 'zhejiang',
      label: 'Zhejiang'
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu'
    }
  ];
}
