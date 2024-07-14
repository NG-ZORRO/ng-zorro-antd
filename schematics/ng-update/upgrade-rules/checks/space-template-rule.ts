/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Migration, ResolvedResource, UpgradeData } from '@angular/cdk/schematics';

import { deprecatedComponent } from '../utils/deprecated-component';

export class SpaceTemplateRule extends Migration<UpgradeData> {

  enabled = false;

  visitTemplate(template: ResolvedResource): void {
    this.failures.push(
      ...deprecatedComponent(template, 'nz-space-item', 'ng-template[nzSpaceItem]')
    );
  }
}
