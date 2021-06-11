import { Component } from '@angular/core';
import { createAliObjectsLoader } from 'ng-zorro-antd/experimental/image';

@Component({
  selector: 'nz-demo-experimental-image-auto-srcset',
  template: `<nz-image [nzSrc]="src" nzWidth="200" nzHeight="200" [nzSrcLoader]="loader" nzAutoSrcset></nz-image>`
})
export class NzDemoExperimentalImageAutoSrcsetComponent {
  src = 'jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
  loader = createAliObjectsLoader('https://zos.alipayobjects.com/rmsportal');
}
