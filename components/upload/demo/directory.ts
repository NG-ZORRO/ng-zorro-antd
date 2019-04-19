/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-upload-directory',
  template: `
    <nz-upload nzAction="https://jsonplaceholder.typicode.com/posts/" nzDirectory>
      <button nz-button><i nz-icon nzType="upload"></i> Upload Directory</button>
    </nz-upload>
  `
})
export class NzDemoUploadDirectoryComponent {}
