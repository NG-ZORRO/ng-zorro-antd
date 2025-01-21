import { Component } from '@angular/core';

import { NzSplitterModule } from 'ng-zorro-antd/splitter';

@Component({
  selector: 'nz-demo-splitter-vertical',
  imports: [NzSplitterModule],
  template: `
    <nz-splitter nzLayout="vertical">
      <nz-splitter-panel>
        <div class="box">First</div>
      </nz-splitter-panel>
      <nz-splitter-panel>
        <div class="box">Second</div>
      </nz-splitter-panel>
    </nz-splitter>
  `,
  styles: `
    nz-splitter {
      height: 300px;
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
export class NzDemoSplitterVerticalComponent {}
