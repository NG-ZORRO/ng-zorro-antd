import { Component } from '@angular/core';

const defaultOptions = ['Daily', 'Weekly', 'Monthly'];

@Component({
  selector: 'nz-demo-segmented-dynamic',
  template: `<nz-segmented [nzOptions]="options"></nz-segmented>
    <br />
    <button nz-button nzType="primary" [disabled]="moreLoaded" (click)="handleLoadMore()"> Load more options </button>`,
  styles: [
    `
      .code-box-demo {
        overflow-x: auto;
      }

      .ant-segmented {
        margin-bottom: 10px;
      }
    `
  ]
})
export class NzDemoSegmentedDynamicComponent {
  options = [...defaultOptions];

  moreLoaded = false;

  handleLoadMore(): void {
    this.moreLoaded = true;
    this.options = [...defaultOptions, 'Quarterly', 'Yearly'];
  }
}
