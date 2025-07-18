/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  addSymbolToNgModuleMetadata,
  findNodes,
  getAppModulePath,
  getDecoratorMetadata,
  getProjectFromWorkspace,
  getProjectMainFile,
  insertAfterLastOccurrence,
  insertImport,
  isStandaloneApp,
  parseSourceFile
} from '@angular/cdk/schematics';

import { chain, Rule, Tree } from '@angular-devkit/schematics';
import { addRootProvider, readWorkspace } from '@schematics/angular/utility';
import { Change, InsertChange, NoopChange } from '@schematics/angular/utility/change';
import { findAppConfig } from '@schematics/angular/utility/standalone/app_config';
import { findBootstrapApplicationCall } from '@schematics/angular/utility/standalone/util';
import { blue, cyan, yellow } from 'chalk';
import * as ts from 'typescript';

import { applyChangesToFile } from '../../utils/apply-changes';
import { Schema } from '../schema';

export function registerLocale(options: Schema): Rule {
  return async (host: Tree) => {
    const workspace = await readWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const mainFile = getProjectMainFile(project);
    if (isStandaloneApp(host, mainFile)) {
      return registerLocaleInStandaloneApp(mainFile, options);
    } else {
      return registerLocaleInAppModule(mainFile, options);
    }
  };
}

/**
 * Safely creates an import change, returning NoopChange if the moduleSource is invalid
 * or if the import already exists.
 */
function safeInsertImport(moduleSource: ts.SourceFile | undefined, filePath: string, symbolName: string, fileName: string, isDefault = false): Change {
  if (!moduleSource) {
    console.log();
    console.log(yellow(`Could not insert import for ${symbolName} in file (${blue(filePath)}).`));
    console.log(yellow(`The source file is invalid.`));
    return new NoopChange();
  }

  // Check if the import already exists
  const allImports = findNodes(moduleSource, ts.SyntaxKind.ImportDeclaration);
  if (!allImports) {
    return new NoopChange();
  }

  const importExists = allImports.some(node => {
    // Make sure it's an import declaration
    if (!ts.isImportDeclaration(node)) {
      return false;
    }

    if (!node.moduleSpecifier) {
      return false;
    }

    // Check if this import is from the same file
    if (!ts.isStringLiteral(node.moduleSpecifier)) {
      return false;
    }
    const importPath = node.moduleSpecifier.text;
    if (importPath !== fileName) {
      return false;
    }

    // Check if the symbol is already imported
    if (!node.importClause) {
      return false;
    }
    const namedBindings = node.importClause.namedBindings;
    if (!namedBindings) {
      return false;
    }

    if (ts.isNamedImports(namedBindings)) {
      return namedBindings.elements.some(element =>
        element.name.text === symbolName
      );
    }

    return false;
  });

  if (importExists) {
    return new NoopChange();
  }

  try {
    return insertImport(moduleSource, filePath, symbolName, fileName, isDefault);
  } catch (e) {
    console.log();
    console.log(yellow(`Could not insert import for ${symbolName} in file (${blue(filePath)}).`));
    console.log(yellow(`Error: ${e.message}`));
    return new NoopChange();
  }
}

function registerLocaleInAppModule(mainFile: string, options: Schema): Rule {
  return async (host: Tree) => {
    const appModulePath = getAppModulePath(host, mainFile);
    const moduleSource = parseSourceFile(host, appModulePath);

    const locale = options.locale || 'en_US';
    const localePrefix = locale.split('_')[0];

    applyChangesToFile(host, appModulePath, [
      safeInsertImport(moduleSource, appModulePath, 'provideNzI18n', 'ng-zorro-antd/i18n'),
      safeInsertImport(moduleSource, appModulePath, locale, 'ng-zorro-antd/i18n'),
      safeInsertImport(moduleSource, appModulePath, 'registerLocaleData', '@angular/common'),
      safeInsertImport(moduleSource, appModulePath, localePrefix, `@angular/common/locales/${localePrefix}`, true),
      registerLocaleData(moduleSource, appModulePath, localePrefix),
      ...insertI18nTokenProvide(moduleSource, appModulePath, locale)
    ]);
  };
}

function registerLocaleInStandaloneApp(mainFile: string, options: Schema): Rule {
  const locale = options.locale || 'en_US';

  return chain([
    async (host: Tree) => {
      try {
        const bootstrapCall = findBootstrapApplicationCall(host, mainFile);
        if (!bootstrapCall) {
          console.log();
          console.log(yellow(`Could not find bootstrap application call in file (${blue(mainFile)}).`));
          return void 0;
        }

        const appConfig = findAppConfig(bootstrapCall, host, mainFile);
        if (!appConfig || !appConfig.filePath) {
          console.log();
          console.log(yellow(`Could not find app config in file (${blue(mainFile)}).`));
          return void 0;
        }

        const appConfigFile = appConfig.filePath;
        const appConfigSource = parseSourceFile(host, appConfig.filePath);
        if (!appConfigSource) {
          console.log();
          console.log(yellow(`Could not parse app config file (${blue(appConfigFile)}).`));
          return void 0;
        }

        const localePrefix = locale.split('_')[0];

        applyChangesToFile(host, appConfigFile, [
          safeInsertImport(appConfigSource, appConfigFile, locale, 'ng-zorro-antd/i18n'),
          safeInsertImport(appConfigSource, appConfigFile, 'registerLocaleData', '@angular/common'),
          safeInsertImport(appConfigSource, appConfigFile, localePrefix, `@angular/common/locales/${localePrefix}`, true),
          registerLocaleData(appConfigSource, appConfigFile, localePrefix)
        ]);
      } catch (e) {
        console.log(yellow(`Error registering locale in standalone app: ${e.message}`));
      }
    },
    addRootProvider(options.project, ({ code, external }) => {
      return code`${external('provideNzI18n', 'ng-zorro-antd/i18n')}(${locale})`;
    })
  ]);
}

