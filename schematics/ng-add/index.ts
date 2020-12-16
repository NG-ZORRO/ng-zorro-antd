import { WorkspaceDefinition } from '@angular-devkit/core/src/workspace';
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';
import { getProjectFromWorkspace } from '@angular/cdk/schematics';
import { getWorkspace } from '@schematics/angular/utility/workspace';
import { addPackageToPackageJson } from '../utils/package-config';
import { getProjectStyle } from '../utils/project-style';
import { hammerjsVersion, zorroVersion } from '../utils/version-names';
import { Schema } from './schema';

export default function(options: Schema): Rule {
  return async (host: Tree, context: SchematicContext) => {
    if (!options.skipPackageJson) {
      addPackageToPackageJson(host, 'ng-zorro-antd', zorroVersion);
      if (options.gestures) {
        addPackageToPackageJson(host, 'hammerjs', hammerjsVersion);
      }
    }

    const installTaskId = context.addTask(new NodePackageInstallTask());

    context.addTask(new RunSchematicTask('ng-add-setup-project', options), [installTaskId]);

    if (options.template) {
      const workspace = await getWorkspace(host);
      const project = getProjectFromWorkspace(workspace as unknown as WorkspaceDefinition, options.project);
      const style = getProjectStyle(project);
      context.addTask(new RunSchematicTask(options.template, {...options, style: style}));
    }

  };
}
