import { Component } from '@angular/core';

import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'nz-demo-form-mix-layout',
  imports: [NzDividerModule, NzFormModule, NzInputModule],
  template: `
    <form nz-form nzLayout="horizontal">
      <nz-form-item>
        <nz-form-label [nzSpan]="4">horizontal</nz-form-label>
        <nz-form-control [nzSpan]="20">
          <input nz-input />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item nzLayout="vertical">
        <nz-form-label>vertical</nz-form-label>
        <nz-form-control>
          <input nz-input />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item nzLayout="vertical">
        <nz-form-label>vertical2</nz-form-label>
        <nz-form-control>
          <input nz-input />
        </nz-form-control>
      </nz-form-item>
    </form>

    <nz-divider />

    <form nz-form nzLayout="vertical">
      <nz-form-item>
        <nz-form-label>vertical</nz-form-label>
        <nz-form-control>
          <input nz-input />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label>vertical2</nz-form-label>
        <nz-form-control>
          <input nz-input />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item nzLayout="horizontal">
        <nz-form-label [nzSpan]="4">horizontal</nz-form-label>
        <nz-form-control [nzSpan]="20">
          <input nz-input />
        </nz-form-control>
      </nz-form-item>
    </form>
  `,
  styles: `
    form {
      max-width: 600px;
    }
  `
})
export class NzDemoFormMixLayoutComponent {}
