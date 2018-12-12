import { Rule, Tree } from '@angular-devkit/schematics';
import { getProjectFromWorkspace, getProjectMainFile, getSourceFile } from '@angular/cdk/schematics';
import {
  addSymbolToNgModuleMetadata,
  findNodes,
  getDecoratorMetadata,
  insertAfterLastOccurrence,
  insertImport
} from '@schematics/angular/utility/ast-utils';
import { Change, InsertChange, NoopChange } from '@schematics/angular/utility/change';
import { getWorkspace } from '@schematics/angular/utility/config';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import chalk from 'chalk';
import * as ts from 'typescript';

import { Schema } from '../schema';

export function registerLocale(options: Schema): Rule {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const appModulePath = getAppModulePath(host, getProjectMainFile(project));
    const moduleSource = getSourceFile(host, appModulePath);

    const locale = getCompatibleLocal(options);
    const localePrefix = locale.split('_')[ 0 ];

    const recorder = host.beginUpdate(appModulePath);

    const changes = [
      insertImport(moduleSource, appModulePath, 'NZ_I18N',
        'ng-zorro-antd'),
      insertImport(moduleSource, appModulePath, locale,
        'ng-zorro-antd'),
      insertImport(moduleSource, appModulePath, 'registerLocaleData',
        '@angular/common'),
      insertImport(moduleSource, appModulePath, localePrefix,
        `@angular/common/locales/${localePrefix}`, true),
      registerLocaleData(moduleSource, appModulePath, localePrefix),
      ...insertI18nTokenProvide(moduleSource, appModulePath, locale)
    ];

    changes.forEach((change) => {
      if (change instanceof InsertChange) {
        recorder.insertLeft(change.pos, change.toAdd);
      }
    });

    host.commitUpdate(recorder);

    return host;
  };
}

function getCompatibleLocal(options: Schema): string {
  const defaultLocal = 'en_US';
  if (options.locale === options.i18n) {
    return options.locale;
  } else if (options.locale === defaultLocal) {

    console.log();
    console.log(`${chalk.bgYellow('WARN')} ${chalk.cyan('--i18n')} option will be deprecated, ` +
      `use ${chalk.cyan('--locale')} instead`);

    return options.i18n;
  } else {
    return options.locale || defaultLocal;
  }
}

function registerLocaleData(moduleSource: ts.SourceFile, modulePath: string, locale: string): Change {
  const allImports = findNodes(moduleSource, ts.SyntaxKind.ImportDeclaration);
  const allFun = findNodes(moduleSource, ts.SyntaxKind.ExpressionStatement);

  const registerLocaleDataFun = allFun.filter(node => {
    const fun = node.getChildren();
    return fun[ 0 ].getChildren()[ 0 ] && fun[ 0 ].getChildren()[ 0 ].getText() === 'registerLocaleData';
  });

  if (registerLocaleDataFun.length === 0) {
    return insertAfterLastOccurrence(allImports, `\n\nregisterLocaleData(${locale});`,
      modulePath, 0) as InsertChange;
  } else {
    console.log();
    console.log(chalk.yellow(`Could not add the registerLocaleData to your app.module file (${chalk.blue(modulePath)}).` +
      `because there is already a registerLocaleData function.`));
    console.log(chalk.yellow(`Please manually add the following code to your app.module:`));
    console.log(chalk.cyan(`registerLocaleData(${locale});`));
    return new NoopChange();
  }
}

function insertI18nTokenProvide(moduleSource: ts.SourceFile, modulePath: string, locale: string): Change[] {
  const metadataField = 'providers';
  const nodes = getDecoratorMetadata(moduleSource, 'NgModule', '@angular/core');
  const addProvide = addSymbolToNgModuleMetadata(moduleSource, modulePath, 'providers',
    `{ provide: NZ_I18N, useValue: ${locale} }`, null);
  let node: any = nodes[ 0 ];  // tslint:disable-line:no-any

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
    const assignment = matchingProperties[ 0 ] as ts.PropertyAssignment;
    if (assignment.initializer.kind !== ts.SyntaxKind.ArrayLiteralExpression) {
      return [];
    }
    const arrLiteral = assignment.initializer as ts.ArrayLiteralExpression;
    if (arrLiteral.elements.length === 0) {
      return addProvide;
    } else {
      node = arrLiteral.elements.filter(e => e.getText && e.getText().includes('NZ_I18N'));
      if (node.length === 0) {
        return addProvide;
      } else {
        console.log();
        console.log(chalk.yellow(`Could not provide the locale token to your app.module file (${chalk.blue(modulePath)}).` +
          `because there is already a locale token in provides.`));
        console.log(chalk.yellow(`Please manually add the following code to your provides:`));
        console.log(chalk.cyan(`{ provide: NZ_I18N, useValue: ${locale} }`));
        return [];
      }
    }
  } else {
    return addProvide;
  }

}
