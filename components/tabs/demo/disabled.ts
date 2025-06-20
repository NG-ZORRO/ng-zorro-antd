import { Component } from '@angular/core';

import { NzTabsModule } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'nz-demo-tabs-disabled',
  imports: [NzTabsModule],
  template: `
    <nz-tabs>
      @for (tab of tabs; track tab) {
        <nz-tab [nzTitle]="tab.name" [nzDisabled]="tab.disabled">
          {{ tab.name }}
        </nz-tab>
      }
    </nz-tabs>
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
