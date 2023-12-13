/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { getProjectFromWorkspace } from '@angular/cdk/schematics';


import { WorkspaceDefinition } from '@angular-devkit/core/src/workspace';
import { noop, Rule, Tree } from '@angular-devkit/schematics';
import { getWorkspace } from '@schematics/angular/utility/workspace';

import { existsSync, statSync as fsStatSync } from 'fs';

import { Schema } from './schema';

const bootPageHTML = `<!-- NG-ZORRO -->
<a href="https://github.com/NG-ZORRO/ng-zorro-antd" target="_blank" style="display: flex;align-items: center;justify-content: center;height: 100%;width: 100%;">
  <img height="300" src="https://img.alicdn.com/tfs/TB1X.qJJgHqK1RjSZFgXXa7JXXa-89-131.svg">
</a>`;

export default function(options: Schema): Rule {
  return async (host: Tree, context) => {
    const workspace = await getWorkspace(host) as unknown as WorkspaceDefinition;
    const project = getProjectFromWorkspace(workspace, options.project);
    const appHTMLFile = `${project.sourceRoot}/app/app.component.html`;
    const buffer = host.read(appHTMLFile);

    if (!buffer) {
      context.logger.error(
       `Could not find the project ${appHTMLFile} file inside of the ` + `workspace config`
      );
      return noop();
    }
    if (existsSync(appHTMLFile)) {
      const stat = fsStatSync(appHTMLFile);
      if (stat.mtimeMs === stat.ctimeMs) {
        host.overwrite(appHTMLFile, bootPageHTML);
      }
    } else {
      host.overwrite(appHTMLFile, bootPageHTML);
    }

    return noop();
  };
}
