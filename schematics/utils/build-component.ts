/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { strings, template as interpolateTemplate } from '@angular-devkit/core';
import { ProjectDefinition } from '@angular-devkit/core/src/workspace';
import {
  apply,
  applyTemplates,
  branchAndMerge,
  chain,
  filter,
  mergeWith,
  move,
  noop,
  Rule,
  SchematicsException,
  Tree,
  url
} from '@angular-devkit/schematics';
import { FileSystemSchematicContext } from '@angular-devkit/schematics/tools';
import { getDefaultComponentOptions, getProjectFromWorkspace } from '@angular/cdk/schematics';
import { Schema as ComponentOptions, Style } from '@schematics/angular/component/schema';
import * as ts from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';
import {
  addDeclarationToModule,
  addEntryComponentToModule,
  addExportToModule,
  getDecoratorMetadata
} from '@schematics/angular/utility/ast-utils';
import { InsertChange } from '@schematics/angular/utility/change';
import { buildRelativePath, findModuleFromOptions } from '@schematics/angular/utility/find-module';
import { parseName } from '@schematics/angular/utility/parse-name';
import { validateHtmlSelector, validateName } from '@schematics/angular/utility/validation';
import { getWorkspace } from '@schematics/angular/utility/workspace';
import { ProjectType } from '@schematics/angular/utility/workspace-models';
import { readFileSync, statSync } from 'fs';
import { dirname, join, resolve } from 'path';

function findClassDeclarationParent(node: ts.Node): ts.ClassDeclaration|undefined {
  if (ts.isClassDeclaration(node)) {
    return node;
  }

  return node.parent && findClassDeclarationParent(node.parent);
}

function getFirstNgModuleName(source: ts.SourceFile): string|undefined {
  // First, find the @NgModule decorators.
  const ngModulesMetadata = getDecoratorMetadata(source, 'NgModule', '@angular/core');
  if (ngModulesMetadata.length === 0) {
    return undefined;
  }

  // Then walk parent pointers up the AST, looking for the ClassDeclaration parent of the NgModule
  // metadata.
  const moduleClass = findClassDeclarationParent(ngModulesMetadata[0]);
  if (!moduleClass || !moduleClass.name) {
    return undefined;
  }

  // Get the class name of the module ClassDeclaration.
  return moduleClass.name.text;
}

export interface ZorroComponentOptions extends ComponentOptions {
  classnameWithModule: boolean;
}

/**
 * Build a default project path for generating.
 * @param project The project to build the path for.
 */
function buildDefaultPath(project: ProjectDefinition): string {
  const root = project.sourceRoot
    ? `/${project.sourceRoot}/`
    : `/${project.root}/src/`;

  const projectDirName = project.extensions.projectType === ProjectType.Application ? 'app' : 'lib';

  return `${root}${projectDirName}`;
}

/**
 * List of style extensions which are CSS compatible. All supported CLI style extensions can be
 * found here: angular/angular-cli/master/packages/schematics/angular/ng-new/schema.json#L118-L122
 */
const supportedCssExtensions = [ 'css', 'scss', 'sass', 'less' ];

// tslint:disable-next-line no-any
function readIntoSourceFile(host: Tree, modulePath: string): any {
  const text = host.read(modulePath);
  if (text === null) {
    throw new SchematicsException(`File ${modulePath} does not exist.`);
  }

  return ts.createSourceFile(modulePath, text.toString('utf-8'), ts.ScriptTarget.Latest, true);
}

// tslint:disable-next-line no-any
function getModuleClassnamePrefix(source: any): string {
  const className = getFirstNgModuleName(source);
  if (className) {
    const execArray = /(\w+)Module/gi.exec(className);
    return execArray?.[1] ?? null;
  } else {
    return null;
  }
}

