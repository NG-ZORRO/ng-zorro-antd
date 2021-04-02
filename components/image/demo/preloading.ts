import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-image-preloading',
  template: `
    <nz-image [nzSrc]="src" nzWidth="200" nzHeight="200" nzPreload></nz-image>
  `
})
export class NzDemoImagePreloadingComponent {
  src = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
}
