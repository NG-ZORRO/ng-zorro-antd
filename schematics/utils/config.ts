/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { getSchematicDefaults } from '@angular/cli/src/utilities/config';

import { normalize } from '@angular-devkit/core';
import { Schema } from '@schematics/angular/component/schema';

/**
 * Returns the default options for the `@schematics/angular:component` schematic which would
 * have been specified at project initialization (ng new or ng init).
 */
export async function getDefaultComponentOptions(project?: string): Promise<Partial<Schema>> {
  return getSchematicDefaults('@schematics/angular', 'component', project);
}

export async function getAppOptions(
  project: string,
  projectRoot?: string
): Promise<{
  componentOptions: Partial<Schema>;
  sourceDir: string;
}> {
  const componentOptions = await getDefaultComponentOptions(project);
  componentOptions.type ??= '';

  const appDir = normalize(projectRoot);
  const sourceDir = `${appDir}/src/app`;

  return {
    componentOptions,
    sourceDir
  };
}