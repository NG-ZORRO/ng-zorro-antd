import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tabs-icon',
  template: `
    <nz-tabset>
      <nz-tab *ngFor="let tab of tabs" [nzTitle]="titleTemplate">
        <ng-template #titleTemplate>
          <span nz-icon [nzType]="tab.icon"></span>
          {{ tab.name }}
        </ng-template>
        {{ tab.name }}
      </nz-tab>
    </nz-tabset>
  `
})
export class NzDemoTabsIconComponent {
  tabs = [
    {
      name: 'Tab 1',
      icon: 'apple'
    },
    {
      name: 'Tab 2',
      icon: 'android'
    }
  ];
}
