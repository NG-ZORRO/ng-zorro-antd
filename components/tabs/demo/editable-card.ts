import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tabs-editable-card',
  template: `
    <nz-tabset [(nzSelectedIndex)]="selectedIndex" nzType="editable-card" (nzAdd)="newTab()" (nzClose)="closeTab($event)">
      <nz-tab *ngFor="let tab of tabs" nzClosable [nzTitle]="tab">Content of {{ tab }}</nz-tab>
    </nz-tabset>
  `
})
export class NzDemoTabsEditableCardComponent {
  tabs = ['Tab 1', 'Tab 2'];
  selectedIndex = 0;

  closeTab({ index }: { index: number }): void {
    this.tabs.splice(index, 1);
  }

  newTab(): void {
    this.tabs.push('New Tab');
    this.selectedIndex = this.tabs.length;
  }
}
