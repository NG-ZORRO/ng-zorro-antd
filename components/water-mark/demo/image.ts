import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-water-mark-image',
  template: `
    <nz-water-mark
      [nzWidth]="212"
      [nzHeight]="32"
      nzImage="https://img.alicdn.com/imgextra/i3/O1CN01UR3Zkq1va9fnZsZcr_!!6000000006188-55-tps-424-64.svg"
    >
      <div style="height: 500px"></div>
    </nz-water-mark>
  `
})
export class NzDemoWaterMarkImageComponent {}
