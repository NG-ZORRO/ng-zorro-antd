import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tabs-card',
  template: `
    <nz-tabset [nzTabPosition]="'top'" [nzType]="'card'">
      <nz-tab *ngFor="let tab of tabs" [nzTitle]="'Tab' + tab ">
        <span>Content of Tab Pane {{ tab }}</span>
      </nz-tab>
    </nz-tabset>`,
  styles  : []
})
export class NzDemoTabsCardComponent {
  tabs = [ 1, 2, 3 ];
}
