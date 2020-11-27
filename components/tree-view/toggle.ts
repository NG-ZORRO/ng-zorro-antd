/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkTreeNodeToggle } from '@angular/cdk/tree';
import { Directive, Input } from '@angular/core';
import { BooleanInput } from 'ng-zorro-antd/core/types';

@Directive({
  selector: 'nz-tree-node-toggle[nzTreeNodeNoopToggle], [nzTreeNodeNoopToggle]',
  host: {
    class: 'ant-tree-switcher ant-tree-switcher-noop'
  }
})
export class NzTreeNodeNoopToggleDirective {}

@Directive({
  selector: 'nz-tree-node-toggle:not([nzTreeNodeNoopToggle]), [nzTreeNodeToggle]',
  providers: [{ provide: CdkTreeNodeToggle, useExisting: NzTreeNodeToggleDirective }],
  host: {
    class: 'ant-tree-switcher',
    '[class.ant-tree-switcher_open]': 'isExpanded',
    '[class.ant-tree-switcher_close]': '!isExpanded'
  }
})
export class NzTreeNodeToggleDirective<T> extends CdkTreeNodeToggle<T> {
  static ngAcceptInputType_recursive: BooleanInput;
  @Input('nzTreeNodeToggleRecursive')
  get recursive(): boolean {
    return this._recursive;
  }
  set recursive(value: boolean) {
    this._recursive = coerceBooleanProperty(value);
  }

  get isExpanded(): boolean {
    return this._treeNode.isExpanded;
  }
}

@Directive({
  selector: '[nz-icon][nzTreeNodeToggleRotateIcon]',
  host: {
    class: 'ant-tree-switcher-icon'
  }
})
export class NzTreeNodeToggleRotateIconDirective {}

@Directive({
  selector: '[nz-icon][nzTreeNodeToggleActiveIcon]',
  host: {
    class: 'ant-tree-switcher-loading-icon'
  }
})
export class NzTreeNodeToggleActiveIconDirective {}
