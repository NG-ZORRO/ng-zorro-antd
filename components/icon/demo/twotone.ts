import { Component } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'nz-demo-icon-twotone',
  imports: [NzIconModule],
  template: `
    <nz-icon nzType="smile" nzTheme="twotone" />
    <nz-icon nzType="heart" nzTheme="twotone" nzTwotoneColor="#eb2f96" />
    <nz-icon nzType="check-circle" nzTheme="twotone" nzTwotoneColor="#52c41a" />
  `,
  styles: `
    nz-icon {
      margin-right: 6px;
      font-size: 24px;
    }
  `
})
export class NzDemoIconTwotoneComponent {}
