import { Component } from '@angular/core';

import { NzWatermarkModule } from 'ng-zorro-antd/watermark';

@Component({
  selector: 'nz-demo-watermark-multi-line',
  imports: [NzWatermarkModule],
  template: `
    <nz-watermark [nzContent]="['Angular', 'NG Ant Design']">
      <div style="height: 500px"></div>
    </nz-watermark>
  `
})
export class NzDemoWatermarkMultiLineComponent {}
