import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'nz-demo-tabs-extra',
  imports: [NzButtonModule, NzTabsModule, NzCheckboxModule, FormsModule],
  template: `
    <nz-tabs [nzTabBarExtraContent]="extraTemplate">
      @for (tab of tabs; track tab) {
        <nz-tab [nzTitle]="'Tab ' + tab">Content of tab {{ tab }}</nz-tab>
      }
    </nz-tabs>
    <ng-template #extraTemplate>
      <button nz-button>Extra Action</button>
    </ng-template>

    <br />
    <br />
    <p>You can also specify its direction or both side</p>
    <br />
    <nz-checkbox-group [nzOptions]="positionOptions" [(ngModel)]="positions" />
    <br />
    <br />

    <nz-tabs>
      @if (positions.includes('start')) {
        <button *nzTabBarExtraContent="'start'" nz-button [style.margin-right.px]="16">Start Extra Action</button>
      }
      @if (positions.includes('end')) {
        <button *nzTabBarExtraContent="'end'" nz-button [style.margin-left.px]="16">End Extra Action</button>
      }

      @for (tab of tabs; track tab) {
        <nz-tab [nzTitle]="'Tab ' + tab">Content of tab {{ tab }}</nz-tab>
      }
    </nz-tabs>
  `
})
export class NzDemoTabsExtraComponent {
  tabs = [1, 2, 3];
  positionOptions = [
    { label: 'start', value: 'start' },
    { label: 'end', value: 'end' }
  ];
  positions = ['start', 'end'];
}
