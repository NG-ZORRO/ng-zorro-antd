import { Component } from '@angular/core';

import { NzTabsModule } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'nz-demo-tabs-basic',
  imports: [NzTabsModule],
  template: `
    <nz-tabs>
      <nz-tab nzTitle="Tab 1">Content of Tab Pane 1</nz-tab>
      <nz-tab nzTitle="Tab 2">Content of Tab Pane 2</nz-tab>
      <nz-tab nzTitle="Tab 3">Content of Tab Pane 3</nz-tab>
    </nz-tabs>
  `
})
export class NzDemoTabsBasicComponent {}
