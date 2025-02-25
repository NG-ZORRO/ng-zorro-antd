import { Component } from '@angular/core';

import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'nz-demo-space-split',
  imports: [NzDividerModule, NzSpaceModule],
  template: `
    <nz-space [nzSplit]="spaceSplit">
      <ng-template #spaceSplit>
        <nz-divider nzType="vertical"></nz-divider>
      </ng-template>

      <a *nzSpaceItem>Link</a>
      <a *nzSpaceItem>Link</a>
      <a *nzSpaceItem>Link</a>
    </nz-space>
  `
})
export class NzDemoSpaceSplitComponent {
  size = 8;
}
