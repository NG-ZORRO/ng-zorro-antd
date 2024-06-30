import { Component } from '@angular/core';

import { NzSegmentedOptions } from 'ng-zorro-antd/segmented';

@Component({
  selector: 'nz-demo-segmented-with-icon-only',
  template: `<nz-segmented [nzOptions]="options"></nz-segmented>`
})
export class NzDemoSegmentedWithIconOnlyComponent {
  options: NzSegmentedOptions = [
    { value: 'List', icon: 'bars' },
    { value: 'Kanban', icon: 'appstore' }
  ];
}
