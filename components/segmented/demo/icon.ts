import { Component } from '@angular/core';

import { NzSegmentedModule } from 'ng-zorro-antd/segmented';

@Component({
  selector: 'nz-demo-segmented-icon',
  imports: [NzSegmentedModule],
  template: `<nz-segmented [nzOptions]="options" />`
})
export class NzDemoSegmentedIconComponent {
  options = [
    { label: 'List', value: 'List', icon: 'bars' },
    { label: 'Kanban', value: 'Kanban', icon: 'appstore' }
  ];
}
