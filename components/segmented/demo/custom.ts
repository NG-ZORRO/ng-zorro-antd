import { Component, TemplateRef, ViewChild } from '@angular/core';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSegmentedModule, NzSegmentedOption } from 'ng-zorro-antd/segmented';

@Component({
  selector: 'nz-demo-segmented-custom',
  standalone: true,
  imports: [NzAvatarModule, NzSegmentedModule],
  template: `
    <nz-segmented [nzLabelTemplate]="templateRef" [nzOptions]="options"></nz-segmented>
    <ng-template #temp let-index="index">
      @switch (index) {
        @case (0) {
          <nz-avatar nzSrc="https://joeschmoe.io/api/v1/random"></nz-avatar>
          <div>User 1</div>
        }
        @case (1) {
          <nz-avatar nzText="K"></nz-avatar>
          <div>User 2</div>
        }
        @case (2) {
          <nz-avatar nzIcon="user"></nz-avatar>
          <div>User 3</div>
        }
      }
    </ng-template>
  `
})
export class NzDemoSegmentedCustomComponent {
  @ViewChild('temp', { static: true, read: TemplateRef }) templateRef!: TemplateRef<{
    $implicit: NzSegmentedOption;
    index: number;
  }>;

  options = [
    { label: 'user1', value: 'user1', useTemplate: true },
    { label: 'user2', value: 'user2', useTemplate: true },
    { label: 'user3', value: 'user3', useTemplate: true }
  ];
}
