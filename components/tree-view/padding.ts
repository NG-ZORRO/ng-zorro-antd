/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CdkTreeNodePadding } from '@angular/cdk/tree';
import { Directive, forwardRef, Input, numberAttribute } from '@angular/core';

@Directive({
  selector: '[nzTreeNodePadding]',
  providers: [
    {
      provide: CdkTreeNodePadding,
      useExisting: forwardRef(() => NzTreeNodePaddingDirective)
    }
  ]
})
export class NzTreeNodePaddingDirective<T> extends CdkTreeNodePadding<T> {
  override _indent = 24;

  @Input({ alias: 'nzTreeNodePadding', transform: numberAttribute })
  override get level(): number {
    return this._level;
  }
  override set level(value: number) {
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
