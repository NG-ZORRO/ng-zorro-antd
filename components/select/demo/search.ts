import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'nz-demo-select-search',
  imports: [FormsModule, NzSelectModule],
  template: `
    <nz-select nzShowSearch nzAllowClear nzPlaceHolder="Select a person" [(ngModel)]="selectedValue">
      <nz-option nzLabel="Jack" nzValue="jack" />
      <nz-option nzLabel="Lucy" nzValue="lucy" />
      <nz-option nzLabel="Tom" nzValue="tom" />
    </nz-select>
  `,
  styles: `
    nz-select {
      width: 200px;
    }
  `
})
export class NzDemoSelectSearchComponent {
  selectedValue = null;
}
