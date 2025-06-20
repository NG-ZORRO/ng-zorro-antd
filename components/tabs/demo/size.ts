import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'nz-demo-tabs-size',
  imports: [FormsModule, NzRadioModule, NzTabsModule],
  template: `
    <nz-radio-group [(ngModel)]="size">
      <label nz-radio-button nzValue="small"><span>Small</span></label>
      <label nz-radio-button nzValue="default"><span>Default</span></label>
      <label nz-radio-button nzValue="large"><span>Large</span></label>
    </nz-radio-group>
    <nz-tabs [nzSize]="size">
      @for (tab of tabs; track tab) {
        <nz-tab [nzTitle]="'Tab ' + tab">Content of tab {{ tab }}</nz-tab>
      }
    </nz-tabs>
  `
})
export class NzDemoTabsSizeComponent {
  size: 'large' | 'default' | 'small' = 'small';
  tabs = [1, 2, 3];
}
