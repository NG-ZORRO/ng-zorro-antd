import { Component } from '@angular/core';

import { NzSegmentedModule } from 'ng-zorro-antd/segmented';

@Component({
  selector: 'nz-demo-segmented-disabled',
  imports: [NzSegmentedModule],
  template: `
    <nz-segmented [nzOptions]="['Map', 'Transit', 'Satellite']" nzDisabled />
    <br />
    <nz-segmented [nzOptions]="options" />
  `,
  styles: `
    .ant-segmented {
      margin-bottom: 10px;
    }
  `
})
export class NzDemoSegmentedDisabledComponent {
  options = [
    'Daily',
    { label: 'Weekly', value: 'Weekly', disabled: true },
    'Monthly',
    { label: 'Quarterly', value: 'Quarterly', disabled: true },
    'Yearly'
  ];
}
