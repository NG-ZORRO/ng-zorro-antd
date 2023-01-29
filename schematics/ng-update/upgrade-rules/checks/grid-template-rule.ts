/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  findInputsOnElementWithAttr,
  findInputsOnElementWithTag,
  Migration,
  ResolvedResource, UpgradeData
} from '@angular/cdk/schematics';

export class GridTemplateRule extends Migration<UpgradeData> {

  enabled = false;

  visitTemplate(template: ResolvedResource): void {

    const offsets = []

    offsets.push(...findInputsOnElementWithAttr(template.content, 'nzType', ['nz-row']))
    offsets.push(...findInputsOnElementWithTag(template.content, 'nzType', ['nz-form-item', 'nz-row']))

    offsets.forEach(offset => {
      this.failures.push({
        filePath: template.filePath,
        position: template.getCharacterAndLineOfPosition(offset),
          message: `Found deprecated input '[nzType]'. Please manually remove this input.`
      });
    })

    findInputsOnElementWithTag(template.content, 'nzFlex', ['nz-form-item']).forEach(offset => {
      this.failures.push({
        filePath: template.filePath,
        position: template.getCharacterAndLineOfPosition(offset),
        message: `Found deprecated input '[nzFlex]'. Please manually remove this input.`
      });
    })

  }
}
