import { Component } from '@angular/core';

import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzFlexModule } from 'ng-zorro-antd/flex';

@Component({
  selector: 'nz-demo-collapse-collapsible',
  imports: [NzCollapseModule, NzFlexModule],
  template: `
    <div nz-flex nzVertical nzWrap="wrap" [nzGap]="16">
      <nz-collapse>
        <nz-collapse-panel nzHeader="This is panel with header collapsible" nzCollapsible="header">
          <p style="margin:0;">
            A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome
            guest in many households across the world.
          </p>
        </nz-collapse-panel>
      </nz-collapse>
      <nz-collapse>
        <nz-collapse-panel nzHeader="This is panel with icon collapsible" nzCollapsible="icon">
          <p style="margin:0;">
            A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome
            guest in many households across the world.
          </p>
        </nz-collapse-panel>
      </nz-collapse>
      <nz-collapse>
        <nz-collapse-panel nzHeader="This is panel with disabled collapsible" nzCollapsible="disabled">
          <p style="margin:0;">
            A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome
            guest in many households across the world.
          </p>
        </nz-collapse-panel>
      </nz-collapse>
    </div>
  `
})
export class NzDemoCollapseCollapsibleComponent {}
