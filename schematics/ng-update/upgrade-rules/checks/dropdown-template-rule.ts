/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ElementSelectorUpgradeData,
  Migration,
  ResolvedResource,
  UpgradeData
} from '@angular/cdk/schematics';

import { deprecatedComponent } from '../utils/deprecated-component';

export class DropdownTemplateRule extends Migration<UpgradeData> {

  enabled = false;

  deprecatedComponents: ElementSelectorUpgradeData[] = [{
    replace: 'nz-dropdown',
    replaceWith: '[nz-dropdown]'
  }, {
    replace: 'nz-dropdown-button',
    replaceWith: '[nz-dropdown]'
  }]

  visitTemplate(template: ResolvedResource): void {
    this.deprecatedComponents.forEach(data => {
      this.failures.push(...deprecatedComponent(template, data.replace, data.replaceWith));
    })
  }
}
