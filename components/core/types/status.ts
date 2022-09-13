/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { tuple } from './type';

export type NzStatus = '' | 'error' | 'warning';

const ValidateStatuses = tuple('success', 'warning', 'error', 'validating', '');
export type NzValidateStatus = typeof ValidateStatuses[number];
