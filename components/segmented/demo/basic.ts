import { Component } from '@angular/core';

import { NzSegmentedModule } from 'ng-zorro-antd/segmented';

@Component({
  selector: 'nz-demo-segmented-basic',
  standalone: true,
  imports: [NzSegmentedModule],
  template: `<nz-segmented [nzOptions]="options" (nzValueChange)="handleIndexChange($event)"></nz-segmented>`
})
export class NzDemoSegmentedBasicComponent {
  options = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];

  handleIndexChange(e: number): void {
    console.log(e);
  }
}
