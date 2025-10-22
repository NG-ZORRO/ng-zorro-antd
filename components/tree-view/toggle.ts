/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CdkTreeNodeToggle } from '@angular/cdk/tree';
import { booleanAttribute, Directive, forwardRef, Input } from '@angular/core';

@Directive({
  selector: 'nz-tree-node-toggle[nzTreeNodeNoopToggle], [nzTreeNodeNoopToggle]',
  host: {
    class: 'ant-tree-switcher ant-tree-switcher-noop'
  }
})
export class NzTreeNodeNoopToggleDirective {}

@Directive({
  selector: 'nz-tree-node-toggle:not([nzTreeNodeNoopToggle]), [nzTreeNodeToggle]',
  providers: [{ provide: CdkTreeNodeToggle, useExisting: forwardRef(() => NzTreeNodeToggleDirective) }],
  host: {
    class: 'ant-tree-switcher',
    '[class.ant-tree-switcher_open]': 'isExpanded',
    '[class.ant-tree-switcher_close]': '!isExpanded'
  }
})
export class NzTreeNodeToggleDirective<T> extends CdkTreeNodeToggle<T> {
  @Input({ alias: 'nzTreeNodeToggleRecursive', transform: booleanAttribute }) override recursive = false;

  get isExpanded(): boolean {
    return this._treeNode.isExpanded;
  }
}

@Directive({
  selector: '[nzTreeNodeToggleRotateIcon]',
  host: {
    class: 'ant-tree-switcher-icon'
  }
})
export class NzTreeNodeToggleRotateIconDirective {}

@Directive({
  selector: '[nzTreeNodeToggleActiveIcon]',
  host: {
    class: 'ant-tree-switcher-loading-icon'
  }
})
export class NzTreeNodeToggleActiveIconDirective {}
