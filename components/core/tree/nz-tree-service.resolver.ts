/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { InjectionToken } from '@angular/core';

import { NzTreeBaseService } from './nz-tree-base.service';

export const NzTreeHigherOrderServiceToken = new InjectionToken<NzTreeBaseService>('NzTreeHigherOrder');
