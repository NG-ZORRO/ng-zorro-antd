/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { getProjectFromWorkspace, getProjectStyleFile, getProjectTargetOptions } from '@angular/cdk/schematics';

import { logging, normalize } from '@angular-devkit/core';
import { noop, Rule, SchematicContext, SchematicsException, Tree } from '@angular-devkit/schematics';
import { ProjectDefinition, readWorkspace, updateWorkspace } from '@schematics/angular/utility';
import { InsertChange } from '@schematics/angular/utility/change';

import { join } from 'path';

import { createCustomTheme } from '../../utils/create-custom-theme';
import { Schema } from '../schema';

const compiledThemePathSegment = 'ng-zorro-antd';
const compiledThemePath = './node_modules/ng-zorro-antd/ng-zorro-antd.min.css';
const defaultCustomThemeFilename = 'theme.less';

/** Add pre-built styles to the main project style file. */
export function addThemeToAppStyles(options: Schema): Rule {
  return async (host: Tree, context: SchematicContext) => {
    if (options.theme) {
      return insertCustomTheme(options.project, host, context.logger);
    } else {
      // Insert a pre-built theme into the angular.json file
      return addThemeStyleToTarget(options.project, compiledThemePath, context.logger);
    }
  };
}

/**
 * Insert a custom theme to a project style file. If no valid style file could be found, a new
 * Scss file for the custom theme will be created.
 */
async function insertCustomTheme(projectName: string, host: Tree, logger: logging.LoggerApi): Promise<Rule> {
  const workspace = await readWorkspace(host);
  const project = getProjectFromWorkspace(workspace, projectName);
  const stylesPath = getProjectStyleFile(project, 'less');
  const themeContent = createCustomTheme();

  if (!stylesPath) {
    if (!project.sourceRoot) {
      throw new SchematicsException(
        `Could not find source root for project: "${projectName}". ` +
        `Please make sure that the "sourceRoot" property is set in the workspace config.`
      );
    }

    // Normalize the path through the devkit utilities because we want to avoid having
    // unnecessary path segments and window backslash delimiters.
    const customThemePath = normalize(join(project.sourceRoot, defaultCustomThemeFilename));

    if (host.exists(customThemePath)) {
      logger.warn(`Cannot create a custom NG-ZORRO theme because ${customThemePath} already exists. Skipping custom theme generation.`);
      return noop();
    }

    host.create(customThemePath, themeContent);
    return addThemeStyleToTarget(projectName, customThemePath, logger);
  }

  const insertion = new InsertChange(stylesPath, 0, themeContent);
  const recorder = host.beginUpdate(stylesPath);

  recorder.insertLeft(insertion.pos, insertion.toAdd);
  host.commitUpdate(recorder);
}

/** Adds a theming style entry to the given project target options. */
function addThemeStyleToTarget(
  projectName: string,
  assetPath: string,
  logger: logging.LoggerApi
): Rule {
  return updateWorkspace(workspace => {
    const project = getProjectFromWorkspace(workspace, projectName);
    // Do not update the builder options in case the target does not use the default CLI builder.
    if (!validateDefaultTargetBuilder(project)) {
      return;
    }
    const targetOptions = getProjectTargetOptions(project, 'build');
    const styles = targetOptions.styles as Array<string | { input: string }>;

    if (!styles) {
      targetOptions.styles = [assetPath];
    } else {
      const existingStyles = styles.map(s => (typeof s === 'string' ? s : s.input));

      for (const [index, stylePath] of existingStyles.entries()) {
        // If the given asset is already specified in the styles, we don't need to do anything.
        if (stylePath === assetPath) {
          return;
        }

        // In case a prebuilt theme is already set up, we can safely replace the theme with the new
        // theme file. If a custom theme is set up, we are not able to safely replace the custom
        // theme because these files can contain custom styles, while prebuilt themes are
        // always packaged and considered replaceable.
        if (stylePath.includes(defaultCustomThemeFilename)) {
          logger.error(
            `Could not style file to the CLI project configuration ` +
            `because there is already a custom theme file referenced.`
          );
          logger.info(`Please manually add the following style file to your configuration:`);
          logger.info(`${assetPath}`);
          return;
        } else if (stylePath.includes(compiledThemePathSegment)) {
          styles.splice(index, 1);
        }
      }
    }
    styles.unshift(assetPath);
  });
}

// Default target builder for build, which is provided by the Angular CLI.
const defaultTargetBuilder = '@angular/build:application';

/**
 * Validates that the build target is configured with the default builder which is provided
 * by the Angular CLI. If the configured builder does not match the default builder, this
 * function can throw an exception
 */
function validateDefaultTargetBuilder(project: ProjectDefinition): boolean {
  const targetConfig = project.targets && project.targets.get('build');
  const isDefaultBuilder = targetConfig && targetConfig.builder === defaultTargetBuilder;

  if (!isDefaultBuilder) {
    throw new SchematicsException(
      `Your project is not using the default builder for "build".` +
      `The NG-ZORRO schematics cannot add a theme to the workspace ` +
      `configuration if the builder has been changed.`
    );
  }

  return isDefaultBuilder;
}
