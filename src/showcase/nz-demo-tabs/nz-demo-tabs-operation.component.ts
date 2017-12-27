import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tabs-operation',
  template: `
    <nz-tabset [nzType]="'card'">
      <nz-tab *ngFor="let tab of tabs">
        <ng-template #nzTabHeading>
          <div>
            {{tab.name}}
            <i class="anticon anticon-cross" (click)="closeTab(tab)"></i>
          </div>
        </ng-template>
        <span>Content of {{tab.name}}</span>
      </nz-tab>
      <ng-template #nzTabBarExtraContent>
        <i class="ant-tabs-new-tab anticon anticon-plus" (click)="newTab()"></i>
      </ng-template>
    </nz-tabset>`,
  styles  : []
})
export class NzDemoTabsOperationComponent {
  tabs = [
    {
      name: 'Tab 1'
    },
    {
      name: 'Tab 2'
    }
  ];

  closeTab(tab) {
    this.tabs.splice(this.tabs.indexOf(tab), 1);
  }

  newTab() {
    this.tabs.push({
      name: 'New Tab'
    });
  }
}

