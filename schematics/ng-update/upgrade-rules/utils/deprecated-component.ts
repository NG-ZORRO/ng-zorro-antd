/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { MigrationFailure, ResolvedResource } from '@angular/cdk/schematics';

import { findElementWithTag } from '../../../utils/ng-update/elements';

export const deprecatedComponent = (template: ResolvedResource, deprecated: string, instead: string): MigrationFailure[] => {
  return findElementWithTag(template.content, deprecated)
    .map(offset => ({
      filePath: template.filePath,
      position: template.getCharacterAndLineOfPosition(offset),
      message: `Found deprecated '<${deprecated}>' component. Please use '${instead}' instead.`
    }));
};
