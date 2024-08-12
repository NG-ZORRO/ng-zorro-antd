/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ElementSelectorUpgradeData, Migration, ResolvedResource, UpgradeData } from '@angular/cdk/schematics';

import { deprecatedComponent } from '../utils/deprecated-component';

export class FormTemplateRule extends Migration<UpgradeData> {

  enabled = false;

  deprecatedComponents: ElementSelectorUpgradeData[] = [{
    replace: 'nz-form-extra',
    replaceWith: 'nz-form-control[nzExtra]'
  }, {
    replace: 'nz-form-explain',
    replaceWith: 'nz-form-control[nzSuccessTip][nzWarningTip][nzErrorTip][nzValidatingTip]...'
  }];

  visitTemplate(template: ResolvedResource): void {
    this.deprecatedComponents.forEach(data => {
      this.failures.push(...deprecatedComponent(template, data.replace, data.replaceWith));
    });
  }
}
