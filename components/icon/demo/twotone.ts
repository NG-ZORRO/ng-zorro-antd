import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-icon-twotone',
  template: `
    <div class="icons-list">
      <i nz-icon [nzType]="'smile'" [nzTheme]="'twotone'"></i>
      <i nz-icon [nzType]="'heart'" [nzTheme]="'twotone'" [nzTwotoneColor]="'#eb2f96'"></i>
      <i nz-icon [nzType]="'check-circle'" [nzTheme]="'twotone'" [nzTwotoneColor]="'#52c41a'"></i>
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