function addDeclarationToNgModule(options: ZorroComponentOptions): Rule {
  return (host: Tree) => {
    if (options.skipImport || !options.module) {
      return host;
    }

    const modulePath = options.module;
    let source = readIntoSourceFile(host, modulePath);

    const componentPath = `/${options.path}/${options.flat ? '' : strings.dasherize(options.name) + '/'}${strings.dasherize(options.name)}.component`;
    const relativePath = buildRelativePath(modulePath, componentPath);
    let classifiedName = strings.classify(`${options.name}Component`);

    if (options.classnameWithModule) {
      const modulePrefix = getModuleClassnamePrefix(source);
      if (modulePrefix) {
        classifiedName = `${modulePrefix}${classifiedName}`
      }
    }

    const declarationChanges = addDeclarationToModule(
      source,
      modulePath,
      classifiedName,
      relativePath
    );

    const declarationRecorder = host.beginUpdate(modulePath);
    for (const change of declarationChanges) {
      if (change instanceof InsertChange) {
        declarationRecorder.insertLeft(change.pos, change.toAdd);
      }
    }
    host.commitUpdate(declarationRecorder);

    if (options.export) {
      // Need to refresh the AST because we overwrote the file in the host.
      source = readIntoSourceFile(host, modulePath);

      const exportRecorder = host.beginUpdate(modulePath);
      const exportChanges = addExportToModule(
        source,
        modulePath,
        strings.classify(`${options.name}Component`),
        relativePath
      );

      for (const change of exportChanges) {
        if (change instanceof InsertChange) {
          exportRecorder.insertLeft(change.pos, change.toAdd);
        }
      }
      host.commitUpdate(exportRecorder);
    }

    if (options.entryComponent) {
      // Need to refresh the AST because we overwrote the file in the host.
      source = readIntoSourceFile(host, modulePath);

      const entryComponentRecorder = host.beginUpdate(modulePath);
      const entryComponentChanges = addEntryComponentToModule(
        source,
        modulePath,
        strings.classify(`${options.name}Component`),
        relativePath);

      for (const change of entryComponentChanges) {
        if (change instanceof InsertChange) {
          entryComponentRecorder.insertLeft(change.pos, change.toAdd);
        }
      }
      host.commitUpdate(entryComponentRecorder);
    }

    return host;
  };
}

function buildSelector(options: ZorroComponentOptions, projectPrefix: string, modulePrefixName: string): string {
  let selector = strings.dasherize(options.name);
  let modulePrefix = '';
  if (modulePrefixName) {
    modulePrefix = strings.dasherize(modulePrefixName) + '-';
  }
  if (options.prefix) {
    selector = `${options.prefix}-${modulePrefix}${selector}`;
  } else if (options.prefix === undefined && projectPrefix) {
    selector = `${projectPrefix}-${modulePrefix}${selector}`;
  }
  return selector;

}

/**
 * Indents the text content with the amount of specified spaces. The spaces will be added after
 * every line-break. This utility function can be used inside of EJS templates to properly
 * include the additional files.
 */
function indentTextContent(text: string, numSpaces: number): string {
  // In the Material project there should be only LF line-endings, but the schematic files
  // are not being linted and therefore there can be also CRLF or just CR line-endings.
  return text.replace(/(\r\n|\r|\n)/g, `$1${' '.repeat(numSpaces)}`);
}

/**
 * Rule that copies and interpolates the files that belong to this schematic context. Additionally
 * a list of file paths can be passed to this rule in order to expose them inside the EJS
 * template context.
 *
 * This allows inlining the external template or stylesheet files in EJS without having
 * to manually duplicate the file content.
 */
