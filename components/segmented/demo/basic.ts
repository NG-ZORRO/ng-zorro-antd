import { Component } from '@angular/core';

import { NzSegmentedModule } from 'ng-zorro-antd/segmented';

@Component({
  selector: 'nz-demo-segmented-basic',
  imports: [NzSegmentedModule],
  template: `<nz-segmented [nzOptions]="options" (nzValueChange)="handleValueChange($event)"></nz-segmented>`
})
export class NzDemoSegmentedBasicComponent {
  options = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];

  handleValueChange(e: string | number): void {
    console.log(e);
  }
}
