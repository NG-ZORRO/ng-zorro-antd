import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTabPosition, NzTabsModule } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'nz-demo-tabs-position',
  imports: [FormsModule, NzSelectModule, NzTabsModule],
  template: `
    <div style="margin-bottom: 16px;">
      Tab position:
      <nz-select [(ngModel)]="position" style="width: 80px;">
        @for (option of options; track option.value) {
          <nz-option [nzLabel]="option.label" [nzValue]="option.value" />
        }
      </nz-select>
    </div>
    <nz-tabs [nzTabPosition]="position">
      @for (tab of tabs; track tab) {
        <nz-tab [nzTitle]="'Tab ' + tab">Content of tab {{ tab }}</nz-tab>
      }
    </nz-tabs>
  `
})
export class NzDemoTabsPositionComponent {
  position: NzTabPosition = 'top';
  tabs = [1, 2, 3];
  options = [
    { value: 'top', label: 'top' },
    { value: 'left', label: 'left' },
    { value: 'right', label: 'right' },
    { value: 'bottom', label: 'bottom' }
  ];
}
