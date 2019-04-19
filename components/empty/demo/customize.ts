/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-empty-customize',
  template: `
    <nz-empty
      [nzNotFoundImage]="
        'https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original'
      "
      [nzNotFoundContent]="contentTpl"
      [nzNotFoundFooter]="footerTpl"
    >
      <ng-template #contentTpl>
        <span> Customize <a href="#API">Description</a> </span>
      </ng-template>
      <ng-template #footerTpl>
        <button nz-button nzType="primary" (click)="onClick()">Create Now</button>
      </ng-template>
    </nz-empty>
  `,
  styles: []
})
export class NzDemoEmptyCustomizeComponent {
  onClick(): void {
    console.log('clicked');
  }
}
