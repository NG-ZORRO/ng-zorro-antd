/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  Migration,
  ResolvedResource, UpgradeData
} from '@angular/cdk/schematics';

import { findElementWithTag } from '../../../utils/ng-update/elements';

export class FormTemplateRule extends Migration<UpgradeData> {

  enabled = false;

  visitTemplate(template: ResolvedResource): void {

    const deprecatedComponent = (deprecated: string, instead: string): void => {
      findElementWithTag(template.content, deprecated)
        .forEach(offset => {
          this.failures.push({
            filePath: template.filePath,
            position: template.getCharacterAndLineOfPosition(offset),
            message: `Found deprecated "<${deprecated}>" component. Use "${instead}" to instead please.`
          });
        })
    };

    deprecatedComponent('nz-form-extra', 'nz-form-control[nzExtra]');
    deprecatedComponent('nz-form-explain', 'nz-form-control[nzSuccessTip][nzWarningTip][nzErrorTip]...');

  }
}
