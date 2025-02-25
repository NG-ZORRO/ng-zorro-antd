/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  findAllSubstringIndices,
  findInputsOnElementWithAttr,
  findInputsOnElementWithTag,
  InputNameUpgradeData,
  Migration,
  ResolvedResource,
  WorkspacePath
} from '@angular/cdk/schematics';

import { getVersionUpgradeData, NzUpgradeData } from '../upgrade-data';

/**
 * Migration that walks through every template or stylesheet and replaces outdated input
 * names to the new input name. Selectors in stylesheets could also target input
 * bindings declared as static attribute. See for example:
 *
 * e.g. `<my-component color="primary">` becomes `my-component[color]`
 */
export class InputNamesMigration extends Migration<NzUpgradeData> {
  /** Change data that upgrades to the specified target version. */
  data: InputNameUpgradeData[] = getVersionUpgradeData(this, 'inputNames');

  // Only enable the migration rule if there is upgrade data.
  enabled = this.data.length !== 0;

  override visitStylesheet(stylesheet: ResolvedResource): void {
    this.data.forEach(name => {
      const currentSelector = `[${name.replace}]`;
      const updatedSelector = `[${name.replaceWith}]`;

      findAllSubstringIndices(stylesheet.content, currentSelector)
        .map(offset => stylesheet.start + offset)
        .forEach(start =>
          this._replaceInputName(
            stylesheet.filePath,
            start,
            currentSelector.length,
            updatedSelector
          )
        );
    });
  }

  override visitTemplate(template: ResolvedResource): void {
    this.data.forEach(name => {
      const limitedTo = name.limitedTo;
      const relativeOffsets: number[] = [];

      if (limitedTo.attributes) {
        relativeOffsets.push(
          ...findInputsOnElementWithAttr(template.content, name.replace, limitedTo.attributes)
        );
      }

      if (limitedTo.elements) {
        relativeOffsets.push(
          ...findInputsOnElementWithTag(template.content, name.replace, limitedTo.elements)
        );
      }

      relativeOffsets
        .map(offset => template.start + offset)
        .forEach(start =>
          this._replaceInputName(template.filePath, start, name.replace.length, name.replaceWith)
        );
    });
  }

  private _replaceInputName(
    filePath: WorkspacePath,
    start: number,
    width: number,
    newName: string
  ): void {
    this.fileSystem.edit(filePath).remove(start, width).insertRight(start, newName);
  }
}