import { Component } from '@angular/core';

import { NzImageModule } from 'ng-zorro-antd/experimental/image';

@Component({
  selector: 'nz-demo-experimental-image-preloading',
  standalone: true,
  imports: [NzImageModule],
  template: `<nz-image [nzSrc]="src" nzWidth="200" nzHeight="200" nzPriority></nz-image>`
})
export class NzDemoExperimentalImagePreloadingComponent {
  src = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
}
