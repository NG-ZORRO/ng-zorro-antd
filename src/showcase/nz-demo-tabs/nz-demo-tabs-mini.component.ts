import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tabs-mini',
  template: `
    <nz-tabset [nzSize]="'small'">
      <nz-tab *ngFor="let tab of tabs">
        <ng-template #nzTabHeading>
          Tab {{tab.index}}
        </ng-template>
        <span>Content of tab {{tab.index}}</span>
      </nz-tab>
    </nz-tabset>`,
  styles  : []
})
export class NzDemoTabsMiniComponent {
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
}
