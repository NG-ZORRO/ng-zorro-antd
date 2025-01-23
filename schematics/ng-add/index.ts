/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { getProjectFromWorkspace } from '@angular/cdk/schematics';

import { chain, noop, Rule, schematic, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';
import { getWorkspace } from '@schematics/angular/utility/workspace';

import { Schema } from './schema';
import { addPackageToPackageJson } from '../utils/package-config';
import { getProjectStyle } from '../utils/project-style';
// generated by scripts/schematics/set-version.ts
// @ts-ignore
import { hammerjsVersion, zorroVersion } from '../utils/version-names';

export default function (options: Schema): Rule {
  return chain([
    (host: Tree, context: SchematicContext) => {
      // The CLI inserts `ng-zorro-antd` into the `package.json` before this schematic runs.
      // This means that we do not need to insert Angular Material into `package.json` files again.
      // In some cases though, it could happen that this schematic runs outside of the CLI `ng add`
      // command, or Material is only listed a dev dependency. If that is the case, we insert a
      // version based on the current build version (substituted version placeholder).
      if (!options.skipPackageJson) {
        addPackageToPackageJson(host, 'ng-zorro-antd', zorroVersion);
        if (options.gestures) {
          addPackageToPackageJson(host, 'hammerjs', hammerjsVersion);
        }
      }

      // Since the Angular Material schematics depend on the schematic utility functions from the
      // CDK, we need to install the CDK before loading the schematic files that import from the CDK.
      if (!options.skipInstall) {
        const installTaskId = context.addTask(new NodePackageInstallTask());
        context.addTask(new RunSchematicTask('ng-add-setup-project', options), [installTaskId]);
      }
    },
    options.template ? applyTemplate(options) : noop(),
  ]);
}

function applyTemplate(options: Schema): Rule {
  return async (host: Tree) => {
    const workspace = await getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const style = getProjectStyle(project);

    return schematic(options.template, {...options, style});
  }
}