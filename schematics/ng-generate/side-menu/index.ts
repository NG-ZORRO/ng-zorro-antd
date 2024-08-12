/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  getProjectFromWorkspace,
  getProjectMainFile,
  insertImport,
  isStandaloneApp,
  parseSourceFile
} from '@angular/cdk/schematics';

import { strings } from '@angular-devkit/core';
import { WorkspaceDefinition } from '@angular-devkit/core/src/workspace';
import {
  apply,
  applyTemplates,
  chain,
  FileEntry,
  forEach,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  Tree,
  url
} from '@angular-devkit/schematics';
import { addRootProvider } from '@schematics/angular/utility';
import { findAppConfig } from '@schematics/angular/utility/standalone/app_config';
import { findBootstrapApplicationCall } from '@schematics/angular/utility/standalone/util';
import { getWorkspace } from '@schematics/angular/utility/workspace';

import { applyChangesToFile } from '../../utils/apply-changes';
import { addModule } from '../../utils/root-module';
import { Schema } from './schema';

export default function (options: Schema): Rule {
  return async (host: Tree) => {
    const workspace = (await getWorkspace(host)) as unknown as WorkspaceDefinition;
    const project = getProjectFromWorkspace(workspace, options.project);
    const mainFile = getProjectMainFile(project);
    const prefix = options.prefix || project.prefix;
    const isStandalone = isStandaloneApp(host, mainFile);
    const templateSourcePath = isStandalone ? './standalone' : './files';

    return chain([
      mergeWith(
        apply(url(`${templateSourcePath}/src`), [
          applyTemplates({
            ...strings,
            ...options,
            prefix
          }),
          move(project.sourceRoot as string),
          forEach((fileEntry: FileEntry) => {
            if (host.exists(fileEntry.path)) {
              host.overwrite(fileEntry.path, fileEntry.content);
            }
            return fileEntry;
          })
        ]),
        MergeStrategy.Overwrite
      ),
      isStandalone ? addIconsProvider(options.project, mainFile) : addModules(options.project)
    ]);
  };
}

function addModules(project: string): Rule {
  return chain([
    addModule('AppRoutingModule', './app-routing.module', project),
    addModule('IconsProviderModule', './icons-provider.module', project),
    addModule('NzLayoutModule', 'ng-zorro-antd/layout', project),
    addModule('NzMenuModule', 'ng-zorro-antd/menu', project)
  ]);
}

function addIconsProvider(project: string, mainFile: string): Rule {
  return chain([
    importIconDefinitions(mainFile),
    addRootProvider(project, ({ code, external }) => {
      return code`${external('provideNzIcons', 'ng-zorro-antd/icon')}(icons)`;
    })
  ]);
}

function importIconDefinitions(mainFile: string): Rule {
  return async (host: Tree) => {
    const bootstrapCall = findBootstrapApplicationCall(host, mainFile);
    const appConfig = findAppConfig(bootstrapCall, host, mainFile);
    const appConfigFile = appConfig.filePath;
    const appConfigSource = parseSourceFile(host, appConfig.filePath);

    applyChangesToFile(host, appConfigFile, [
      insertImport(appConfigSource, appConfigFile, 'icons', './icons-provider')
    ]);
  }
}