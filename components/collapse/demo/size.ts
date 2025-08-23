import { Component } from '@angular/core';

import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzFlexModule } from 'ng-zorro-antd/flex';

type Size = 'small' | 'middle' | 'large';

@Component({
  selector: 'nz-demo-collapse-size',
  template: `
    <div nz-flex nzWrap="wrap" nzVertical [nzGap]="8">
      <nz-collapse>
        <nz-collapse-panel nzHeader="This is the default panel size" nzActive>
          <p style="margin:0;">
            A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome
            guest in many households across the world.
          </p>
        </nz-collapse-panel>
      </nz-collapse>
      @for (panel of panels; track panel) {
        <nz-collapse [nzSize]="panel.size">
          <nz-collapse-panel [nzHeader]="panel.name" [nzActive]="panel.active">
            <p style="margin:0;">
              A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a
              welcome guest in many households across the world.
            </p>
          </nz-collapse-panel>
        </nz-collapse>
      }
    </div>
  `,
  imports: [NzCollapseModule, NzFlexModule]
})
export class NzDemoCollapseSizeComponent {
  panels = [
    {
      active: true,
      name: 'This is the small panel size',
      size: 'small' as Size
    },
    {
      active: true,
      name: 'This is the large panel size',
      size: 'large' as Size
    }
  ];
}
