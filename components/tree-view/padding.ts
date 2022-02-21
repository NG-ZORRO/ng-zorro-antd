/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NumberInput } from '@angular/cdk/coercion';
import { CdkTreeNodePadding } from '@angular/cdk/tree';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[nzTreeNodePadding]',
  providers: [{ provide: CdkTreeNodePadding, useExisting: NzTreeNodePaddingDirective }]
})
export class NzTreeNodePaddingDirective<T> extends CdkTreeNodePadding<T> {
  override _indent = 24;

  @Input('nzTreeNodePadding')
  override get level(): number {
    return this._level;
  }
  override set level(value: NumberInput) {
    this._setLevelInput(value);
  }

  @Input('nzTreeNodePaddingIndent')
  override get indent(): number | string {
    return this._indent;
  }
  override set indent(indent: number | string) {
    this._setIndentInput(indent);
  }
}
