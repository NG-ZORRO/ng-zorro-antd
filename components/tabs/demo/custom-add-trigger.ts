import { Component, signal } from '@angular/core';

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
      @for (tab of tabs(); track tab) {
        <nz-tab [nzClosable]="$index > 1" [nzTitle]="tab">Content of {{ tab }}</nz-tab>
      }
    </nz-tabs>
  `
})
export class NzDemoTabsCustomAddTriggerComponent {
  readonly index = signal(0);
  readonly tabs = signal(['Tab 1', 'Tab 2']);

  closeTab({ index }: { index: number }): void {
    this.tabs.update(tabs => tabs.filter((_, i) => i !== index));
  }

  newTab(): void {
    this.tabs.update(tabs => [...tabs, 'New Tab']);
    this.index.set(this.tabs().length - 1);
  }
}
