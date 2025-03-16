import { Component } from '@angular/core';

import { NzSplitterModule } from 'ng-zorro-antd/splitter';

@Component({
  selector: 'nz-demo-splitter-collapsible',
  imports: [NzSplitterModule],
  template: `
    <nz-splitter>
      <nz-splitter-panel nzMin="20%" [nzCollapsible]="true">
        <div class="box">First</div>
      </nz-splitter-panel>
      <nz-splitter-panel [nzCollapsible]="true">
        <div class="box">Second</div>
      </nz-splitter-panel>
    </nz-splitter>
    <br />
    <nz-splitter nzLayout="vertical">
      <nz-splitter-panel nzMin="20%" [nzCollapsible]="true">
        <div class="box">First</div>
      </nz-splitter-panel>
      <nz-splitter-panel [nzCollapsible]="true">
        <div class="box">Second</div>
      </nz-splitter-panel>
    </nz-splitter>
  `,
  styles: `
    nz-splitter {
      height: 200px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .box {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `
})
export class NzDemoSplitterCollapsibleComponent {}
