/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { DevkitMigration, getProjectMainFile, WorkspacePath } from '@angular/cdk/schematics';

import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
import { findAppConfig } from '@schematics/angular/utility/standalone/app_config';
import {
  findBootstrapApplicationCall,
  findProvidersLiteral,
  isMergeAppConfigCall
} from '@schematics/angular/utility/standalone/util';
import * as ts from 'typescript';

/**
 * Migration that adds `provideNzDateFnsAdapter()` to root providers.
 *
 * Starting from v22, date components require an explicit `NzDateAdapter` provider.
 * This migration makes the previous default (date-fns) explicit in projects where it can do so safely.
 * Projects that already configure a date adapter are left unchanged.
 */
export class DateAdapterMigration extends DevkitMigration<null> {
  /** Provider APIs that indicate the project already has an explicit date adapter choice. */
  private readonly dateAdapterProviderPattern =
    /^(provideNzDateAdapter|provideNzDateFnsAdapter|provideNzNativeDateAdapter)$/;

  /** Always enabled; the migration is scoped by project target in postAnalysis. */
  enabled: boolean = true;

  postAnalysis(): void {
    if (this.context.isTestTarget) {
      return;
    }

    const mainFile = getProjectMainFile(this.context.project);

    if (this.addProviderToStandaloneApp(mainFile)) {
      return;
    }

    this.addProviderToNgModuleApp(mainFile);
  }

  private addProviderToStandaloneApp(mainFile: string): boolean {
    try {
      const bootstrapCall = findBootstrapApplicationCall(this.context.tree, mainFile);
      const appConfig = findAppConfig(bootstrapCall, this.context.tree, mainFile);
      if (appConfig) {
        const appConfigSource = this.getSourceFile(appConfig.filePath);
        if (this.hasDateAdapterProvider(appConfigSource)) {
          return true;
        }

        const providersLiteral = findProvidersLiteral(appConfig.node);
        const filePath = this.fileSystem.resolve(appConfig.filePath);

        this.insertProviderImport(appConfigSource, filePath);

        if (providersLiteral) {
          this.addProviderToArray(providersLiteral, filePath);
        } else {
          this.addProvidersProperty(appConfig.node, filePath);
        }

        return true;
      }

      const mainSource = this.getSourceFile(mainFile);
      if (this.hasDateAdapterProvider(mainSource)) {
        return true;
      }

      const filePath = this.fileSystem.resolve(mainFile);
      this.insertProviderImport(mainSource, filePath);
      this.addProviderToBootstrapCall(bootstrapCall, filePath);

      return true;
    } catch {
      return false;
    }
  }

  private addProviderToBootstrapCall(bootstrapCall: ts.CallExpression, filePath: WorkspacePath): void {
    const providerConfig = `{\n  providers: [provideNzDateFnsAdapter()]\n}`;

    if (bootstrapCall.arguments.length === 1) {
      this.fileSystem.edit(filePath).insertRight(bootstrapCall.arguments[0].getEnd(), `, ${providerConfig}`);
      return;
    }

    const secondArgument = bootstrapCall.arguments[1];
    if (isMergeAppConfigCall(secondArgument)) {
      const separator = secondArgument.arguments.length === 0 ? '' : ', ';
      this.fileSystem.edit(filePath).insertRight(secondArgument.getEnd() - 1, `${separator}${providerConfig}`);
      return;
    }

    this.failures.push({
      filePath,
      message: 'Could not statically analyze bootstrapApplication config to add provideNzDateFnsAdapter().'
    });
  }

  private addProviderToNgModuleApp(mainFile: string): void {
    let appModulePath: string;

    try {
      appModulePath = getAppModulePath(this.context.tree, mainFile);
    } catch {
      this.createFailureAtMainFile(
        mainFile,
        'Could not find root providers to add provideNzDateFnsAdapter(). Please add it manually.'
      );
      return;
    }

    const sourceFile = this.getSourceFile(appModulePath);
    if (this.hasDateAdapterProvider(sourceFile)) {
      return;
    }

    const ngModuleMetadata = this.findNgModuleMetadata(sourceFile);
    if (!ngModuleMetadata) {
      this.createFailureAtMainFile(
        appModulePath,
        'Could not find NgModule metadata to add provideNzDateFnsAdapter(). Please add it manually.'
      );
      return;
    }

    const filePath = this.fileSystem.resolve(appModulePath);
    const providersLiteral = this.findProvidersProperty(ngModuleMetadata);

    this.insertProviderImport(sourceFile, filePath);

    if (providersLiteral) {
      this.addProviderToArray(providersLiteral, filePath);
    } else {
      this.addProvidersProperty(ngModuleMetadata, filePath);
    }
  }

