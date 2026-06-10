import { Component } from '@angular/core';

import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'nz-demo-select-search',
  imports: [NzSelectModule],
  template: `<nz-select [nzOptions]="options" nzShowSearch nzAllowClear nzPlaceHolder="Select a person" /> `,
  styles: `
    nz-select {
      width: 120px;
    }
  `
})
export class NzDemoSelectSearchComponent {
  readonly options = [
    { label: 'Jack', value: 'jack' },
    { label: 'Lucy', value: 'lucy' },
    { label: 'Tom', value: 'tom' }
  ];
}
