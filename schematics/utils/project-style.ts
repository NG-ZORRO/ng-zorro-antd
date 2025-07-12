/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { getProjectStyleFile } from '@angular/cdk/schematics';

import { Style } from '@schematics/angular/application/schema';
import { ProjectDefinition } from '@schematics/angular/utility';

export function getProjectStyle(project: ProjectDefinition): Style {
  const stylesPath = getProjectStyleFile(project);
  const style = stylesPath ? stylesPath.split('.').pop() : Style.Css;
  return style as Style;
}
