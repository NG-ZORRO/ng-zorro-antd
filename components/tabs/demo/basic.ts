import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tabs-basic',
  template: `
    <nz-tabset>
      <nz-tab>
        <ng-template #nzTabHeading>
          Tab 1
        </ng-template>
        <span>Content of Tab Pane 1</span>
      </nz-tab>
      <nz-tab>
        <ng-template #nzTabHeading>
          Tab 2
        </ng-template>
        <span>Content of Tab Pane 2</span>
      </nz-tab>
      <nz-tab>
        <ng-template #nzTabHeading>
          Tab 3
        </ng-template>
        <span>Content of Tab Pane 3</span>
      </nz-tab>
    </nz-tabset>`,
  styles  : []
})
export class NzDemoTabsBasicComponent {
}
