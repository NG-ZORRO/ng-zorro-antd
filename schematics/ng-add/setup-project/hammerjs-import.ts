/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { WorkspaceDefinition } from '@angular-devkit/core/src/workspace';
import { Rule, Tree } from '@angular-devkit/schematics';
import { getProjectFromWorkspace, getProjectMainFile } from '@angular/cdk/schematics';
import { getWorkspace } from '@schematics/angular/utility/workspace';
import { blue, red } from 'chalk';
import { Schema } from '../schema';

const hammerjsImportStatement = `import 'hammerjs';`;

/** Adds HammerJS to the main file of the specified Angular CLI project. */
export function hammerjsImport(options: Schema): Rule {
  return async (host: Tree) => {
    const workspace = await getWorkspace(host);
    const project = getProjectFromWorkspace(workspace as unknown as WorkspaceDefinition, options.project);
    const mainFile = getProjectMainFile(project);

    const recorder = host.beginUpdate(mainFile);
    const buffer = host.read(mainFile);

    if (!buffer) {
      console.log();
      console.error(red(`Could not read the project main file (${blue(mainFile)}). Please manually ` +
        `import HammerJS in your main TypeScript file.`));
      return;
    }

    const fileContent = buffer.toString('utf8');

    if (fileContent.includes(hammerjsImportStatement)) {
      console.log();
      console.log(`HammerJS is already imported in the project main file (${blue(mainFile)}).`);
      return;
    }

    recorder.insertRight(0, `${hammerjsImportStatement}\n`);
    host.commitUpdate(recorder);
  };
}
