import { Component } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'nz-demo-tag-icon',
  imports: [NzIconModule, NzTagModule],
  template: `
    <nz-tag nzColor="#55acee">
      <nz-icon nzType="twitter" />
      <span>Twitter</span>
    </nz-tag>
    <nz-tag nzColor="#cd201f">
      <nz-icon nzType="youtube" />
      <span>Youtube</span>
    </nz-tag>
    <nz-tag nzColor="#3b5999">
      <nz-icon nzType="facebook" />
      <span>Facebook</span>
    </nz-tag>
    <nz-tag nzColor="#55acee">
      <nz-icon nzType="linkedin" />
      <span>LinkedIn</span>
    </nz-tag>
  `
})
export class NzDemoTagIconComponent {}
