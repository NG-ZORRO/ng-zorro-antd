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

export class TooltipLikeTemplateRule extends Migration<UpgradeData> {

  enabled = true;

  deprecatedComponents: ElementSelectorUpgradeData[] = [{
    replace: 'nz-tooltip',
    replaceWith: '[nz-tooltip]'
  }, {
    replace: 'nz-popover',
    replaceWith: '[nz-popover]'
  }, {
    replace: 'nz-popconfirm',
    replaceWith: '[nz-popconfirm]'
  }];

  visitTemplate(template: ResolvedResource): void {
    this.deprecatedComponents.forEach(data => {
      this.failures.push(...deprecatedComponent(template, data.replace, data.replaceWith));
    });
  }
}
