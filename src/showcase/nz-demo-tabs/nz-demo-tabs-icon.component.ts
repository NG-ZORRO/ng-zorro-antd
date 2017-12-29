import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tabs-icon',
  template: `
    <nz-tabset>
      <nz-tab *ngFor="let tab of tabs">
        <ng-template #nzTabHeading>
          <i [ngClass]="tab.icon"></i>
          {{tab.name}}
        </ng-template>
        <span>{{tab.name}}</span>
      </nz-tab>
    </nz-tabset>`,
  styles  : []
})
export class NzDemoTabsIconComponent {
  tabs = [
    {
      active: true,
      name  : 'Tab 1',
      icon  : 'anticon anticon-apple'
    },
    {
      active: false,
      name  : 'Tab 2',
      icon  : 'anticon anticon-android'
    }
  ];
}
