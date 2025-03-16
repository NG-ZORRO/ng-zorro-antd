import { Component } from '@angular/core';

import { NzSplitterModule } from 'ng-zorro-antd/splitter';

@Component({
  selector: 'nz-demo-splitter-lazy',
  imports: [NzSplitterModule],
  template: `
    <nz-splitter nzLazy>
      <nz-splitter-panel nzDefaultSize="40%" nzMin="20%" nzMax="70%">
        <div class="box">First</div>
      </nz-splitter-panel>
      <nz-splitter-panel>
        <div class="box">Second</div>
      </nz-splitter-panel>
    </nz-splitter>
    <br />
    <nz-splitter nzLazy nzLayout="vertical">
      <nz-splitter-panel nzDefaultSize="40%" nzMin="30%" nzMax="70%">
        <div class="box">First</div>
      </nz-splitter-panel>
      <nz-splitter-panel>
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
export class NzDemoSplitterLazyComponent {}
