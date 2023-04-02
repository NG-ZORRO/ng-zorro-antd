import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-water-mark-multi-line',
  template: `
    <nz-water-mark [nzContent]="['Angular', 'NG Ant Design']">
      <div style="height: 500px"></div>
    </nz-water-mark>
  `
})
export class NzDemoWaterMarkMultiLineComponent {}
