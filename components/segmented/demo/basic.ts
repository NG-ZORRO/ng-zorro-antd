import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-segmented-basic',
  template: `<nz-segmented [nzOptions]="options" (nzValueChange)="handleIndexChange($event)"></nz-segmented>`,
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
export class NzDemoSegmentedBasicComponent {
  options = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];

  handleIndexChange(e: number): void {
    console.log(e);
  }
}
