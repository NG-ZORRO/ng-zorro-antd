import { ComponentMetadata, NgWalker } from 'codelyzer';
import {
  getDecoratorArgument,
  getDecoratorPropertyInitializer
} from 'codelyzer/util/utils';
import * as minimatch from 'minimatch';
import * as path from 'path';
import * as Lint from 'tslint';
import * as ts from 'typescript';

export class Rule extends Lint.Rules.AbstractRule {
  apply(sourceFile: ts.SourceFile) {
    return this.applyWithWalker(new Walker(sourceFile, this.getOptions()));
  }
}

class Walker extends NgWalker {

  private _enabled: boolean;

  constructor(sourceFile: ts.SourceFile, options: Lint.IOptions) {
    super(sourceFile, options);
    const fileGlobs = options.ruleArguments;
    const relativeFilePath = path.relative(process.cwd(), sourceFile.fileName);
    this._enabled = fileGlobs.some(p => minimatch(relativeFilePath, p));
  }

  protected visitNgComponent(metadata: ComponentMetadata): void {
    if (!this._enabled || !metadata.selector) {
      return;
    }
    const selectorExpression = getDecoratorPropertyInitializer(metadata.decorator, 'selector');
    if (!selectorExpression) {
      return;
    }
    const args = getDecoratorArgument(metadata.decorator);
    const properties = ts.createNodeArray<ts.PropertyAssignment>(args.properties as ReadonlyArray<ts.PropertyAssignment>);
    const selectorIndex = properties.findIndex(p => p.initializer === selectorExpression);
    const pos = selectorExpression.parent.pos;
    let end = selectorExpression.parent.end;
    const nextProp = properties[selectorIndex + 1];
    if (nextProp) {
      end = nextProp.pos;
    }
    super.visitNgComponent(metadata);
    return this.addFailureAtNode(selectorExpression,
      'Disallow definition selector in this file.',
      this.deleteFromTo(pos, end));
  }
}
