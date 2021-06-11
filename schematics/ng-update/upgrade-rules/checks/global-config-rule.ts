/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { TargetVersion } from '@angular/cdk/schematics';

import { InjectionTokenRule } from './injection-token-rule';

export class GlobalConfigRule extends InjectionTokenRule {
  enabled = this.targetVersion === TargetVersion.V9 || this.targetVersion === TargetVersion.V10;
  tokens =
    (
      this.targetVersion === TargetVersion.V9 &&
      ['NZ_MESSAGE_CONFIG', 'NZ_NOTIFICATION_CONFIG', 'NZ_DEFAULT_EMPTY_CONTENT', 'NZ_ICON_DEFAULT_TWOTONE_COLOR', 'NZ_CODE_EDITOR_CONFIG']
    ) ||
    (
      this.targetVersion === TargetVersion.V10 &&
      ['NZ_CODE_EDITOR_CONFIG']
    )
  getFailure(token: string): string {
    return `Found deprecated symbol "${token}" which has been removed. Please use 'NzConfigService' instead.`;
  }
}
