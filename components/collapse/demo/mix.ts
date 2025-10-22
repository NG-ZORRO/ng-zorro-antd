import { Component } from '@angular/core';

import { NzCollapseModule } from 'ng-zorro-antd/collapse';

@Component({
  selector: 'nz-demo-collapse-mix',
  imports: [NzCollapseModule],
  template: `
    <nz-collapse>
      @for (panel of panels; track panel) {
        <nz-collapse-panel [nzHeader]="panel.name" [nzActive]="panel.active">
          <p>{{ panel.name }}</p>
          @if (panel.childPanel && panel.childPanel.length > 0) {
            <div>
              <nz-collapse>
                @for (childPanel of panel.childPanel; track childPanel) {
                  <nz-collapse-panel [nzHeader]="childPanel.name" [nzActive]="childPanel.active">
                    <p>
                      A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as
                      a welcome guest in many households across the world.
                    </p>
                  </nz-collapse-panel>
                }
              </nz-collapse>
            </div>
          }
        </nz-collapse-panel>
      }
    </nz-collapse>
  `
})
export class NzDemoCollapseMixComponent {
  panels = [
    {
      active: true,
      disabled: false,
      name: 'This is panel header 1',
      childPanel: [
        {
          active: true,
          name: 'This is panel header 1-1'
        },
        {
          active: false,
          name: 'This is panel header 1-2'
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
