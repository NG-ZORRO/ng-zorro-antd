import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-skeleton-complex',
  template: `
    <nz-skeleton [nzAvatar]="true" [nzParagraph]="{ rows: 4 }"></nz-skeleton>
  `
})
export class NzDemoSkeletonComplexComponent {}
