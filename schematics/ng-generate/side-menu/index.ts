import { strings } from '@angular-devkit/core';
import {
  apply,
  applyTemplates,
  chain,
  forEach,
  mergeWith,
  move,
  url,
  FileEntry,
  MergeStrategy,
  Rule,
  Tree
} from '@angular-devkit/schematics';
import { getProjectFromWorkspace } from '@angular/cdk/schematics';
import { getWorkspace } from '@schematics/angular/utility/config';
import { addModule } from '../../utils/root-module';

import { Schema } from './schema';

export default function(options: Schema): Rule {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const prefix = options.prefix || project.prefix;
    return chain([
      mergeWith(
        apply(
          url('./files/src'), [
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
          ]
        ),
        MergeStrategy.Overwrite
      ),
      addModule('AppRoutingModule', './app-routing.module'),
      addModule('IconsProviderModule', './icons-provider.module')
    ]);
  }
}
