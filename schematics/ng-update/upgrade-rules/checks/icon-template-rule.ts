/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Migration, ResolvedResource, TargetVersion, UpgradeData } from '@angular/cdk/schematics';

import { findElementWithClassName } from '../../../utils/ng-update/elements';

export class IconTemplateRule extends Migration<UpgradeData> {

  enabled = this.targetVersion === TargetVersion.V9;

  visitTemplate(template: ResolvedResource): void {

    findElementWithClassName(template.content, 'anticon', 'i')
      .forEach(offset => {
        this.failures.push({
          filePath: template.filePath,
          position: template.getCharacterAndLineOfPosition(offset),
          message: `Found deprecated css selector "i.anticon" component. Use "span[nz-icon]" to instead please.`
        });
      })

  }
}
