import { Component } from '@angular/core';

import { NzTabsModule } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'nz-demo-tabs-disabled',
  standalone: true,
  imports: [NzTabsModule],
  template: `
    <nz-tabset>
      @for (tab of tabs; track tab) {
        <nz-tab [nzTitle]="tab.name" [nzDisabled]="tab.disabled">
          {{ tab.name }}
        </nz-tab>
      }
    </nz-tabset>
  `
})
export class NzDemoTabsDisabledComponent {
  tabs = [
    {
      name: 'Tab 1',
      disabled: false
    },
    {
      name: 'Tab 2',
      disabled: true
    },
    {
      name: 'Tab 3',
      disabled: false
    }
  ];
}
