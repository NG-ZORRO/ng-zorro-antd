import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-segmented-icon',
  template: ` <nz-segmented [nzOptions]="options"></nz-segmented>`,
  styles: [``]
})
export class NzDemoSegmentedIconComponent {
  options = [
    { label: 'List', value: 'List', icon: 'bars' },
    { label: 'Kanban', value: 'Kanban', icon: 'appstore' }
  ];
}
