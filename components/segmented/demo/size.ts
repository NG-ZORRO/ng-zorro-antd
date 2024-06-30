import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-segmented-size',
  template: `<nz-segmented [nzOptions]="options" nzSize="small"></nz-segmented>
    <br />
    <nz-segmented [nzOptions]="options"></nz-segmented>
    <br />
    <nz-segmented [nzOptions]="options" nzSize="large"></nz-segmented>`,
  styles: [
    `
      .ant-segmented {
        margin-bottom: 10px;
      }
    `
  ]
})
export class NzDemoSegmentedSizeComponent {
  options = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];
}
