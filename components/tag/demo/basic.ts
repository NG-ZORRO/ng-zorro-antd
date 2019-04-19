/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tag-basic',
  template: `
    <nz-tag>Tag 1</nz-tag>
    <nz-tag>
      <a href="https://github.com/NG-ZORRO/ng-zorro-antd">Link</a>
    </nz-tag>
    <nz-tag nzMode="closeable" (nzOnClose)="onClose()" (nzAfterClose)="afterClose()">Tag 2</nz-tag>
    <nz-tag nzMode="closeable" (nzOnClose)="preventDefault($event)">Prevent Default</nz-tag>
  `,
  styles: []
})
export class NzDemoTagBasicComponent {
  onClose(): void {
    console.log('tag was closed.');
  }

  afterClose(): void {
    console.log('after tag closed');
  }

  preventDefault(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
    console.log('tag can not be closed.');
  }
}
