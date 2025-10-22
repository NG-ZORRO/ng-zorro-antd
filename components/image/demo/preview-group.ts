import { Component } from '@angular/core';

import { NzImageModule } from 'ng-zorro-antd/image';

@Component({
  selector: 'nz-demo-image-preview-group',
  imports: [NzImageModule],
  template: `
    <nz-image-group>
      <img nz-image width="200px" nzSrc="https://img.alicdn.com/tfs/TB1g.mWZAL0gK0jSZFtXXXQCXXa-200-200.svg" alt="" />
      <img nz-image width="200px" nzSrc="https://img.alicdn.com/tfs/TB1Z0PywTtYBeNjy1XdXXXXyVXa-186-200.svg" alt="" />
    </nz-image-group>
  `
})
export class NzDemoImagePreviewGroupComponent {}
