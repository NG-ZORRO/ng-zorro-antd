import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-icon-twotone',
  template: `
    <div class="icons-list">
      <i nz-icon [type]="'smile'" [theme]="'twotone'"></i>
      <i nz-icon [type]="'heart'" [theme]="'twotone'" [twoToneColor]="'#eb2f96'"></i>
      <i nz-icon [type]="'check-circle'" [theme]="'twotone'" [twoToneColor]="'#52c41a'"></i>
    </div>
  `,
  styles  : [ `
    .icons-list > .anticon {
      margin-right: 6px;
      font-size: 24px;
    }
  ` ]
})
export class NzDemoIconTwotoneComponent {
}
