import { Component, signal } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'nz-demo-image-placeholder',
  imports: [NzButtonModule, NzImageModule, NzSpaceModule],
  template: `
    <nz-space [nzSize]="12">
      <img *nzSpaceItem nz-image width="200px" height="200px" [nzSrc]="src()" [nzPlaceholder]="placeholder" />
      <button *nzSpaceItem nz-button nzType="primary" (click)="onReload()">Reload</button>
    </nz-space>
  `
})
export class NzDemoImagePlaceholderComponent {
  readonly src = signal('https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png');
  readonly placeholder =
    'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200';

  onReload(): void {
    this.src.set(`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?${new Date()}`);
  }
}
