import { Component } from '@angular/core';

import { NzWaterMarkModule } from 'ng-zorro-antd/water-mark';

@Component({
  selector: 'nz-demo-water-mark-multi-line',
  imports: [NzWaterMarkModule],
  template: `
    <nz-water-mark [nzContent]="['Angular', 'NG Ant Design']">
      <div style="height: 500px"></div>
    </nz-water-mark>
  `
})
export class NzDemoWaterMarkMultiLineComponent {}
