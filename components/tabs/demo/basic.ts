import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tabs-basic',
  template: `
    <nz-tabset>
      <nz-tab nzTitle="Tab 1">
        <span>Content of Tab Pane 1</span>
      </nz-tab>
      <nz-tab nzTitle="Tab 2">
        <span>Content of Tab Pane 2</span>
      </nz-tab>
      <nz-tab nzTitle="Tab 3">
        <span>Content of Tab Pane 3</span>
      </nz-tab>
    </nz-tabset>`
})
export class NzDemoTabsBasicComponent {
}
