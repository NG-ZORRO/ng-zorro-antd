import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'nz-demo-tabs-custom-add-trigger',
  imports: [NzButtonModule, NzTabsModule],
  template: `
    <div style="margin-bottom: 16px;">
      <button nz-button (click)="newTab()">ADD</button>
    </div>
    <nz-tabs [(nzSelectedIndex)]="index" nzType="editable-card" nzHideAdd (nzClose)="closeTab($event)">
      @for (tab of tabs; track tab; let i = $index) {
        <nz-tab [nzClosable]="i > 1" [nzTitle]="tab">Content of {{ tab }}</nz-tab>
      }
    </nz-tabs>
  `
})
export class NzDemoTabsCustomAddTriggerComponent {
  index = 0;
  tabs = ['Tab 1', 'Tab 2'];

  closeTab({ index }: { index: number }): void {
    this.tabs.splice(index, 1);
  }

  newTab(): void {
    this.tabs.push('New Tab');
    this.index = this.tabs.length - 1;
  }
}
