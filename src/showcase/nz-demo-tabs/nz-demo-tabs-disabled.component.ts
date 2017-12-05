import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tabs-disabled',
  template: `
    <nz-tabset>
      <nz-tab *ngFor="let tab of tabs"
        [nzDisabled]="tab.disabled">
        <ng-template #nzTabHeading>
          {{tab.name}}
        </ng-template>
        <span>{{tab.name}}</span>
      </nz-tab>
    </nz-tabset>`,
  styles  : []
})
export class NzDemoTabsDisabledComponent {
  selectedIndex = 0;
  tabs = [
    {
      name    : 'Tab 1',
      disabled: false
    },
    {
      name    : 'Tab 2',
      disabled: true
    },
    {
      name    : 'Tab 3',
      disabled: false
    }
  ];
}

