import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-tabs-extra',
  template: `
    <nz-tabset [nzTabBarExtraTemplate]="tabBarExtraContent">
      <nz-tab *ngFor="let tab of tabs">
        <ng-template #nzTabHeading>
         Tab {{tab.index}}
        </ng-template>
        <span>Content of tab {{tab.index}}</span>
      </nz-tab>
      <ng-template #tabBarExtraContent>
        <button nz-button>Extra Action</button>
      </ng-template>
    </nz-tabset>`,
  styles  : []
})
export class NzDemoTabsExtraComponent implements OnInit {
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

