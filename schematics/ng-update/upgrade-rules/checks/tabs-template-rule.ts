/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Migration, ResolvedResource, UpgradeData } from '@angular/cdk/schematics';

import { findElementWithoutStructuralDirective } from '../../../utils/ng-update/elements';

export class TabsTemplateRule extends Migration<UpgradeData> {

  enabled = false;

  visitTemplate(template: ResolvedResource): void {

    findElementWithoutStructuralDirective(template.content, 'a', 'nzTabLink', 'nz-tab-link')
      .forEach(offset => {
        this.failures.push({
          filePath: template.filePath,
          position: template.getCharacterAndLineOfPosition(offset),
          message: `Found deprecated selector 'a[nz-tab-link]', please use 'ng-template[nzTabLink] > a[nz-tab-link]' instead.`
        });
      })

  }
}
