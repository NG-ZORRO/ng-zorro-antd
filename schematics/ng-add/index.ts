import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';
import { addPackageToPackageJson, getPackageVersionFromPackageJson } from './package-config';
import { Schema } from './schema';
import { cdkVersion, hammerjsVersion, requiredAngularVersionRange, zorroVersion } from './version-names';

export default function (options: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {
    const ngCoreVersionTag = getPackageVersionFromPackageJson(host, '@angular/core');

    addPackageToPackageJson(host, '@angular/cdk', `~${cdkVersion}`);
    addPackageToPackageJson(host, 'ng-zorro-antd', `~${zorroVersion}`);
    addPackageToPackageJson(host, '@angular/animations',
      ngCoreVersionTag || requiredAngularVersionRange);

    if (options.gestures) {
      addPackageToPackageJson(host, 'hammerjs', hammerjsVersion);
    }

    // const installTaskId = context.addTask(new NodePackageInstallTask());

    context.addTask(new RunSchematicTask('ng-add-setup-project', options));
  };
}
