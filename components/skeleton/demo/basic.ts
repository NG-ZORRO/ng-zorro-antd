import { Component } from '@angular/core';

import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

@Component({
  selector: 'nz-demo-skeleton-basic',
  standalone: true,
  imports: [NzSkeletonModule],
  template: `<nz-skeleton></nz-skeleton>`
})
export class NzDemoSkeletonBasicComponent {}
