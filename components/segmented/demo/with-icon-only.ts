import { Component } from '@angular/core';

import { NzSegmentedModule, NzSegmentedOptions } from 'ng-zorro-antd/segmented';

@Component({
  selector: 'nz-demo-segmented-with-icon-only',
  imports: [NzSegmentedModule],
  template: `<nz-segmented [nzOptions]="options" />`
})
export class NzDemoSegmentedWithIconOnlyComponent {
  options: NzSegmentedOptions = [
    { value: 'List', icon: 'bars' },
    { value: 'Kanban', icon: 'appstore' }
  ];
}
