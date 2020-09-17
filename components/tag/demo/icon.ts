import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tag-icon',
  template: `
    <nz-tag nzColor="#55acee">
      <i nz-icon nzType="twitter"></i>
      <span>Twitter</span>
    </nz-tag>
    <nz-tag nzColor="#cd201f">
      <i nz-icon nzType="youtube"></i>
      <span>Youtube</span>
    </nz-tag>
    <nz-tag nzColor="#3b5999">
      <i nz-icon nzType="facebook"></i>
      <span>Facebook</span>
    </nz-tag>
    <nz-tag nzColor="#55acee">
      <i nz-icon nzType="linkedin"></i>
      <span>LinkedIn</span>
    </nz-tag>
  `
})
export class NzDemoTagIconComponent {}
