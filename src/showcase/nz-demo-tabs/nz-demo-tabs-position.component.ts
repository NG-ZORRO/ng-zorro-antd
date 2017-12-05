import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tabs-position',
  template: `
    <div style="margin-bottom: 16px;">
      Tab position：
      <nz-select [(ngModel)]="_position" style="width: 80px;">
        <nz-option
          *ngFor="let option of options"
          [nzLabel]="option.label"
          [nzValue]="option.value">
        </nz-option>
      </nz-select>
    </div>
    <nz-tabset [nzTabPosition]="_position" [nzType]="'line'">
      <nz-tab *ngFor="let tab of tabs">
        <ng-template #nzTabHeading>
          Tab {{tab.index}}
        </ng-template>
        <span>Content of tab {{tab.index}}</span>
      </nz-tab>
    </nz-tabset>`,
  styles  : []
})
export class NzDemoTabsPositionComponent {
  _position = 'top';
  tabs = [
    {
      index: 1
    },
    {
      index: 2
    },
    {
      index: 3
    }
  ];
  options = [
    { value: 'top', label: 'top' },
    { value: 'left', label: 'left' },
    { value: 'right', label: 'right' },
    { value: 'bottom', label: 'bottom' }
  ];
}
