import { Component } from '@angular/core';

import { NzCollapseModule } from 'ng-zorro-antd/collapse';

@Component({
  selector: 'nz-demo-collapse-accordion',
  imports: [NzCollapseModule],
  template: `
    <nz-collapse nzAccordion>
      @for (panel of panels; track panel) {
        <nz-collapse-panel [nzHeader]="panel.name" [nzActive]="panel.active">
          <p>{{ panel.name }} content</p>
        </nz-collapse-panel>
      }
    </nz-collapse>
  `
})
export class NzDemoCollapseAccordionComponent {
  panels = [
    {
      active: true,
      name: 'This is panel header 1',
      childPanel: [
        {
          active: false,
          name: 'This is panel header 1-1'
        }
      ]
    },
    {
      active: false,
      name: 'This is panel header 2'
    },
    {
      active: false,
      name: 'This is panel header 3'
    }
  ];
}
