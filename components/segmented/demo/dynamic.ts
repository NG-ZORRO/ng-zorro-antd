import { Component, signal } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';

const defaultOptions = ['Daily', 'Weekly', 'Monthly'];

@Component({
  selector: 'nz-demo-segmented-dynamic',
  imports: [NzButtonModule, NzSegmentedModule],
  template: `
    <nz-segmented [nzOptions]="options()" />
    <br />
    <button nz-button nzType="primary" [disabled]="moreLoaded()" (click)="handleLoadMore()"> Load more options </button>
  `,
  styles: `
    .ant-segmented {
      margin-bottom: 10px;
    }
  `
})
export class NzDemoSegmentedDynamicComponent {
  readonly options = signal([...defaultOptions]);

  readonly moreLoaded = signal(false);

  handleLoadMore(): void {
    this.moreLoaded.set(true);
    this.options.set([...defaultOptions, 'Quarterly', 'Yearly']);
  }
}
