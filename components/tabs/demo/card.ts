import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tabs-card',
  template: `
    <nz-tabset nzType="card">
      @for (tab of tabs; track tab) {
        <nz-tab [nzTitle]="'Tab' + tab">Content of Tab Pane {{ tab }}</nz-tab>
      }
    </nz-tabset>
  `
})
export class NzDemoTabsCardComponent {
  tabs = [1, 2, 3];
}
