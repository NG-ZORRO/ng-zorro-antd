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
import { Style } from '@schematics/angular/application/schema';
import { getWorkspace } from '@schematics/angular/utility/config';
import { addModule } from '../../utils/root-module';

import { Schema } from './schema';

export default function(options: Schema): Rule {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const prefix = options.prefix || project.prefix;
    const style = options.style || Style.Css;
    return chain([
      mergeWith(
        apply(
          url('./files/src'), [
            applyTemplates({
              prefix,
              style,
              ...strings,
              ...options
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
      addModule('AppRoutingModule', './app-routing.module')
    ]);
  }
}
