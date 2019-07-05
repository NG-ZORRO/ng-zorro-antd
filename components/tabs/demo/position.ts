import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tabs-position',
  template: `
    <div style="margin-bottom: 16px;">
      Tab position：
      <nz-select [(ngModel)]="position" style="width: 80px;">
        <nz-option *ngFor="let option of options" [nzLabel]="option.label" [nzValue]="option.value"> </nz-option>
      </nz-select>
    </div>
    <nz-tabset [nzTabPosition]="position" [nzType]="'line'">
      <nz-tab *ngFor="let tab of tabs" [nzTitle]="'Tab ' + tab"> Content of tab {{ tab }} </nz-tab>
    </nz-tabset>
  `
})
export class NzDemoTabsPositionComponent {
  position = 'top';
  tabs = [1, 2, 3];
  options = [
    { value: 'top', label: 'top' },
    { value: 'left', label: 'left' },
    { value: 'right', label: 'right' },
    { value: 'bottom', label: 'bottom' }
  ];
}
