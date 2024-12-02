import { Component } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'nz-demo-tag-icon',
  imports: [NzIconModule, NzTagModule],
  template: `
    <nz-tag nzColor="#55acee">
      <span nz-icon nzType="twitter"></span>
      <span>Twitter</span>
    </nz-tag>
    <nz-tag nzColor="#cd201f">
      <span nz-icon nzType="youtube"></span>
      <span>Youtube</span>
    </nz-tag>
    <nz-tag nzColor="#3b5999">
      <span nz-icon nzType="facebook"></span>
      <span>Facebook</span>
    </nz-tag>
    <nz-tag nzColor="#55acee">
      <span nz-icon nzType="linkedin"></span>
      <span>LinkedIn</span>
    </nz-tag>
  `
})
export class NzDemoTagIconComponent {}
