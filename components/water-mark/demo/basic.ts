import { Component } from '@angular/core';

import { NzWaterMarkModule } from 'ng-zorro-antd/water-mark';

@Component({
  selector: 'nz-demo-water-mark-basic',
  imports: [NzWaterMarkModule],
  template: `
    <nz-water-mark nzContent="NG Ant Design">
      <div style="height: 500px"></div>
    </nz-water-mark>
  `
})
export class NzDemoWaterMarkBasicComponent {}
