/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Migration, WorkspacePath } from '@angular/cdk/schematics';

import * as ts from 'typescript';

/**
 * Migration that adds `provideNzDateFnsAdapter()` to root providers when an
 * application already imports date components from its root config.
 *
 * Components still have a date-fns fallback for backwards compatibility; this
 * migration makes the selected adapter explicit in projects where it can do so
 * safely.
 */
export class DateAdapterMigration extends Migration<null> {
  /** Pattern to match date-picker, calendar, time-picker imports */
  private readonly dateComponentPattern = /ng-zorro-antd\/(date-picker|calendar|time-picker)/;

  /** Pattern to match NzDateAdapter imports */
  private readonly dateAdapterImportPattern =
    /NzDateAdapter|provideNzDateAdapter|provideNzDateFnsAdapter|provideNzNativeDateAdapter/;

  /** Whether the file uses date components */
  enabled: boolean = true;

  visitNode(node: ts.Node): void {
    // Check for imports of date-related components
    if (ts.isImportDeclaration(node)) {
      this._checkImportDeclaration(node);
    }
  }

  private _checkImportDeclaration(node: ts.ImportDeclaration): void {
    const moduleSpecifier = node.moduleSpecifier.getText();

    // Check if this file imports from date-picker, calendar, or time-picker
    if (this.dateComponentPattern.test(moduleSpecifier)) {
      const sourceFile = node.getSourceFile();
      const fileName = sourceFile.fileName;

      // Check if the file already imports NzDateAdapter or provider functions
      if (this._hasDateAdapterImport(sourceFile)) {
        return;
      }

      // Skip if this is not an app config or main file
      if (!this._isAppConfigFile(fileName)) {
        return;
      }

      // Add the provider import and call
      this._addDateAdapterProvider(sourceFile, node);
    }
  }

  /** Check if source file already has date adapter imports */
  private _hasDateAdapterImport(sourceFile: ts.SourceFile): boolean {
    let hasImport = false;

    ts.forEachChild(sourceFile, node => {
      if (ts.isImportDeclaration(node)) {
        const importText = node.getText();
        if (this.dateAdapterImportPattern.test(importText)) {
          hasImport = true;
        }
      }
    });

    return hasImport;
  }

  /** Check if the file is likely an app config or main bootstrap file */
  private _isAppConfigFile(fileName: string): boolean {
    const appConfigPatterns = [/app\.config\.ts$/, /app\.module\.ts$/, /main\.ts$/, /bootstrap\.ts$/, /app\.ts$/];

    return appConfigPatterns.some(pattern => pattern.test(fileName));
  }

  /** Add provideNzDateFnsAdapter import and provider call */
  private _addDateAdapterProvider(sourceFile: ts.SourceFile, importNode: ts.ImportDeclaration): void {
    const filePath = this.fileSystem.resolve(sourceFile.fileName);

    // Find the last import declaration
    let lastImport: ts.ImportDeclaration | null = null;
    ts.forEachChild(sourceFile, node => {
      if (ts.isImportDeclaration(node)) {
        lastImport = node;
      }
    });

    if (lastImport) {
      // Add import for provideNzDateFnsAdapter after the last import
      const importToAdd = `\nimport { provideNzDateFnsAdapter } from 'ng-zorro-antd/core/time';\n`;
      this.fileSystem.edit(filePath).insertRight(lastImport.getEnd(), importToAdd);
    }

    // Find providers array and add the provider
    this._findAndAddProvider(sourceFile, filePath);
  }

  /** Find providers array/function and add provideNzDateFnsAdapter */
  private _findAndAddProvider(sourceFile: ts.SourceFile, filePath: WorkspacePath): void {
    // Look for providers: [...] or makeEnvironmentProviders([...])
    ts.forEachChild(sourceFile, node => {
      this._visitNodeForProviders(node, filePath);
    });
  }

  private _visitNodeForProviders(node: ts.Node, filePath: WorkspacePath): void {
    // Check for providers array literal
    if (ts.isArrayLiteralExpression(node)) {
      const parent = node.parent;
      if (ts.isPropertyAssignment(parent) && parent.name.getText() === 'providers') {
        this._addProviderToArray(node, filePath);
      }
    }

    // Check for makeEnvironmentProviders call
    if (ts.isCallExpression(node)) {
      const expression = node.expression;
      if (ts.isIdentifier(expression) && expression.getText() === 'makeEnvironmentProviders') {
        const args = node.arguments;
        if (args.length > 0 && ts.isArrayLiteralExpression(args[0])) {
          this._addProviderToArray(args[0], filePath);
        }
      }
    }

    // Check for bootstrapApplication call
    if (ts.isCallExpression(node)) {
      const expression = node.expression;
      if (ts.isIdentifier(expression) && expression.getText() === 'bootstrapApplication') {
        // Second argument is options object with providers
        const args = node.arguments;
        if (args.length > 1 && ts.isObjectLiteralExpression(args[1])) {
          args[1].properties.forEach(prop => {
            if (ts.isPropertyAssignment(prop) && prop.name.getText() === 'providers') {
              if (ts.isArrayLiteralExpression(prop.initializer)) {
                this._addProviderToArray(prop.initializer, filePath);
              }
            }
          });
        }
      }
    }

    // Recursively visit children
    ts.forEachChild(node, child => {
      this._visitNodeForProviders(child, filePath);
    });
  }

  /** Add provider to array */
  private _addProviderToArray(arrayNode: ts.ArrayLiteralExpression, filePath: WorkspacePath): void {
    const elements = arrayNode.elements;

    // Check if provideNzDateFnsAdapter is already in the array
    for (const element of elements) {
      if (ts.isCallExpression(element)) {
        const expr = element.expression;
        if (ts.isIdentifier(expr) && expr.getText() === 'provideNzDateFnsAdapter') {
          return; // Already present
        }
      }
    }

    // Add the provider
    const providerCall = 'provideNzDateFnsAdapter()';

    if (elements.length === 0) {
      // Empty array: insert inside brackets
      this.fileSystem.edit(filePath).insertRight(arrayNode.getStart() + 1, providerCall);
    } else {
      // Non-empty array: insert after last element with comma
      const lastElement = elements[elements.length - 1];
      this.fileSystem.edit(filePath).insertRight(lastElement.getEnd(), `, ${providerCall}`);
    }
  }
}
