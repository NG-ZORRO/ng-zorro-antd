import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzSelectModule, NzSelectOptionInterface } from 'ng-zorro-antd/select';

@Component({
  selector: 'nz-demo-select-prefix-and-suffix',
  imports: [FormsModule, NzSelectModule, NzFlexModule],
  template: `
    <nz-flex nzWrap="wrap" nzGap="small">
      <nz-select
        [(ngModel)]="value"
        nzAllowClear
        [style.width.px]="200"
        nzPrefix="User"
        [nzOptions]="options"
      ></nz-select>
      <nz-select
        [(ngModel)]="value"
        nzAllowClear
        [style.width.px]="120"
        nzSuffixIcon="smile"
        [nzOptions]="options"
      ></nz-select>
      <nz-select
        [(ngModel)]="value"
        nzAllowClear
        [style.width.px]="120"
        nzSuffixIcon="meh"
        nzDisabled
        [nzOptions]="options"
      ></nz-select>
      <br />
      <nz-select
        [(ngModel)]="multipleValue"
        nzAllowClear
        [style.width.px]="200"
        nzMode="tags"
        nzPrefix="User"
        [nzOptions]="options"
      ></nz-select>
      <nz-select
        [(ngModel)]="multipleValue"
        nzAllowClear
        [style.width.px]="120"
        nzMode="tags"
        nzSuffixIcon="smile"
        [nzOptions]="options"
      ></nz-select>
      <nz-select
        [(ngModel)]="multipleValue"
        nzAllowClear
        [style.width.px]="120"
        nzMode="tags"
        nzSuffixIcon="meh"
        nzDisabled
        [nzOptions]="options"
      ></nz-select>
    </nz-flex>
  `
})
export class NzDemoSelectPrefixAndSuffixComponent {
  readonly options: NzSelectOptionInterface[] = [
    { value: 'jack', label: 'Jack' },
    { value: 'lucy', label: 'Lucy' },
    { value: 'Yiminghe', label: 'yiminghe' },
    { value: 'disabled', label: 'Disabled', disabled: true }
  ];

  value = model('lucy');
  multipleValue = model(['lucy']);
}
