import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-image-preview-src',
  template: `
    <img nz-image width="200px" [nzSrc]="src" [nzPreviewSrc]="previewSrc" alt="" />
  `
})
export class NzDemoImagePreviewSrcComponent {
  public src =
    'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200';
  public previewSrc = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
}
