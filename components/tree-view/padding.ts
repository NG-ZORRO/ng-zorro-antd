/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CdkTreeNodePadding } from '@angular/cdk/tree';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[nzTreeNodePadding]',
  providers: [{ provide: CdkTreeNodePadding, useExisting: NzTreeNodePaddingDirective }]
})
export class NzTreeNodePaddingDirective<T> extends CdkTreeNodePadding<T> {
  _indent = 24;

  @Input('nzTreeNodePadding')
  get level(): number {
    return this._level;
  }
  set level(value: number) {
    this._setLevelInput(value);
  }

  @Input('nzTreeNodePaddingIndent')
  get indent(): number | string {
    return this._indent;
  }
  set indent(indent: number | string) {
    this._setIndentInput(indent);
  }
}
