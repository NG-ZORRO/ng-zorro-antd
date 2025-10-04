import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'nz-demo-input-number-addon',
  imports: [FormsModule, NzSelectModule, NzCascaderModule, NzInputNumberModule, NzIconModule],
  template: `
    <nz-input-number nzAddonBefore="+" nzAddonAfter="$" [(ngModel)]="value" />

    <nz-input-number [(ngModel)]="value">
      <span nzInputAddonBefore>+</span>
      <span nzInputAddonAfter>$</span>
    </nz-input-number>

    <nz-input-number [(ngModel)]="value">
      <nz-select nzInputAddonBefore [ngModel]="'add'" [style.width.px]="60">
        <nz-option nzLabel="+" nzValue="add"></nz-option>
        <nz-option nzLabel="-" nzValue="minus"></nz-option>
      </nz-select>
      <nz-select nzInputAddonAfter [ngModel]="'USD'" [style.width.px]="60">
        <nz-option nzValue="USD" nzLabel="$"></nz-option>
        <nz-option nzValue="EUR" nzLabel="€"></nz-option>
        <nz-option nzValue="GBP" nzLabel="£"></nz-option>
        <nz-option nzValue="CNY" nzLabel="¥"></nz-option>
      </nz-select>
    </nz-input-number>

    <nz-input-number [(ngModel)]="value">
      <nz-icon nzInputAddonAfter nzType="setting" />
    </nz-input-number>

    <nz-input-number [(ngModel)]="value">
      <nz-cascader nzInputAddonBefore [nzOptions]="[]" nzPlaceHolder="cascader" [style.width.px]="150" />
    </nz-input-number>
  `,
  styles: [
    `
      nz-input-number {
        display: block;
        margin-bottom: 8px;
      }
    `
  ]
})
export class NzDemoInputNumberAddonComponent {
  value = 100;
}
