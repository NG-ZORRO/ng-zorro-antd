import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tabs-card-top',
  template: `
    <div class="card-container">
      <nz-tabset [nzTabPosition]="'top'" [nzType]="'card'">
        <nz-tab *ngFor="let tab of tabs">
          <ng-template #nzTabHeading>
            Tab {{ tab.index }}
          </ng-template>
          <p>Content of Tab Pane {{ tab.index }}</p>
          <p>Content of Tab Pane {{ tab.index }}</p>
          <p>Content of Tab Pane {{ tab.index }}</p>
        </nz-tab>
      </nz-tabset>
    </div>
  `,
  styles  : [
      `
      :host {
        background: #F5F5F5;
        overflow: hidden;
        padding: 24px;
        display: block;
      }

      .card-container ::ng-deep .ant-tabs-card .ant-tabs-content {
        height: 120px;
        margin-top: -16px;
      }

      .card-container ::ng-deep .ant-tabs-card .ant-tabs-content .ant-tabs-tabpane {
        background: #fff;
        padding: 16px;
      }

      .card-container ::ng-deep .ant-tabs-card .ant-tabs-bar {
        border-color: #fff;
      }

      .card-container ::ng-deep .ant-tabs-card .ant-tabs-bar .ant-tabs-tab {
        border-color: transparent;
        background: transparent;
      }

      .card-container ::ng-deep .ant-tabs-card .ant-tabs-bar .ant-tabs-tab-active {
        border-color: #fff;
        background: #fff;
      }
    `
  ]
})
export class NzDemoTabsCardTopComponent {
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
