import { Component } from '@angular/core';

import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';

@Component({
  selector: 'nz-demo-icon-iconfont',
  imports: [NzIconModule],
  template: `
    <nz-icon nzIconfont="icon-tuichu" />
    <nz-icon nzIconfont="icon-facebook" />
    <nz-icon nzIconfont="icon-twitter" />
  `,
  styles: [
    `
      nz-icon {
        margin-right: 6px;
        font-size: 24px;
      }
    `
  ]
})
export class NzDemoIconIconfontComponent {
  constructor(private iconService: NzIconService) {
    this.iconService.fetchFromIconfont({
      scriptUrl: 'https://at.alicdn.com/t/font_8d5l8fzk5b87iudi.js'
    });
  }
}
