/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { getProjectFromWorkspace, getProjectMainFile, isStandaloneApp } from '@angular/cdk/schematics';

import {
  apply,
  applyTemplates,
  chain,
  FileEntry,
  forEach,
  MergeStrategy,
  mergeWith,
  move,
  noop,
  Rule,
  schematic,
  strings,
  Tree,
  url
} from '@angular-devkit/schematics';
import { readWorkspace } from '@schematics/angular/utility';

import { Schema } from './schema';
import { getAppOptions } from '../../utils/config';
import { addModule } from '../../utils/root-module';

export default function(options: Schema): Rule {
  return async (host: Tree) => {
    const workspace = await readWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const mainFile = getProjectMainFile(project);
    const { componentOptions, sourceDir } = await getAppOptions(options.project, project.root);
    const prefix = options.prefix || project.prefix;
    const style = options.style || componentOptions.style;
    const exportDefault = componentOptions.exportDefault ?? false;

    const isStandalone = isStandaloneApp(host, mainFile);
    const templateSourcePath = isStandalone ? './standalone' : './files';

    return chain([
      mergeWith(
        apply(
          url(`${templateSourcePath}/src`), [
            applyTemplates({
              ...strings,
              ...componentOptions,
              exportDefault,
              prefix,
              style
            }),
            move(project.sourceRoot),
            forEach((fileEntry: FileEntry) => {
              if (host.exists(fileEntry.path)) {
                host.overwrite(fileEntry.path, fileEntry.content);
              }
              return fileEntry;
            })
          ]
        ),
        MergeStrategy.Overwrite
      ),
      schematic('component', {
        name: 'welcome',
        project: options.project,
        standalone: isStandalone,
        ...componentOptions,
        path: `${sourceDir}/pages`,
        skipImport: true,
        skipTests: true,
        prefix,
        style
      }),
      isStandalone ? noop() : addModules(options.project)
    ]);
  };
}


function addModules(project: string): Rule {
  return chain([
    addModule('AppRoutingModule', './app-routing-module', project),
    addModule('NzLayoutModule', 'ng-zorro-antd/layout', project),
    addModule('NzMenuModule', 'ng-zorro-antd/menu', project)
  ]);
}
