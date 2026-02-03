import { Component } from '@angular/core';

import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@Component({
  selector: 'nz-demo-collapse-size',
  imports: [NzCollapseModule, NzDividerModule],
  template: `
    <nz-divider nzText="Default Size" nzOrientation="left" />
    <nz-collapse>
      <nz-collapse-panel nzHeader="This is default size panel header" nzActive>
        <p style="margin:0;">
          A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome
          guest in many households across the world.
        </p>
      </nz-collapse-panel>
    </nz-collapse>
    <nz-divider nzText="Small Size" nzOrientation="left" />
    <nz-collapse nzSize="small">
      <nz-collapse-panel nzHeader="This is small size panel header" nzActive>
        <p style="margin:0;">
          A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome
          guest in many households across the world.
        </p>
      </nz-collapse-panel>
    </nz-collapse>
    <nz-divider nzText="Large Size" nzOrientation="left" />
    <nz-collapse nzSize="large">
      <nz-collapse-panel nzHeader="This is large size panel header" nzActive>
        <p style="margin:0;">
          A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome
          guest in many households across the world.
        </p>
      </nz-collapse-panel>
    </nz-collapse>
  `
})
export class NzDemoCollapseSizeComponent {}
