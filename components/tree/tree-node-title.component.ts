/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  booleanAttribute,
  inject
} from '@angular/core';

import { NzHighlightPipe } from 'ng-zorro-antd/core/highlight';
import { NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/core/tree';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzTreeDropIndicatorComponent } from './tree-drop-indicator.component';

@Component({
  selector: 'nz-tree-node-title',
  template: `
    <ng-template
      [ngTemplateOutlet]="treeTemplate"
      [ngTemplateOutletContext]="{ $implicit: context, origin: context.origin }"
    ></ng-template>
    @if (!treeTemplate) {
      @if (icon && showIcon) {
        <span
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
            <nz-icon [nzType]="icon" />
          </span>
        </span>
      }
      <span class="ant-tree-title" [innerHTML]="title | nzHighlight: matchedValue : 'i' : 'font-highlight'"></span>
    }
    @if (showIndicator) {
      <nz-tree-drop-indicator [dropPosition]="dragPosition" [level]="context.level"></nz-tree-drop-indicator>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  },
  imports: [NgTemplateOutlet, NzIconModule, NzHighlightPipe, NzTreeDropIndicatorComponent]
})
export class NzTreeNodeTitleComponent implements OnChanges {
  private cdr = inject(ChangeDetectorRef);

  @Input() searchValue!: string;
  @Input() treeTemplate: TemplateRef<{ $implicit: NzTreeNode; origin: NzTreeNodeOptions }> | null = null;
  @Input({ transform: booleanAttribute }) draggable!: boolean;
  @Input({ transform: booleanAttribute }) showIcon!: boolean;
  @Input() selectMode = false;
  @Input() context!: NzTreeNode;
  @Input() icon!: string;
  @Input() title!: string;
  @Input({ transform: booleanAttribute }) isLoading!: boolean;
  @Input({ transform: booleanAttribute }) isSelected!: boolean;
  @Input({ transform: booleanAttribute }) isDisabled!: boolean;
  @Input({ transform: booleanAttribute }) isMatched!: boolean;
  @Input({ transform: booleanAttribute }) isExpanded!: boolean;
  @Input({ transform: booleanAttribute }) isLeaf!: boolean;
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

  ngOnChanges(changes: SimpleChanges): void {
    const { showIndicator, dragPosition } = changes;
    if (showIndicator || dragPosition) {
      this.cdr.markForCheck();
    }
  }
}
