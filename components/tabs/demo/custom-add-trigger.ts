import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tabs-custom-add-trigger',
  template: `
    <div style="margin-bottom: 16px;">
      <button nz-button (click)="newTab()">ADD</button>
    </div>
    <nz-tabset [nzType]="'card'" [nzSelectedIndex]="index">
      <nz-tab *ngFor="let tab of tabs" [nzTitle]="titleTemplate">
        <ng-template #titleTemplate>
          <div>{{ tab }}<i nz-icon nzType="close" class="ant-tabs-close-x" (click)="closeTab(tab)"></i></div>
        </ng-template>
        Content of {{ tab }}
      </nz-tab>
    </nz-tabset>
  `
})
export class NzDemoTabsCustomAddTriggerComponent {
  index = 0;
  tabs = ['Tab 1', 'Tab 2'];

  closeTab(tab: string): void {
    this.tabs.splice(this.tabs.indexOf(tab), 1);
  }

  newTab(): void {
    this.tabs.push('New Tab');
    this.index = this.tabs.length - 1;
  }
}
