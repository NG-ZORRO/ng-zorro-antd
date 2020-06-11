import * as minimatch from 'minimatch';
import * as path from 'path';
import * as Lint from 'tslint';
import * as ts from 'typescript';

/** License banner that is placed at the top of every public TypeScript file. */
const licenseBanner = `/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */`;

/** Failure message that will be shown if a license banner is missing. */
const ERROR_MESSAGE =
  'Missing license header in this TypeScript file. Every TypeScript file of the library needs to have the license banner at the top.';

/** TSLint fix that can be used to add the license banner easily. */
const tslintFix = Lint.Replacement.appendText(0, licenseBanner + '\n\n');

/**
 * Rule that walks through all TypeScript files of public packages and shows failures if a
 * file does not have the license banner at the top of the file.
 */
export class Rule extends Lint.Rules.AbstractRule {
  apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new RequireLicenseBannerWalker(sourceFile, this.getOptions()));
  }
}

class RequireLicenseBannerWalker extends Lint.RuleWalker {
  /** Whether the walker should check the current source file. */
  private _enabled: boolean;

  constructor(sourceFile: ts.SourceFile, options: Lint.IOptions) {
    super(sourceFile, options);

    // Globs that are used to determine which files to lint.
    const fileGlobs = options.ruleArguments;

    // Relative path for the current TypeScript source file.
    const relativeFilePath = path.relative(process.cwd(), sourceFile.fileName);

    // Whether the file should be checked at all.
    this._enabled = fileGlobs.some(p => minimatch(relativeFilePath, p));
  }

  visitSourceFile(sourceFile: ts.SourceFile): void {
    if (!this._enabled) {
      return;
    }

    const fileContent = sourceFile.getFullText();
    const licenseCommentPos = fileContent.indexOf(licenseBanner);

    if (licenseCommentPos !== 0) {
      return this.addFailureAt(0, 0, ERROR_MESSAGE, tslintFix);
    }

    super.visitSourceFile(sourceFile);
  }
}
