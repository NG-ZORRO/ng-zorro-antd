import { Component } from '@angular/core';

import { NzImageModule } from 'ng-zorro-antd/image';

@Component({
  selector: 'nz-demo-image-basic',
  imports: [NzImageModule],
  template: `
    <img
      nz-image
      width="200px"
      height="200px"
      nzSrc="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      alt=""
    />
  `
})
export class NzDemoImageBasicComponent {}
