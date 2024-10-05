import { Component } from '@angular/core';

import { NzSegmentedModule } from 'ng-zorro-antd/segmented';

@Component({
  selector: 'nz-demo-segmented-icon',
  standalone: true,
  imports: [NzSegmentedModule],
  template: `<nz-segmented [nzOptions]="options"></nz-segmented>`
})
export class NzDemoSegmentedIconComponent {
  options = [
    { label: 'List', value: 'List', icon: 'bars' },
    { label: 'Kanban', value: 'Kanban', icon: 'appstore' }
  ];
}
