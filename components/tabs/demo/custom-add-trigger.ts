import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tabs-custom-add-trigger',
  template: `
    <div style="margin-bottom: 16px;">
      <button nz-button (click)="newTab()">ADD</button>
    </div>
    <nz-tabset [nzType]="'card'" [nzSelectedIndex]="index">
      <nz-tab *ngFor="let tab of tabs">
        <ng-template #nzTabHeading>
          <div>
            {{ tab.name }}
            <i class="anticon anticon-cross" (click)="closeTab(tab)"></i>
          </div>
        </ng-template>
        <span>Content of {{ tab.name }}</span>
      </nz-tab>
    </nz-tabset>`,
  styles  : []
})
export class NzDemoTabsCustomAddTriggerComponent {
  index = 0;
  tabs = [
    {
      name: 'Tab 1'
    },
    {
      name: 'Tab 2'
    }
  ];

  closeTab(tab): void {
    this.tabs.splice(this.tabs.indexOf(tab), 1);
  }

  newTab(): void {
    this.tabs.push({
      name: 'New Tab'
    });
    this.index = this.tabs.length - 1;
  }
}
