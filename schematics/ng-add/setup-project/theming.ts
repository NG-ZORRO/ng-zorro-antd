import { normalize } from '@angular-devkit/core';
import { SchematicsException, Tree } from '@angular-devkit/schematics';
import {
  getProjectFromWorkspace,
  getProjectStyleFile,
  getProjectTargetOptions
} from '@angular/cdk/schematics';
import { InsertChange } from '@schematics/angular/utility/change';
import { getWorkspace } from '@schematics/angular/utility/config';
import { ProjectType, WorkspaceProject, WorkspaceSchema } from '@schematics/angular/utility/workspace-models';
import chalk from 'chalk';
import { join } from 'path';
import { createCustomTheme } from '../../utils/create-custom-theme';
import { Schema } from '../schema';

const compiledThemePathSegment = 'ng-zorro-antd';
const compiledThemePath = './node_modules/ng-zorro-antd/ng-zorro-antd.min.css';
const defaultCustomThemeFilename = 'theme.less';

/** Object that maps a CLI target to its default builder name. */
const defaultTargetBuilders = {
  build: '@angular-devkit/build-angular:browser',
  test : '@angular-devkit/build-angular:karma'
};

/** Add pre-built styles to the main project style file. */
export function addThemeToAppStyles(options: Schema): (host: Tree) => Tree {
  return function (host: Tree): Tree {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project) as WorkspaceProject<ProjectType.Application>;

    if (options.theme) {
      insertCustomTheme(project, options.project, host, workspace);
    } else {
      insertCompiledTheme(project, host, workspace);
    }

    return host;
  };
}

/**
 * Insert a custom theme to project style file. If no valid style file could be found, a new
 * Scss file for the custom theme will be created.
 */
function insertCustomTheme(project: WorkspaceProject, projectName: string, host: Tree,
                           workspace: WorkspaceSchema): void {

  const stylesPath = getProjectStyleFile(project, 'less');
  const themeContent = createCustomTheme();

  if (!stylesPath) {
    if (!project.sourceRoot) {
      throw new SchematicsException(`Could not find source root for project: "${projectName}". ` +
        `Please make sure that the "sourceRoot" property is set in the workspace config.`);
    }

    // Normalize the path through the devkit utilities because we want to avoid having
    // unnecessary path segments and windows backslash delimiters.
    const customThemePath = normalize(join(project.sourceRoot, defaultCustomThemeFilename));

    if (host.exists(customThemePath)) {
      console.log();
      console.warn(chalk.yellow(`Cannot create a custom NG-ZORRO theme because
          ${chalk.bold(customThemePath)} already exists. Skipping custom theme generation.`));
      return;
    }

    host.create(customThemePath, themeContent);
    addThemeStyleToTarget(project, 'build', host, customThemePath, workspace);
    return;
  }

  const insertion = new InsertChange(stylesPath, 0, themeContent);
  const recorder = host.beginUpdate(stylesPath);

  recorder.insertLeft(insertion.pos, insertion.toAdd);
  host.commitUpdate(recorder);
}

/** Insert a pre-built theme into the angular.json file. */
function insertCompiledTheme(project: WorkspaceProject, host: Tree,
                             workspace: WorkspaceSchema): void {
  addThemeStyleToTarget(project, 'build', host, compiledThemePath, workspace);
  addThemeStyleToTarget(project, 'test', host, compiledThemePath, workspace);
}

/** Adds a theming style entry to the given project target options. */
function addThemeStyleToTarget(project: WorkspaceProject, targetName: 'test' | 'build', host: Tree,
                               assetPath: string, workspace: WorkspaceSchema): void {
  // Do not update the builder options in case the target does not use the default CLI builder.
  if (!validateDefaultTargetBuilder(project, targetName)) {
    return;
  }

  const targetOptions = getProjectTargetOptions(project, targetName);

  if (!targetOptions.styles) {
    targetOptions.styles = [ assetPath ];
  } else {
    const existingStyles = targetOptions.styles.map(s => typeof s === 'string' ? s : s.input);

    for (const [ index, stylePath ] of existingStyles.entries()) {
      // If the given asset is already specified in the styles, we don't need to do anything.
      if (stylePath === assetPath) {
        return;
      }

      // In case a prebuilt theme is already set up, we can safely replace the theme with the new
      // theme file. If a custom theme is set up, we are not able to safely replace the custom
      // theme because these files can contain custom styles, while prebuilt themes are
      // always packaged and considered replaceable.
      if (stylePath.includes(defaultCustomThemeFilename)) {
        console.log();
        console.warn(chalk.yellow(`Could not style file to the CLI project configuration ` +
          `because there is already a custom theme file referenced.`));
        console.warn(chalk.yellow(`Please manually add the following style file to your configuration:`));
        console.warn(chalk.cyan(`${chalk.bold(assetPath)}`));
        return;
      } else if (stylePath.includes(compiledThemePathSegment)) {
        targetOptions.styles.splice(index, 1);
      }
    }

    targetOptions.styles.unshift(assetPath);
  }

  host.overwrite('angular.json', JSON.stringify(workspace, null, 2));
}

/**
 * Validates that the specified project target is configured with the default builders which are
 * provided by the Angular CLI. If the configured builder does not match the default builder,
 * this function can either throw or just show a warning.
 */
function validateDefaultTargetBuilder(project: WorkspaceProject, targetName: 'build' | 'test'): boolean {
  const defaultBuilder = defaultTargetBuilders[ targetName ];
  const targetConfig = project.architect && project.architect[ targetName ] ||
    project.targets && project.targets[ targetName ];
  const isDefaultBuilder = targetConfig && targetConfig.builder === defaultBuilder;

  if (!isDefaultBuilder && targetName === 'build') {
    throw new SchematicsException(`Your project is not using the default builders for ` +
      `"${targetName}". The NG-ZORRO schematics cannot add a theme to the workspace ` +
      `configuration if the builder has been changed.`);
  } else if (!isDefaultBuilder) {
    console.warn(`Your project is not using the default builders for "${targetName}". This ` +
      `means that we cannot add the configured theme to the "${targetName}" target.`);
  }

  return isDefaultBuilder;
}
