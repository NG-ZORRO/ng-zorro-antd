import { Component } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'nz-demo-icon-twotone',
  standalone: true,
  imports: [NzIconModule],
  template: `
    <span nz-icon nzType="smile" nzTheme="twotone"></span>
    <span nz-icon nzType="heart" nzTheme="twotone" nzTwotoneColor="#eb2f96"></span>
    <span nz-icon nzType="check-circle" nzTheme="twotone" nzTwotoneColor="#52c41a"></span>
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
export class NzDemoIconTwotoneComponent {}
