/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  findInputsOnElementWithTag, findOutputsOnElementWithTag,
  Migration,
  ResolvedResource, UpgradeData
} from '@angular/cdk/schematics';

export class TableTemplateRule extends Migration<UpgradeData> {

  enabled = false;

  visitTemplate(template: ResolvedResource): void {

    const content = template.content.replace('nz-table', 'table  ')
    findOutputsOnElementWithTag(content, 'nzSortChangeWithKey', ['th'])
      .forEach(offset => {
        this.failures.push({
          filePath: template.filePath,
          position: template.getCharacterAndLineOfPosition(offset),
          message: `Found deprecated output 'th(nzSortChangeWithKey)'. Please manually remove this output.`
        });
      });

    findInputsOnElementWithTag(content, 'nzSingleSort', ['thead'])
      .forEach(offset => {
        this.failures.push({
          filePath: template.filePath,
          position: template.getCharacterAndLineOfPosition(offset),
          message: `Found deprecated input 'thead[nzSingleSort]'. Please manually change to 'th[nzSortFn]'.`
        });
      });

    findInputsOnElementWithTag(content, 'nzSortKey', ['th'])
      .forEach(offset => {
        this.failures.push({
          filePath: template.filePath,
          position: template.getCharacterAndLineOfPosition(offset),
          message: `Found deprecated input 'th[nzSortKey]'. Please manually change to 'th[nzSortFn]'.`
        });
      });
  }
}
