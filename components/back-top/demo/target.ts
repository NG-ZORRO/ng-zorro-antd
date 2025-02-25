import { Component } from '@angular/core';

import { NzBackTopModule } from 'ng-zorro-antd/back-top';

@Component({
  selector: 'nz-demo-back-top-target',
  imports: [NzBackTopModule],
  template: `
    Scroll down to see the bottom-right
    <strong>gray</strong>
    button.
    <div class="long-div" #divTarget>
      <div class="long-div-inner"></div>
      <nz-back-top [nzTarget]="divTarget"></nz-back-top>
    </div>
  `,
  styles: [
    `
      :host ::ng-deep .long-div {
        height: 300px;
        overflow-y: scroll;
        background-image: url(//zos.alipayobjects.com/rmsportal/RmjwQiJorKyobvI.jpg);
      }

      :host ::ng-deep .long-div-inner {
        height: 1500px;
      }

      :host ::ng-deep .long-div .ant-back-top {
        right: 150px;
      }

      :host ::ng-deep .long-div .ant-back-top-rtl {
        right: unset;
        left: 150px;
      }

      :host ::ng-deep strong {
        color: rgba(64, 64, 64, 0.6);
      }
    `
  ]
})
export class NzDemoBackTopTargetComponent {}