export function buildComponent(options: ZorroComponentOptions,
                               additionalFiles: { [ key: string ]: string } = {}): Rule {

  return async (host: Tree, context: FileSystemSchematicContext) => {
    const workspace = await getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const defaultZorroComponentOptions = getDefaultComponentOptions(project);
    let modulePrefix = '';
    // TODO(devversion): Remove if we drop support for older CLI versions.
    // This handles an unreported breaking change from the @angular-devkit/schematics. Previously
    // the description path resolved to the factory file, but starting from 6.2.0, it resolves
    // to the factory directory.
    const schematicPath = statSync(context.schematic.description.path).isDirectory() ?
      context.schematic.description.path :
      dirname(context.schematic.description.path);

    const schematicFilesUrl = './files';
    const schematicFilesPath = resolve(schematicPath, schematicFilesUrl);

    options.style = options.style || Style.Css;
    // Add the default component option values to the options if an option is not explicitly
    // specified but a default component option is available.
    Object.keys(options)
    .filter(optionName => options[ optionName ] == null && defaultZorroComponentOptions[ optionName ])
    .forEach(optionName => options[ optionName ] = defaultZorroComponentOptions[ optionName ]);

    if (options.path === undefined) {
      // TODO(jelbourn): figure out if the need for this `as any` is a bug due to two different
      // incompatible `WorkspaceProject` classes in @angular-devkit
      // tslint:disable-next-line no-any
      options.path = buildDefaultPath(project as any);
    }

    options.module = findModuleFromOptions(host, options);

    const parsedPath = parseName(options.path!, options.name);
    if (options.classnameWithModule && !options.skipImport && options.module) {
      const source = readIntoSourceFile(host, options.module);
      modulePrefix = getModuleClassnamePrefix(source);
    }

    options.name = parsedPath.name;
    options.path = parsedPath.path;
    options.selector = options.selector || buildSelector(options, project.prefix, modulePrefix);

    validateName(options.name);
    validateHtmlSelector(options.selector!);

    // In case the specified style extension is not part of the supported CSS supersets,
    // we generate the stylesheets with the "css" extension. This ensures that we don't
    // accidentally generate invalid stylesheets (e.g. drag-drop-comp.styl) which will
    // break the Angular CLI project. See: https://github.com/angular/material2/issues/15164
    if (!supportedCssExtensions.includes(options.style!)) {
      // TODO: Cast is necessary as we can't use the Style enum which has been introduced
      // within CLI v7.3.0-rc.0. This would break the schematic for older CLI versions.
      options.style = Style.Css;
    }

    const classifyCovered = (name: string) => {
      return `${modulePrefix}${strings.classify(name)}`
    };
    // Object that will be used as context for the EJS templates.
    const baseTemplateContext = {
      ...strings,
      'if-flat': (s: string) => options.flat ? '' : s,
      classify: classifyCovered,
      ...options
    };

    // Key-value object that includes the specified additional files with their loaded content.
    // The resolved contents can be used inside EJS templates.
    const resolvedFiles = {};

    for (const key in additionalFiles) {
      if (additionalFiles[ key ]) {
        const fileContent = readFileSync(join(schematicFilesPath, additionalFiles[ key ]), 'utf-8');

        // Interpolate the additional files with the base EJS template context.
        resolvedFiles[ key ] = interpolateTemplate(fileContent)(baseTemplateContext);
      }
    }

    const templateSource = apply(url(schematicFilesUrl), [
      options.skipTests ? filter(path => !path.endsWith('.spec.ts.template')) : noop(),
      options.inlineStyle ? filter(path => !path.endsWith('.__style__.template')) : noop(),
      options.inlineTemplate ? filter(path => !path.endsWith('.html.template')) : noop(),
      // Treat the template options as any, because the type definition for the template options
      // is made unnecessarily explicit. Every type of object can be used in the EJS template.
      // tslint:disable-next-line no-any
      applyTemplates({ indentTextContent, resolvedFiles, ...baseTemplateContext } as any),
      // TODO(devversion): figure out why we cannot just remove the first parameter
      // See for example: angular-cli#schematics/angular/component/index.ts#L160
      // tslint:disable-next-line no-any
      move(null as any, parsedPath.path)
    ]);

    return () => chain([
      branchAndMerge(chain([
        addDeclarationToNgModule(options),
        mergeWith(templateSource)
      ]))
    ])(host, context);
  };
}
