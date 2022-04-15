/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { findInputsOnElementWithTag, Migration, ResolvedResource, TargetVersion, UpgradeData } from '@angular/cdk/schematics';

export class CalendarTemplateRule extends Migration<UpgradeData> {

  enabled = this.targetVersion === TargetVersion.V9;

  visitTemplate(template: ResolvedResource): void {

    findInputsOnElementWithTag(template.content, 'nzCard', ['nz-calendar'])
      .forEach(offset => {
        this.failures.push({
          filePath: template.filePath,
          position: template.getCharacterAndLineOfPosition(offset),
          message: `Found deprecated input "nzCard" component. Use "nzFullscreen" to instead please.`
        });
      })

  }
}
