import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-tabs-basic',
  template: `
    <nz-tabset>
      <nz-tab *ngFor="let tab of tabs">
        <ng-template #nzTabHeading>
          {{tab.name}}
        </ng-template>
        <span>{{tab.content}}</span>
      </nz-tab>
    </nz-tabset>`,
  styles  : []
})
export class NzDemoTabsBasicComponent implements OnInit {
  tabs = [
    {
      name   : 'Tab 1',
      content: 'Content of Tab Pane 1'
    },
    {
      name   : 'Tab 2',
      content: 'Content of Tab Pane 2'
    },
    {
      name   : 'Tab 3',
      content: 'Content of Tab Pane 3'
    }
  ];

  ngOnInit() {
    setTimeout(_ => {
      this.tabs[ 0 ].content = 'Change Content';
    }, 10000);
  }
}

