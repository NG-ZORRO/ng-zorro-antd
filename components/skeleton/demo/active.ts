import { Component } from '@angular/core';

import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

@Component({
  selector: 'nz-demo-skeleton-active',
  imports: [NzSkeletonModule],
  template: `<nz-skeleton [nzActive]="true" />`
})
export class NzDemoSkeletonActiveComponent {}
