import { Component } from '@angular/core';

import { NzSegmentedModule } from 'ng-zorro-antd/segmented';

@Component({
  selector: 'nz-demo-segmented-with-name',
  imports: [NzSegmentedModule],
  template: `<nz-segmented [nzOptions]="options" (nzValueChange)="handleValueChange($event)" nzName="group" />`
})
export class NzDemoSegmentedWithNameComponent {
  options = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];

  handleValueChange(e: string | number): void {
    console.log(e);
  }
}
