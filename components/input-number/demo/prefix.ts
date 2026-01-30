import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';

@Component({
  selector: 'nz-demo-input-number-prefix',
  imports: [FormsModule, NzInputNumberModule, NzIconModule],
  template: `
    <nz-input-number nzPrefix="￥" [style.width.%]="100" />

    <nz-input-number [style.width.%]="100">
      <span nzInputPrefix>￥</span>
    </nz-input-number>

    <nz-input-number [style.width.%]="100">
      <nz-icon nzInputAddonBefore nzType="user" />
      <span nzInputPrefix>￥</span>
    </nz-input-number>

    <nz-input-number nzPrefix="￥" nzDisabled [style.width.%]="100" />
  `,
  styles: `
    nz-input-number {
      margin-bottom: 8px;
    }
  `
})
export class NzDemoInputNumberPrefixComponent {}
