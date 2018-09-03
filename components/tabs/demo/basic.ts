import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tabs-basic',
  template: `
    <button nz-button (click)="clear()" nzType='primary'>Clear</button>
    <nz-tabset [(nzSelectedIndex)]="idx">
      <nz-tab *ngFor="let tab of tabs" [nzTitle]="nzTabHeading">
        <ng-template #nzTabHeading>
          {{tab.name}}
        </ng-template>
        <span>{{tab.content}}</span>
      </nz-tab>
    </nz-tabset>`
})
export class NzDemoTabsBasicComponent {
  name = 'Angular';
  idx = 10;
  tabs = Array(20).fill({}).map(v => {
    return {
      name   : 'Tab 1',
      content: 'Content of Tab Pane 1'
    };
  });

  clear(): void {
    this.tabs = [
      { name: 'Tab', content: 'Content of tab' }
    ];
  }
}
