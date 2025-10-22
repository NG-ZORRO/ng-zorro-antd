/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Used in input-group/input-number-group to make sure components in addon work well
/**
 * @deprecated Will be removed in v22.0.0. This service will be removed along with input-group/input-number-group.
 */
@Injectable()
export class NzFormNoStatusService {
  noFormStatus = new BehaviorSubject<boolean>(false);
}
