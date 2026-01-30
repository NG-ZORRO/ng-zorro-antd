import { Component } from '@angular/core';

import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

@Component({
  selector: 'nz-demo-skeleton-basic',
  imports: [NzSkeletonModule],
  template: `<nz-skeleton />`
})
export class NzDemoSkeletonBasicComponent {}
