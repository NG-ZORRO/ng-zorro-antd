import { Component } from '@angular/core';

import { NzSegmentedModule } from 'ng-zorro-antd/segmented';

@Component({
  selector: 'nz-demo-segmented-name',
  imports: [NzSegmentedModule],
  template: ` <nz-segmented [nzOptions]="options" nzName="segmented" /> `
})
export class NzDemoSegmentedNameComponent {
  options = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];
}
