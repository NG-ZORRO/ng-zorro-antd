import { Component } from '@angular/core';

import { NzWatermarkModule } from 'ng-zorro-antd/watermark';

@Component({
  selector: 'nz-demo-watermark-basic',
  imports: [NzWatermarkModule],
  template: `
    <nz-watermark nzContent="NG Ant Design">
      <div style="height: 500px"></div>
    </nz-watermark>
  `
})
export class NzDemoWatermarkBasicComponent {}
