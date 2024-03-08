/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Migration, ResolvedResource, UpgradeData } from '@angular/cdk/schematics';

import { findElementWithTag } from '../../../utils/ng-update/elements';

export class SpaceTemplateRule extends Migration<UpgradeData> {

  enabled = false;

  visitTemplate(template: ResolvedResource): void {

    findElementWithTag(template.content, 'nz-space-item')
      .forEach(offset => {
        this.failures.push({
          filePath: template.filePath,
          position: template.getCharacterAndLineOfPosition(offset),
          message: `Found deprecated component 'nz-space-item', please use 'ng-template[nzSpaceItem] instead.`
        });
      })

  }
}
