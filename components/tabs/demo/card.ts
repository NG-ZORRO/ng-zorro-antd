import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tabs-card',
  template: `
    <nz-tabset [nzTabPosition]="'top'" [nzType]="'card'">
      <nz-tab *ngFor="let tab of tabs" [nzTitle]="'Tab' + tab"> Content of Tab Pane {{ tab }} </nz-tab>
    </nz-tabset>
  `
})
export class NzDemoTabsCardComponent {
  tabs = [1, 2, 3];
}
