import { Component } from '@angular/core';

import { NzSegmentedModule } from 'ng-zorro-antd/segmented';

@Component({
  selector: 'nz-demo-segmented-size',
  imports: [NzSegmentedModule],
  template: `
    <nz-segmented [nzOptions]="options" nzSize="small" />
    <br />
    <nz-segmented [nzOptions]="options" />
    <br />
    <nz-segmented [nzOptions]="options" nzSize="large" />
  `,
  styles: [
    `
      .ant-segmented {
        margin-bottom: 10px;
      }
    `
  ]
})
export class NzDemoSegmentedSizeComponent {
  options = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];
}