  private hasDateAdapterProvider(sourceFile: ts.SourceFile): boolean {
    let hasProvider = false;

    const visit = (node: ts.Node): void => {
      if (hasProvider) {
        return;
      }

      if (ts.isCallExpression(node)) {
        const expression = node.expression;
        if (ts.isIdentifier(expression) && this.dateAdapterProviderPattern.test(expression.text)) {
          hasProvider = true;
          return;
        }
      }

      if (ts.isPropertyAssignment(node) && ts.isIdentifier(node.name) && node.name.text === 'provide') {
        const initializer = node.initializer;
        if (ts.isIdentifier(initializer) && initializer.text === 'NzDateAdapter') {
          hasProvider = true;
          return;
        }
      }

      ts.forEachChild(node, visit);
    };

    visit(sourceFile);
    return hasProvider;
  }

  private findNgModuleMetadata(sourceFile: ts.SourceFile): ts.ObjectLiteralExpression | null {
    let metadata: ts.ObjectLiteralExpression | null = null;

    const visit = (node: ts.Node): void => {
      if (metadata) {
        return;
      }

      if (ts.isDecorator(node) && ts.isCallExpression(node.expression)) {
        const expression = node.expression.expression;
        const args = node.expression.arguments;
        if (
          ts.isIdentifier(expression) &&
          expression.text === 'NgModule' &&
          args.length > 0 &&
          ts.isObjectLiteralExpression(args[0])
        ) {
          metadata = args[0];
          return;
        }
      }

      ts.forEachChild(node, visit);
    };

    visit(sourceFile);
    return metadata;
  }

  private findProvidersProperty(metadata: ts.ObjectLiteralExpression): ts.ArrayLiteralExpression | null {
    for (const property of metadata.properties) {
      if (
        ts.isPropertyAssignment(property) &&
        ts.isIdentifier(property.name) &&
        property.name.text === 'providers' &&
        ts.isArrayLiteralExpression(property.initializer)
      ) {
        return property.initializer;
      }
    }

    return null;
  }

  private addProvidersProperty(metadata: ts.ObjectLiteralExpression, filePath: WorkspacePath): void {
    const providerProperty = 'providers: [provideNzDateFnsAdapter()]';
    const properties = metadata.properties;

    if (properties.length === 0) {
      this.fileSystem.edit(filePath).insertRight(metadata.getStart() + 1, providerProperty);
      return;
    }

    const lastProperty = properties[properties.length - 1];
    this.fileSystem.edit(filePath).insertRight(lastProperty.getEnd(), `, ${providerProperty}`);
  }

  /** Add provider to array */
  private addProviderToArray(arrayNode: ts.ArrayLiteralExpression, filePath: WorkspacePath): void {
    const elements = arrayNode.elements;

    for (const element of elements) {
      if (ts.isCallExpression(element)) {
        const expr = element.expression;
        if (ts.isIdentifier(expr) && expr.getText() === 'provideNzDateFnsAdapter') {
          return;
        }
      }
    }

    const providerCall = 'provideNzDateFnsAdapter()';

    if (elements.length === 0) {
      this.fileSystem.edit(filePath).insertRight(arrayNode.getStart() + 1, providerCall);
    } else {
      const lastElement = elements[elements.length - 1];
      this.fileSystem.edit(filePath).insertRight(lastElement.getEnd(), `, ${providerCall}`);
    }
  }

  private insertProviderImport(sourceFile: ts.SourceFile, filePath: WorkspacePath): void {
    if (this.hasNamedImport(sourceFile, 'provideNzDateFnsAdapter', 'ng-zorro-antd/core/time')) {
      return;
    }

    let lastImport: ts.ImportDeclaration | null = null;
    ts.forEachChild(sourceFile, node => {
      if (ts.isImportDeclaration(node)) {
        lastImport = node;
      }
    });

    const importToAdd = `\nimport { provideNzDateFnsAdapter } from 'ng-zorro-antd/core/time';\n`;

    if (lastImport) {
      this.fileSystem.edit(filePath).insertRight(lastImport.getEnd(), importToAdd);
    } else {
      this.fileSystem.edit(filePath).insertRight(0, `${importToAdd}\n`);
    }
  }

  private hasNamedImport(sourceFile: ts.SourceFile, symbolName: string, moduleName: string): boolean {
    for (const statement of sourceFile.statements) {
      if (
        !ts.isImportDeclaration(statement) ||
        !ts.isStringLiteralLike(statement.moduleSpecifier) ||
        statement.moduleSpecifier.text !== moduleName ||
        !statement.importClause?.namedBindings ||
        !ts.isNamedImports(statement.importClause.namedBindings)
      ) {
        continue;
      }

      if (statement.importClause.namedBindings.elements.some(element => element.name.text === symbolName)) {
        return true;
      }
    }

    return false;
  }

  private getSourceFile(filePath: string): ts.SourceFile {
    const sourceText = this.context.tree.readText(filePath);
    return ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true);
  }

  private createFailureAtMainFile(filePath: string, message: string): void {
    this.failures.push({
      filePath: this.fileSystem.resolve(filePath),
      message
    });
  }
}
