/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { InjectionTokenRule } from './injection-token-rule';

export class GlobalConfigRule extends InjectionTokenRule {
  enabled = false;
  tokens = [];
  getFailure(token: string): string {
    return `Found deprecated symbol "${token}" which has been removed. Please use 'NzConfigService' instead.`;
  }
}
