import { Component } from '@angular/core';

import { NzIconService } from 'ng-zorro-antd/icon';

@Component({
  selector: 'nz-demo-icon-iconfont',
  template: `
    <div class="icons-list">
      <span nz-icon [nzIconfont]="'icon-tuichu'"></span>
      <span nz-icon [nzIconfont]="'icon-facebook'"></span>
      <span nz-icon [nzIconfont]="'icon-twitter'"></span>
    </div>
  `,
  styles: [
    `
      [nz-icon] {
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
