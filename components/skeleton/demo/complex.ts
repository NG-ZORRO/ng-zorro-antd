/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-skeleton-complex',
  template: `
    <nz-skeleton [nzAvatar]="true" [nzParagraph]="{ rows: 4 }"></nz-skeleton>
  `
})
export class NzDemoSkeletonComplexComponent {}
