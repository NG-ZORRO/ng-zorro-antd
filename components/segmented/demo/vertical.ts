import { Component } from '@angular/core';

import { NzSegmentedModule } from 'ng-zorro-antd/segmented';

@Component({
  selector: 'nz-demo-segmented-vertical',
  imports: [NzSegmentedModule],
  template: ` <nz-segmented [nzOptions]="options" nzVertical />`
})
export class NzDemoSegmentedVerticalComponent {
  options = [
    { value: 'List', icon: 'bars' },
    { value: 'Kanban', icon: 'appstore' }
  ];
}
