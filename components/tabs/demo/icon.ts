import { Component } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'nz-demo-tabs-icon',
  imports: [NzIconModule, NzTabsModule],
  template: `
    <nz-tabs>
      @for (tab of tabs; track tab) {
        <nz-tab [nzTitle]="titleTemplate">
          <ng-template #titleTemplate>
            <nz-icon [nzType]="tab.icon" />
            {{ tab.name }}
          </ng-template>
          {{ tab.name }}
        </nz-tab>
      }
    </nz-tabs>
  `
})
export class NzDemoTabsIconComponent {
  tabs = [
    {
      name: 'Tab 1',
      icon: 'apple'
    },
    {
      name: 'Tab 2',
      icon: 'android'
    }
  ];
}
