import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-experimental-image-preloading',
  template: `<nz-image [nzSrc]="src" nzWidth="200" nzHeight="200" nzPriority></nz-image>`
})
export class NzDemoExperimentalImagePreloadingComponent {
  src = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
}
