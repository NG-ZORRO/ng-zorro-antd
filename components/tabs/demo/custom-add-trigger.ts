import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tabs-custom-add-trigger',
  template: `
    <div style="margin-bottom: 16px;">
      <button nz-button (click)="newTab()">ADD</button>
    </div>
    <nz-tabset [(nzSelectedIndex)]="index" nzType="editable-card" nzHideAdd (nzClose)="closeTab($event)">
      <nz-tab *ngFor="let tab of tabs; let i = index" [nzClosable]="i > 1" [nzTitle]="tab">Content of {{ tab }}</nz-tab>
    </nz-tabset>
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
