import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'nz-demo-select-optgroup',
  imports: [FormsModule, NzSelectModule],
  template: `
    <nz-select [(ngModel)]="selectedValue" nzAllowClear nzPlaceHolder="Choose" nzShowSearch>
      <nz-option-group nzLabel="Manager">
        <nz-option nzValue="jack" nzLabel="Jack" />
        <nz-option nzValue="lucy" nzLabel="Lucy" />
      </nz-option-group>
      <nz-option-group nzLabel="Engineer">
        <nz-option nzValue="tom" nzLabel="Tom" />
      </nz-option-group>
    </nz-select>
  `,
  styles: `
    nz-select {
      width: 120px;
    }
  `
})
export class NzDemoSelectOptgroupComponent {
  selectedValue = 'lucy';
}
