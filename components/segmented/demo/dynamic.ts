import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';

const defaultOptions = ['Daily', 'Weekly', 'Monthly'];

@Component({
  selector: 'nz-demo-segmented-dynamic',
  standalone: true,
  imports: [NzButtonModule, NzSegmentedModule],
  template: `
    <nz-segmented [nzOptions]="options"></nz-segmented>
    <br />
    <button nz-button nzType="primary" [disabled]="moreLoaded" (click)="handleLoadMore()"> Load more options </button>
  `
})
export class NzDemoSegmentedDynamicComponent {
  options = [...defaultOptions];

  moreLoaded = false;

  handleLoadMore(): void {
    this.moreLoaded = true;
    this.options = [...defaultOptions, 'Quarterly', 'Yearly'];
  }
}
