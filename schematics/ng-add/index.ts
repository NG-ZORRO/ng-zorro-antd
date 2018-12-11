import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';
import { hammerjsVersion, zorroVersion } from '../utils/version-names';
import { addPackageToPackageJson } from '../utils/package-config';
import { Schema } from './schema';

export default function (options: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {

    addPackageToPackageJson(host, 'ng-zorro-antd', zorroVersion);
    if (options.gestures) {
      addPackageToPackageJson(host, 'hammerjs', hammerjsVersion);
    }

    // const installTaskId = context.addTask(new NodePackageInstallTask());

    context.addTask(new RunSchematicTask('ng-add-setup-project', options));
    context.addTask(new RunSchematicTask('bootstrap', options));
  };
}
