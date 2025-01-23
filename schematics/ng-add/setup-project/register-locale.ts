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
import { addRootProvider } from '@schematics/angular/utility';
import { Change, InsertChange, NoopChange } from '@schematics/angular/utility/change';
import { findAppConfig } from '@schematics/angular/utility/standalone/app_config';
import { findBootstrapApplicationCall } from '@schematics/angular/utility/standalone/util';
import { getWorkspace } from '@schematics/angular/utility/workspace';
import { blue, cyan, yellow } from 'chalk';
import * as ts from 'typescript';

import { applyChangesToFile } from '../../utils/apply-changes';
import { Schema } from '../schema';

export function registerLocale(options: Schema): Rule {
  return async (host: Tree) => {
    const workspace = await getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const mainFile = getProjectMainFile(project);
    if (isStandaloneApp(host, mainFile)) {
      return registerLocaleInStandaloneApp(mainFile, options);
    } else {
      return registerLocaleInAppModule(mainFile, options);
    }
  };
}

function registerLocaleInAppModule(mainFile: string, options: Schema): Rule {
  return async (host: Tree) => {
    const appModulePath = getAppModulePath(host, mainFile);
    const moduleSource = parseSourceFile(host, appModulePath);

    const locale = options.locale || 'en_US';
    const localePrefix = locale.split('_')[0];

    applyChangesToFile(host, appModulePath, [
      insertImport(moduleSource, appModulePath, 'provideNzI18n',
        'ng-zorro-antd/i18n'),
      insertImport(moduleSource, appModulePath, locale,
        'ng-zorro-antd/i18n'),
      insertImport(moduleSource, appModulePath, 'registerLocaleData',
        '@angular/common'),
      insertImport(moduleSource, appModulePath, localePrefix,
        `@angular/common/locales/${localePrefix}`, true),
      registerLocaleData(moduleSource, appModulePath, localePrefix),
      ...insertI18nTokenProvide(moduleSource, appModulePath, locale)
    ]);
  };
}

function registerLocaleInStandaloneApp(mainFile: string, options: Schema): Rule {
  const locale = options.locale || 'en_US';

  return chain([
    async (host: Tree) => {
      const bootstrapCall = findBootstrapApplicationCall(host, mainFile);
      const appConfig = findAppConfig(bootstrapCall, host, mainFile);
      const appConfigFile = appConfig.filePath;
      const appConfigSource = parseSourceFile(host, appConfig.filePath);
      const localePrefix = locale.split('_')[0];

      applyChangesToFile(host, appConfigFile, [
        insertImport(appConfigSource, appConfigFile, locale, 'ng-zorro-antd/i18n'),
        insertImport(appConfigSource, appConfigFile, 'registerLocaleData', '@angular/common'),
        insertImport(appConfigSource, appConfigFile, localePrefix, `@angular/common/locales/${localePrefix}`, true),
        registerLocaleData(appConfigSource, appConfigFile, localePrefix)
      ]);
    },
    addRootProvider(options.project, ({ code, external }) => {
      return code`${external('provideNzI18n', 'ng-zorro-antd/i18n')}(${locale})`;
    })
  ]);
}

function registerLocaleData(moduleSource: ts.SourceFile, modulePath: string, locale: string): Change {
  const allImports = findNodes(moduleSource, ts.SyntaxKind.ImportDeclaration);
  const allFun = findNodes(moduleSource, ts.SyntaxKind.ExpressionStatement);

  const registerLocaleDataFun = allFun.filter(node => {
    const fun = node.getChildren();
    return fun[0].getChildren()[0]?.getText() === 'registerLocaleData';
  });

  if (registerLocaleDataFun.length === 0) {
    return insertAfterLastOccurrence(allImports, `\n\nregisterLocaleData(${locale});`,
      modulePath, 0) as InsertChange;
  } else {
    console.log();
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

  const matchingProperties: ts.ObjectLiteralElement[] =
    (node as ts.ObjectLiteralExpression).properties
      .filter(prop => prop.kind === ts.SyntaxKind.PropertyAssignment)
      .filter((prop: ts.PropertyAssignment) => {
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
    if (assignment.initializer.kind !== ts.SyntaxKind.ArrayLiteralExpression) {
      return [];
    }
    const arrLiteral = assignment.initializer as ts.ArrayLiteralExpression;
    if (arrLiteral.elements.length === 0) {
      return addProvide;
    } else {
      const provideWithToken = arrLiteral.elements.some(e => e.getText?.().includes('NZ_I18N'));
      const provideWithFunc = arrLiteral.elements.some(e => e.getText?.().includes('provideNzI18n'));

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
