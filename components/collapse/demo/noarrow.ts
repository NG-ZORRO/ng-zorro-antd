import { Component } from '@angular/core';

import { NzCollapseModule } from 'ng-zorro-antd/collapse';

@Component({
  selector: 'nz-demo-collapse-noarrow',
  imports: [NzCollapseModule],
  template: `
    <nz-collapse>
      @for (panel of panels; track panel) {
        <nz-collapse-panel [nzHeader]="panel.name" [nzActive]="panel.active" [nzShowArrow]="panel.arrow">
          <p style="margin:0;">
            A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome
            guest in many households across the world.
          </p>
        </nz-collapse-panel>
      }
    </nz-collapse>
  `
})
export class NzDemoCollapseNoarrowComponent {
  panels = [
    {
      active: true,
      name: 'This is panel header 1',
      arrow: true
    },
    {
      active: false,
      arrow: false,
      name: 'This is panel header 2'
    }
  ];
}
