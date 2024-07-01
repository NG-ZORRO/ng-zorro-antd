import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-segmented-block',
  template: `<nz-segmented [nzOptions]="options" [nzBlock]="true"></nz-segmented>`,
  styles: [
    `
      .code-box-demo {
        overflow-x: auto;
      }

      .code-box-demo .ant-segmented {
        margin-bottom: 10px;
      }
    `
  ]
})
export class NzDemoSegmentedBlockComponent {
  options = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];
}
