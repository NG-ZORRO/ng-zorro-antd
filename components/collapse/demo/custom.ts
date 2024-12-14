import { Component } from '@angular/core';

import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzIconModule } from 'ng-zorro-antd/icon';

interface Panel {
  active: boolean;
  disabled: boolean;
  name: string;
  icon?: string;
}

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
          [style]="customStyle"
          [nzExpandedIcon]="!$first ? panel.icon || expandedIcon : undefined"
        >
          <p>{{ panel.name }} content</p>
          <ng-template #expandedIcon let-active>
            {{ active }}
            <nz-icon nzType="caret-right" class="ant-collapse-arrow" [nzRotate]="p.nzActive ? 90 : -90" />
          </ng-template>
        </nz-collapse-panel>
      }
    </nz-collapse>
  `
})
export class NzDemoCollapseCustomComponent {
  readonly panels: Panel[] = [
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
  readonly customStyle = {
    background: '#f7f7f7',
    'border-radius': '4px',
    'margin-bottom': '24px',
    border: '0px'
  };
}
