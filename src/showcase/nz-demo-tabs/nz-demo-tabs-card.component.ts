import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tabs-card',
  template: `
    <nz-tabset [nzTabPosition]="'top'" [nzType]="'card'">
      <nz-tab *ngFor="let tab of tabs">
        <ng-template #nzTabHeading>
          Tab {{tab.index}}
        </ng-template>
        <span>Content of Tab Pane {{tab.index}}</span>
      </nz-tab>
    </nz-tabset>`,
  styles  : []
})
export class NzDemoTabsCardComponent {
  tabs = [
    {
      index: 1
    },
    {
      index: 2
    },
    {
      index: 3
    }
  ];
}

