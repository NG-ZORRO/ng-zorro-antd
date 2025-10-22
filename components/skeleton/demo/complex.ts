import { Component } from '@angular/core';

import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

@Component({
  selector: 'nz-demo-skeleton-complex',
  imports: [NzSkeletonModule],
  template: `<nz-skeleton [nzAvatar]="true" [nzParagraph]="{ rows: 4 }"></nz-skeleton>`
})
export class NzDemoSkeletonComplexComponent {}
