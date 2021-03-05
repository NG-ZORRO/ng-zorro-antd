import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-space-split',
  template: `
    <nz-space [nzSplit]="spaceSplit">
      <ng-template #spaceSplit>
        <nz-divider nzType="vertical"></nz-divider>
      </ng-template>

      <a *nzSpaceItem nz-typography>Link</a>
      <a *nzSpaceItem nz-typography>Link</a>
      <a *nzSpaceItem nz-typography>Link</a>
    </nz-space>
  `
})
export class NzDemoSpaceSplitComponent {
  size = 8;
}
