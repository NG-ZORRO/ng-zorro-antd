/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  addModuleImportToRootModule,
  getAppModulePath,
  getProjectFromWorkspace,
  getProjectMainFile,
  hasNgModuleImport,
  isStandaloneApp
} from '@angular/cdk/schematics';

import { ProjectDefinition } from '@angular-devkit/core/src/workspace';
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import {
  addFunctionalProvidersToStandaloneBootstrap,
  callsProvidersFunction,
  importsProvidersFrom
} from '@schematics/angular/private/components';
import { getWorkspace } from '@schematics/angular/utility/workspace';

import { Schema } from '../schema';

export function addAnimationsModule(options: Schema): Rule {
  return async (host: Tree, context: SchematicContext) => {
    const workspace = await getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const mainFilePath = getProjectMainFile(project);
    if (isStandaloneApp(host, mainFilePath)) {
      addAnimationsToStandaloneApp(host, mainFilePath, context, options);
    } else {
      addAnimationsToNonStandaloneApp(host, project, mainFilePath, context, options);
    }
  };
}

/** Adds the animations module to an app that is bootstrap using the standalone component APIs. */
function addAnimationsToStandaloneApp(host: Tree, mainFile: string, context: SchematicContext, options: Schema): void {
  const animationsFunction = 'provideAnimations';
  const noopAnimationsFunction = 'provideNoopAnimations';

  if (options.animations) {
    // In case the project explicitly uses provideNoopAnimations, we should print a warning
    // message that makes the user aware of the fact that we won't automatically set up
    // animations. If we would add provideAnimations while provideNoopAnimations
    // is already configured, we would cause unexpected behavior and runtime exceptions.
    if (callsProvidersFunction(host, mainFile, noopAnimationsFunction)) {
      context.logger.error(
        `Could not add "${animationsFunction}" ` + `because "${noopAnimationsFunction}" is already provided.`
      );
      context.logger.info(`Please manually set up browser animations.`);
    } else {
      addFunctionalProvidersToStandaloneBootstrap(
        host,
        mainFile,
        animationsFunction,
        '@angular/platform-browser/animations'
      );
    }
  } else if (!options.animations && !importsProvidersFrom(host, mainFile, animationsFunction)) {
    // Do not add the provideNoopAnimations if the project already explicitly uses
    // the provideAnimations.
    addFunctionalProvidersToStandaloneBootstrap(
      host,
      mainFile,
      noopAnimationsFunction,
      '@angular/platform-browser/animations'
    );
  }
}

/**
 * Adds the animations module to an app that is bootstrap
 * using the non-standalone component APIs.
 */
function addAnimationsToNonStandaloneApp(
  host: Tree,
  project: ProjectDefinition,
  mainFile: string,
  context: SchematicContext,
  options: Schema
): void {
  const browserAnimationsModuleName = 'BrowserAnimationsModule';
  const noopAnimationsModuleName = 'NoopAnimationsModule';
  const appModulePath = getAppModulePath(host, mainFile);
  if (options.animations) {
    // In case the project explicitly uses the NoopAnimationsModule, we should print a warning
    // message that makes the user aware of the fact that we won't automatically set up
    // animations. If we would add the BrowserAnimationsModule while the NoopAnimationsModule
    // is already configured, we would cause unexpected behavior and runtime exceptions.
    if (hasNgModuleImport(host, appModulePath, noopAnimationsModuleName)) {
      context.logger.error(
        `Could not set up "${browserAnimationsModuleName}" ` +
          `because "${noopAnimationsModuleName}" is already imported.`
      );
      context.logger.info(`Please manually set up browser animations.`);
    } else {
      addModuleImportToRootModule(host, browserAnimationsModuleName, '@angular/platform-browser/animations', project);
    }
  } else if (!options.animations && !hasNgModuleImport(host, appModulePath, browserAnimationsModuleName)) {
    // Do not add the NoopAnimationsModule module if the project already explicitly uses
    // the BrowserAnimationsModule.
    addModuleImportToRootModule(host, noopAnimationsModuleName, '@angular/platform-browser/animations', project);
  }
}
