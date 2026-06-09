import { Component, signal } from '@angular/core';

import { NzTabsModule } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'nz-demo-tabs-editable-card',
  imports: [NzTabsModule],
  template: `
    <nz-tabs [(nzSelectedIndex)]="selectedIndex" nzType="editable-card" (nzAdd)="newTab()" (nzClose)="closeTab($event)">
      @for (tab of tabs(); track tab) {
        <nz-tab nzClosable [nzTitle]="tab">Content of {{ tab }}</nz-tab>
      }
    </nz-tabs>
  `
})
export class NzDemoTabsEditableCardComponent {
  readonly tabs = signal(['Tab 1', 'Tab 2']);
  readonly selectedIndex = signal(0);

  closeTab({ index }: { index: number }): void {
    this.tabs.update(tabs => tabs.filter((_, i) => i !== index));
  }

  newTab(): void {
    this.tabs.update(tabs => [...tabs, 'New Tab']);
    this.selectedIndex.set(this.tabs().length);
  }
}
