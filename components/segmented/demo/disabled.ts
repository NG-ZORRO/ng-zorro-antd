import { Component } from '@angular/core';

import { NzSegmentedModule } from 'ng-zorro-antd/segmented';

@Component({
  selector: 'nz-demo-segmented-disabled',
  standalone: true,
  imports: [NzSegmentedModule],
  template: `
    <nz-segmented [nzOptions]="['Map', 'Transit', 'Satellite']" nzDisabled></nz-segmented>
    <br />
    <nz-segmented [nzOptions]="options"></nz-segmented>
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
