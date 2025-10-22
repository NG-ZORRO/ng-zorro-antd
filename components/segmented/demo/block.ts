import { Component } from '@angular/core';

import { NzSegmentedModule } from 'ng-zorro-antd/segmented';

@Component({
  selector: 'nz-demo-segmented-block',
  imports: [NzSegmentedModule],
  template: `<nz-segmented [nzOptions]="options" [nzBlock]="true" />`
})
export class NzDemoSegmentedBlockComponent {
  options = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];
}