function registerLocaleData(moduleSource: ts.SourceFile, modulePath: string, locale: string): Change {
  const allImports = findNodes(moduleSource, ts.SyntaxKind.ImportDeclaration);
  const allFun = findNodes(moduleSource, ts.SyntaxKind.ExpressionStatement);

  // Check if allImports is valid before proceeding
  if (!allImports || allImports.length === 0) {
    console.log(yellow(`Could not add the registerLocaleData to file (${blue(modulePath)}).` +
      `because no import declarations were found.`));
    console.log(yellow(`Please manually add the following code:`));
    console.log(cyan(`registerLocaleData(${locale});`));
    return new NoopChange();
  }

  // Safely filter the expression statements
  const registerLocaleDataFun = allFun.filter(node => {
    if (!node) return false;
    const children = node.getChildren();
    if (!children || children.length === 0) {
      return false;
    }
    const firstChild = children[0];
    if (!firstChild) {
      return false;
    }
    const firstChildChildren = firstChild.getChildren();
    if (!firstChildChildren || firstChildChildren.length === 0) {
      return false;
    }
    const firstChildFirstChild = firstChildChildren[0];
    if (!firstChildFirstChild) {
      return false;
    }
    return firstChildFirstChild.getText() === 'registerLocaleData';
  });

  if (registerLocaleDataFun.length === 0) {
    return insertAfterLastOccurrence(allImports, `\n\nregisterLocaleData(${locale});`,
      modulePath, 0) as InsertChange;
  } else {
    console.log(yellow(`Could not add the registerLocaleData to file (${blue(modulePath)}).` +
      `because there is already a registerLocaleData function.`));
    console.log(yellow(`Please manually add the following code:`));
    console.log(cyan(`registerLocaleData(${locale});`));
    return new NoopChange();
  }
}

function insertI18nTokenProvide(moduleSource: ts.SourceFile, modulePath: string, locale: string): Change[] {
  const metadataField = 'providers';
  const nodes = getDecoratorMetadata(moduleSource, 'NgModule', '@angular/core');

  // Check if nodes are valid
  if (!nodes || nodes.length === 0) {
    console.log(yellow(`Could not find NgModule decorator in file (${blue(modulePath)}).`));
    console.log(yellow(`Please manually add the following code to your providers:`));
    console.log(cyan(`provideNzI18n(${locale})`));
    return [];
  }

  const addProvide = addSymbolToNgModuleMetadata(
    moduleSource,
    modulePath,
    'providers',
    `provideNzI18n(${locale})`,
    null
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const node: any = nodes[0];

  if (!node) {
    return [];
  }

  // Check if a node has properties
  if (!node.properties) {
    console.log(yellow(`Could not find properties in NgModule decorator in file (${blue(modulePath)}).`));
    console.log(yellow(`Please manually add the following code to your providers:`));
    console.log(cyan(`provideNzI18n(${locale})`));
    return [];
  }

  const matchingProperties: ts.ObjectLiteralElement[] =
    (node as ts.ObjectLiteralExpression).properties
      .filter(prop => prop && prop.kind === ts.SyntaxKind.PropertyAssignment)
      .filter((prop: ts.PropertyAssignment) => {
        if (!prop || !prop.name) return false;
        const name = prop.name;
        switch (name.kind) {
          case ts.SyntaxKind.Identifier:
            return (name as ts.Identifier).getText(moduleSource) === metadataField;
          case ts.SyntaxKind.StringLiteral:
            return (name as ts.StringLiteral).text === metadataField;
        }

        return false;
      });

  if (!matchingProperties) {
    return [];
  }

  if (matchingProperties.length) {
    const assignment = matchingProperties[0] as ts.PropertyAssignment;
    if (!assignment || !assignment.initializer || assignment.initializer.kind !== ts.SyntaxKind.ArrayLiteralExpression) {
      return [];
    }
    const arrLiteral = assignment.initializer as ts.ArrayLiteralExpression;
    if (!arrLiteral.elements || arrLiteral.elements.length === 0) {
      return addProvide;
    } else {
      // Safely check for getText method before calling it
      const provideWithToken = arrLiteral.elements.some(e => e && typeof e.getText === 'function' && e.getText().includes('NZ_I18N'));
      const provideWithFunc = arrLiteral.elements.some(e => e && typeof e.getText === 'function' && e.getText().includes('provideNzI18n'));

      if (!provideWithFunc && !provideWithToken) {
        return addProvide;
      }

      console.log();
      console.log(yellow(`Could not provide the locale token to file (${blue(modulePath)}), because there is already a locale token in providers.`));

      if (provideWithToken) {
        console.log(yellow(`Please manually add the following code to your providers:`));
        console.log(cyan(`provideNzI18n(${locale})`));
      }
      return [];
    }
  } else {
    return addProvide;
  }
}
