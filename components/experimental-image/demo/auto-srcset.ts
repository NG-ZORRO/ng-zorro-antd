import { Component } from '@angular/core';

import { createAliObjectsLoader, NzImageModule as NzExperimentalImageModule } from 'ng-zorro-antd/experimental/image';
import { NzImageModule } from 'ng-zorro-antd/image';

@Component({
  selector: 'nz-demo-experimental-image-auto-srcset',
  standalone: true,
  imports: [NzImageModule, NzExperimentalImageModule],
  template: `<nz-image [nzSrc]="src" nzWidth="200" nzHeight="200" [nzSrcLoader]="loader" nzAutoSrcset></nz-image>`
})
export class NzDemoExperimentalImageAutoSrcsetComponent {
  src = 'jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
  loader = createAliObjectsLoader('https://zos.alipayobjects.com/rmsportal');
}
