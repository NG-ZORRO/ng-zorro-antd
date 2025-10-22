import { Component } from '@angular/core';

import { NzCollapseModule } from 'ng-zorro-antd/collapse';

@Component({
  selector: 'nz-demo-collapse-borderless',
  imports: [NzCollapseModule],
  template: `
    <nz-collapse [nzBordered]="false">
      @for (panel of panels; track panel) {
        <nz-collapse-panel [nzHeader]="panel.name" [nzActive]="panel.active">
          <p>{{ panel.name }} content</p>
        </nz-collapse-panel>
      }
    </nz-collapse>
  `
})
export class NzDemoCollapseBorderlessComponent {
  panels = [
    {
      active: true,
      disabled: false,
      name: 'This is panel header 1',
      childPannel: [
        {
          active: false,
          disabled: true,
          name: 'This is panel header 1-1'
        }
      ]
    },
    {
      active: false,
      disabled: true,
      name: 'This is panel header 2'
    },
    {
      active: false,
      disabled: false,
      name: 'This is panel header 3'
    }
  ];
}
