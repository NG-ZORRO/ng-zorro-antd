import { Component } from '@angular/core';

import { NzSegmentedModule } from 'ng-zorro-antd/segmented';

@Component({
  selector: 'nz-demo-segmented-size',
  standalone: true,
  imports: [NzSegmentedModule],
  template: `
    <nz-segmented [nzOptions]="options" nzSize="small"></nz-segmented>
    <br />
    <br />
    <nz-segmented [nzOptions]="options"></nz-segmented>
    <br />
    <br />
    <nz-segmented [nzOptions]="options" nzSize="large"></nz-segmented>
  `
})
export class NzDemoSegmentedSizeComponent {
  options = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];
}
