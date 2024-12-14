/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  Migration,
  OutputNameUpgradeData,
  ResolvedResource,
  WorkspacePath,
  findOutputsOnElementWithAttr,
  findOutputsOnElementWithTag
} from '@angular/cdk/schematics';

import { getVersionUpgradeData, NzUpgradeData } from '../upgrade-data';

/**
 * Migration that walks through every inline or external HTML template and switches
 * changed output binding names to the proper new output name.
 */
export class OutputNamesMigration extends Migration<NzUpgradeData> {
  /** Change data that upgrades to the specified target version. */
  data: OutputNameUpgradeData[] = getVersionUpgradeData(this, 'outputNames');

  // Only enable the migration rule if there is upgrade data.
  enabled = this.data.length !== 0;

  override visitTemplate(template: ResolvedResource): void {
    this.data.forEach(name => {
      const limitedTo = name.limitedTo;
      const relativeOffsets: number[] = [];

      if (limitedTo.attributes) {
        relativeOffsets.push(
          ...findOutputsOnElementWithAttr(template.content, name.replace, limitedTo.attributes)
        );
      }

      if (limitedTo.elements) {
        relativeOffsets.push(
          ...findOutputsOnElementWithTag(template.content, name.replace, limitedTo.elements)
        );
      }

      relativeOffsets
        .map(offset => template.start + offset)
        .forEach(start =>
          this._replaceOutputName(template.filePath, start, name.replace.length, name.replaceWith)
        );
    });
  }

  private _replaceOutputName(
    filePath: WorkspacePath,
    start: number,
    width: number,
    newName: string
  ): void {
    this.fileSystem.edit(filePath).remove(start, width).insertRight(start, newName);
  }
}