import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-icon-twotone',
  template: `
    <div class="icons-list">
      <span nz-icon [nzType]="'smile'" [nzTheme]="'twotone'"></span>
      <span nz-icon [nzType]="'heart'" [nzTheme]="'twotone'" [nzTwotoneColor]="'#eb2f96'"></span>
      <span nz-icon [nzType]="'check-circle'" [nzTheme]="'twotone'" [nzTwotoneColor]="'#52c41a'"></span>
    </div>
  `,
  styles: [
    `
      .icons-list > .anticon {
        margin-right: 6px;
        font-size: 24px;
      }
    `
  ]
})
export class NzDemoIconTwotoneComponent {}
