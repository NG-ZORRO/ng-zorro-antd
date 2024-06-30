/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  findInputsOnElementWithTag,
  Migration,
  ResolvedResource, UpgradeData
} from '@angular/cdk/schematics';

export class ModalTemplateRule extends Migration<UpgradeData> {

  enabled = false;

  visitTemplate(template: ResolvedResource): void {
    findInputsOnElementWithTag(template.content, 'nzGetContainer', ['nz-modal'])
      .forEach(offset => {
        this.failures.push({
          filePath: template.filePath,
          position: template.getCharacterAndLineOfPosition(offset),
          message: `Found deprecated input '[nzGetContainer]'. Please manually remove this input.`
        });
      })
  }
}
