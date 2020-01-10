import { Rule, Tree } from '@angular-devkit/schematics';
import { getProjectFromWorkspace, getProjectMainFile } from '@angular/cdk/schematics';
import { getWorkspace } from '@schematics/angular/utility/config';
import chalk from 'chalk';
import { Schema } from '../schema';

const hammerjsImportStatement = `import 'hammerjs';`;

/** Adds HammerJS to the main file of the specified Angular CLI project. */
export function hammerjsImport (options: Schema): Rule {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const mainFile = getProjectMainFile(project);

    const recorder = host.beginUpdate(mainFile);
    const buffer = host.read(mainFile);

    if (!buffer) {
      console.log();
      return console.error(chalk.red(`Could not read the project main file (${chalk.blue(mainFile)}). Please manually ` +
        `import HammerJS in your main TypeScript file.`));
    }

    const fileContent = buffer.toString('utf8');

    if (fileContent.includes(hammerjsImportStatement)) {
      console.log();
      return console.log(`HammerJS is already imported in the project main file (${chalk.blue(mainFile)}).`);
    }

    recorder.insertRight(0, `${hammerjsImportStatement}\n`);
    host.commitUpdate(recorder);
  };
}
