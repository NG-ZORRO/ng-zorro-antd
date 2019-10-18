import { Component } from '@angular/core';
import { NzIconService } from 'ng-zorro-antd/icon';

@Component({
  selector: 'nz-demo-icon-iconfont',
  template: `
    <div class="icons-list">
      <i nz-icon [nzIconfont]="'icon-tuichu'"></i>
      <i nz-icon [nzIconfont]="'icon-facebook'"></i>
      <i nz-icon [nzIconfont]="'icon-twitter'"></i>
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
