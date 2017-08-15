import { Component, OnInit } from '@angular/core';

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
export class NzDemoTabsCardComponent implements OnInit {
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

  constructor() {
  }

  ngOnInit() {
  }
}

