import { Component } from '@angular/core';

import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

@Component({
  selector: 'nz-demo-skeleton-active',
  standalone: true,
  imports: [NzSkeletonModule],
  template: `<nz-skeleton [nzActive]="true"></nz-skeleton>`
})
export class NzDemoSkeletonActiveComponent {}
