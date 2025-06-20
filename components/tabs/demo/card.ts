import { Component } from '@angular/core';

import { NzTabsModule } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'nz-demo-tabs-card',
  imports: [NzTabsModule],
  template: `
    <nz-tabs nzType="card">
      @for (tab of tabs; track tab) {
        <nz-tab [nzTitle]="'Tab' + tab">Content of Tab Pane {{ tab }}</nz-tab>
      }
    </nz-tabs>
  `
})
export class NzDemoTabsCardComponent {
  tabs = [1, 2, 3];
}
