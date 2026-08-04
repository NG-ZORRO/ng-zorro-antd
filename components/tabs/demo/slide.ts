import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTabPosition, NzTabsModule } from 'ng-zorro-antd/tabs';

interface Tab {
  name: string;
  content: string;
  disabled: boolean;
}

@Component({
  selector: 'nz-demo-tabs-slide',
  imports: [FormsModule, NzRadioModule, NzTabsModule],
  template: `
    <nz-radio-group [(ngModel)]="position" style="margin-bottom: 8px;">
      <label nz-radio-button nzValue="top">Horizontal</label>
      <label nz-radio-button nzValue="left">Vertical</label>
    </nz-radio-group>

    <nz-tabs style="height:220px;" [nzTabPosition]="position()" [(nzSelectedIndex)]="selectedIndex">
      @for (tab of tabs; track tab) {
        <nz-tab [nzTitle]="tab.name" [nzDisabled]="tab.disabled">
          {{ tab.content }}
        </nz-tab>
      }
    </nz-tabs>
  `
})
export class NzDemoTabsSlideComponent {
  readonly tabs = Array.from({ length: 30 }, (_, i): Tab => ({
    name: `Tab ${i}`,
    disabled: i === 28,
    content: `Content of tab ${i}`
  }));
  readonly position = signal<NzTabPosition>('top');
  readonly selectedIndex = signal(27);
}
