import { Component } from '@angular/core';

import { NzSplitterModule } from 'ng-zorro-antd/splitter';

@Component({
  selector: 'nz-demo-splitter-multiple',
  imports: [NzSplitterModule],
  template: `
    <nz-splitter>
      <nz-splitter-panel [nzCollapsible]="true">
        <div class="box">Panel 1</div>
      </nz-splitter-panel>
      <nz-splitter-panel [nzCollapsible]="{ start: true }">
        <div class="box">Panel 2</div>
      </nz-splitter-panel>
      <nz-splitter-panel>
        <div class="box">Panel 3</div>
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
export class NzDemoSplitterMultipleComponent {}
