import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tabs-icon',
  template: `
    <nz-tabset>
      <nz-tab *ngFor="let tab of tabs" [nzTitle]="titleTemplate">
        <ng-template #titleTemplate> <i nz-icon [nzType]="tab.icon"></i>{{ tab.name }} </ng-template>
        {{ tab.name }}
      </nz-tab>
    </nz-tabset>
  `
})
export class NzDemoTabsIconComponent {
  tabs = [
    {
      active: true,
      name: 'Tab 1',
      icon: 'apple'
    },
    {
      active: false,
      name: 'Tab 2',
      icon: 'android'
    }
  ];
}
