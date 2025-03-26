import { Component } from '@angular/core';

import { NzSplitterModule } from 'ng-zorro-antd/splitter';

@Component({
  selector: 'nz-demo-splitter-complex',
  imports: [NzSplitterModule],
  template: `
    <nz-splitter>
      <nz-splitter-panel [nzCollapsible]="true">
        <div class="box">Left</div>
      </nz-splitter-panel>
      <nz-splitter-panel>
        <nz-splitter nzLayout="vertical">
          <nz-splitter-panel>
            <div class="box">Top</div>
          </nz-splitter-panel>
          <nz-splitter-panel>
            <div class="box">Bottom</div>
          </nz-splitter-panel>
        </nz-splitter>
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
export class NzDemoSplitterComplexComponent {}
