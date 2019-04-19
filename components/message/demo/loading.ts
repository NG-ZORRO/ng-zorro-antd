/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'nz-demo-message-loading',
  template: `
    <button nz-button [nzType]="'default'" (click)="createBasicMessage()">Display a loading indicator</button>
  `,
  styles: []
})
export class NzDemoMessageLoadingComponent {
  constructor(private message: NzMessageService) {}

  createBasicMessage(): void {
    const id = this.message.loading('Action in progress..', { nzDuration: 0 }).messageId;
    setTimeout(() => {
      this.message.remove(id);
    }, 2500);
  }
}
