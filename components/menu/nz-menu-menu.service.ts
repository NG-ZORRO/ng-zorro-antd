/*
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Injectable } from '@angular/core';
import { NzMenuService } from './nz-menu.service';

@Injectable()
export class NzMenuMenuService extends NzMenuService {
  isInDropDown = false;
}
