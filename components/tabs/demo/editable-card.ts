import { Component } from '@angular/core';

import { NzTabsModule } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'nz-demo-tabs-editable-card',
  imports: [NzTabsModule],
  template: `
    <nz-tabs [(nzSelectedIndex)]="selectedIndex" nzType="editable-card" (nzAdd)="newTab()" (nzClose)="closeTab($event)">
      @for (tab of tabs; track tab) {
        <nz-tab nzClosable [nzTitle]="tab">Content of {{ tab }}</nz-tab>
      }
    </nz-tabs>
  `
})
export class NzDemoTabsEditableCardComponent {
  tabs = ['Tab 1', 'Tab 2'];
  selectedIndex = 0;

  closeTab({ index }: { index: number }): void {
    this.tabs.splice(index, 1);
  }

  newTab(): void {
    this.tabs.push('New Tab');
    this.selectedIndex = this.tabs.length;
  }
}
