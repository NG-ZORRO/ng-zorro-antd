/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef
} from '@angular/core';

import { NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/core/tree';

@Component({
  selector: 'nz-tree-node-title',
  template: `
    <ng-template
      [ngTemplateOutlet]="treeTemplate"
      [ngTemplateOutletContext]="{ $implicit: context, origin: context.origin }"
    ></ng-template>
    <ng-container *ngIf="!treeTemplate">
      <span
        *ngIf="icon && showIcon"
        [class.ant-tree-icon__open]="isSwitcherOpen"
        [class.ant-tree-icon__close]="isSwitcherClose"
        [class.ant-tree-icon_loading]="isLoading"
        [class.ant-select-tree-iconEle]="selectMode"
        [class.ant-tree-iconEle]="!selectMode"
      >
        <span
          [class.ant-select-tree-iconEle]="selectMode"
          [class.ant-select-tree-icon__customize]="selectMode"
          [class.ant-tree-iconEle]="!selectMode"
          [class.ant-tree-icon__customize]="!selectMode"
        >
          <span nz-icon *ngIf="icon" [nzType]="icon"></span>
        </span>
      </span>
      <span class="ant-tree-title" [innerHTML]="title | nzHighlight: matchedValue:'i':'font-highlight'"></span>
    </ng-container>
    <nz-tree-drop-indicator
      *ngIf="showIndicator"
      [dropPosition]="dragPosition"
      [level]="context.level"
    ></nz-tree-drop-indicator>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[attr.title]': 'title',
    '[attr.draggable]': 'canDraggable',
    '[attr.aria-grabbed]': 'canDraggable',
    '[class.draggable]': 'canDraggable',
    '[class.ant-select-tree-node-content-wrapper]': `selectMode`,
    '[class.ant-select-tree-node-content-wrapper-open]': `selectMode && isSwitcherOpen`,
    '[class.ant-select-tree-node-content-wrapper-close]': `selectMode && isSwitcherClose`,
    '[class.ant-select-tree-node-selected]': `selectMode && isSelected`,
    '[class.ant-tree-node-content-wrapper]': `!selectMode`,
    '[class.ant-tree-node-content-wrapper-open]': `!selectMode && isSwitcherOpen`,
    '[class.ant-tree-node-content-wrapper-close]': `!selectMode && isSwitcherClose`,
    '[class.ant-tree-node-selected]': `!selectMode && isSelected`
  }
})
export class NzTreeNodeTitleComponent implements OnChanges {
  @Input() searchValue!: string;
  @Input() treeTemplate: TemplateRef<{ $implicit: NzTreeNode; origin: NzTreeNodeOptions }> | null = null;
  @Input() draggable!: boolean;
  @Input() showIcon!: boolean;
  @Input() selectMode = false;
  @Input() context!: NzTreeNode;
  @Input() icon!: string;
  @Input() title!: string;
  @Input() isLoading!: boolean;
  @Input() isSelected!: boolean;
  @Input() isDisabled!: boolean;
  @Input() isMatched!: boolean;
  @Input() isExpanded!: boolean;
  @Input() isLeaf!: boolean;
  // Drag indicator
  @Input() showIndicator = true;
  @Input() dragPosition?: number;

  get canDraggable(): boolean | null {
    return this.draggable && !this.isDisabled ? true : null;
  }

  get matchedValue(): string {
    return this.isMatched ? this.searchValue : '';
  }

  get isSwitcherOpen(): boolean {
    return this.isExpanded && !this.isLeaf;
  }

  get isSwitcherClose(): boolean {
    return !this.isExpanded && !this.isLeaf;
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { showIndicator, dragPosition } = changes;
    if (showIndicator || dragPosition) {
      this.cdr.markForCheck();
    }
  }
}
