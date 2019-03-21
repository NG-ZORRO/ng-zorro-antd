import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tabs-disabled',
  template: `
    <nz-tabset>
      <nz-tab *ngFor="let tab of tabs" [nzTitle]="tab.name" [nzDisabled]="tab.disabled">
        {{ tab.name }}
      </nz-tab>
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
