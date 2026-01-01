import { Component } from '@angular/core';

import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'nz-demo-collapse-custom',
  imports: [NzIconModule, NzCollapseModule],
  template: `
    <nz-collapse [nzBordered]="false">
      @for (panel of panels; track panel) {
        <nz-collapse-panel
          #p
          [nzHeader]="panel.name"
          [nzActive]="panel.active"
          [nzExpandedIcon]="!$first ? panel.icon || expandedIcon : undefined"
        >
          <p>{{ panel.name }} content</p>
          <ng-template #expandedIcon let-active>
            {{ active }}
            <nz-icon nzType="caret-right" class="ant-collapse-arrow" [nzRotate]="p.active() ? 90 : -90" />
          </ng-template>
        </nz-collapse-panel>
      }
    </nz-collapse>
  `,
  styles: `
    nz-collapse {
      background: transparent;
    }

    nz-collapse-panel {
      margin-bottom: 24px;
      background: rgba(0, 0, 0, 0.02);
      border-radius: 8px !important;
      border: none !important;
    }
  `
})
export class NzDemoCollapseCustomComponent {
  readonly panels = [
    {
      active: true,
      disabled: false,
      name: 'This is panel header 1'
    },
    {
      active: false,
      disabled: true,
      name: 'This is panel header 2',
      icon: 'double-right'
    },
    {
      active: false,
      disabled: false,
      name: 'This is panel header 3'
    }
  ];
}
