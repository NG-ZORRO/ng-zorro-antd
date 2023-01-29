/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  findOutputsOnElementWithTag,
  Migration,
  ResolvedResource, UpgradeData
} from '@angular/cdk/schematics';

export class TabsOutputRule extends Migration<UpgradeData> {

  enabled = false;

  visitTemplate(template: ResolvedResource): void {

    findOutputsOnElementWithTag(template.content, 'nzOnNextClick', ['nz-tabset'])
      .forEach(offset => {
        this.failures.push({
          filePath: template.filePath,
          position: template.getCharacterAndLineOfPosition(offset),
          message: `Found deprecated output '(nzOnNextClick)'. Please manually remove this output.`
        });
      })

    findOutputsOnElementWithTag(template.content, 'nzOnPrevClick', ['nz-tabset'])
      .forEach(offset => {
        this.failures.push({
          filePath: template.filePath,
          position: template.getCharacterAndLineOfPosition(offset),
          message: `Found deprecated output '(nzOnPrevClick)'. Please manually remove this output.`
        });
      })
  }
}
