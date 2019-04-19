/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-modal-manual',
  template: `
    <button nz-button (click)="success()">Success</button>
  `,
  styles: []
})
export class NzDemoModalManualComponent {
  constructor(private modalService: NzModalService) {}

  success(): void {
    const modal = this.modalService.success({
      nzTitle: 'This is a notification message',
      nzContent: 'This modal will be destroyed after 1 second'
    });

    setTimeout(() => modal.destroy(), 1000);
  }
}
