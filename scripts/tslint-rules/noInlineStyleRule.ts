import { ComponentMetadata, DirectiveMetadata, NgWalker } from 'codelyzer';
import { getDecoratorPropertyInitializer } from 'codelyzer/util/utils';
import * as minimatch from 'minimatch';
import * as path from 'path';
import * as Lint from 'tslint';
import { RuleFailure } from 'tslint/lib/language/rule/rule';
import * as ts from 'typescript';

export class Rule extends Lint.Rules.AbstractRule {
  apply(sourceFile: ts.SourceFile): RuleFailure[] {
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
    super.visitNgComponent(metadata);
    return this.checkStylesOption(metadata);
  }

  private checkStylesOption(metadata: DirectiveMetadata |ComponentMetadata): void {
    if (!this._enabled || !metadata.selector) {
      return;
    }
    const selectorExpression = getDecoratorPropertyInitializer(metadata.decorator, 'styles');
    if (!selectorExpression) {
      return;
    }

    super.visitNgComponent(metadata);
    return this.addFailureAtNode(selectorExpression, 'Disallow definition inline-style in component, please move to patch.less.');
  }
}
