/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';

import { NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/core/tree';

@Component({
  selector: 'nz-tree-node-switcher',
  template: `
    <ng-container *ngIf="isShowSwitchIcon">
      <ng-container *ngIf="!isLoading; else loadingTemplate">
        <ng-container *nzStringTemplateOutlet="nzExpandedIcon; context: { $implicit: context, origin: context.origin }">
          <span
            nz-icon
            nzType="caret-down"
            [class.ant-select-tree-switcher-icon]="nzSelectMode"
            [class.ant-tree-switcher-icon]="!nzSelectMode"
          ></span>
        </ng-container>
      </ng-container>
    </ng-container>
    <ng-container *ngIf="nzShowLine">
      <ng-container *ngIf="!isLoading; else loadingTemplate">
        <ng-container *nzStringTemplateOutlet="nzExpandedIcon; context: { $implicit: context, origin: context.origin }">
          <span
            *ngIf="isShowLineIcon"
            nz-icon
            [nzType]="isSwitcherOpen ? 'minus-square' : 'plus-square'"
            class="ant-tree-switcher-line-icon"
          ></span>
          <span *ngIf="!isShowLineIcon" nz-icon nzType="file" class="ant-tree-switcher-line-icon"></span>
        </ng-container>
      </ng-container>
    </ng-container>
    <ng-template #loadingTemplate>
      <span nz-icon nzType="loading" [nzSpin]="true" class="ant-tree-switcher-loading-icon"></span>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    '[class.ant-select-tree-switcher]': 'nzSelectMode',
    '[class.ant-select-tree-switcher-noop]': 'nzSelectMode && isLeaf',
    '[class.ant-select-tree-switcher_open]': 'nzSelectMode && isSwitcherOpen',
    '[class.ant-select-tree-switcher_close]': 'nzSelectMode && isSwitcherClose',
    '[class.ant-tree-switcher]': '!nzSelectMode',
    '[class.ant-tree-switcher-noop]': '!nzSelectMode && isLeaf',
    '[class.ant-tree-switcher_open]': '!nzSelectMode && isSwitcherOpen',
    '[class.ant-tree-switcher_close]': '!nzSelectMode && isSwitcherClose'
  }
})
export class NzTreeNodeSwitcherComponent {
  @Input() nzShowExpand?: boolean;
  @Input() nzShowLine?: boolean;
  @Input() nzExpandedIcon?: TemplateRef<{ $implicit: NzTreeNode; origin: NzTreeNodeOptions }>;
  @Input() nzSelectMode = false;
  @Input() context!: NzTreeNode;
  @Input() isLeaf?: boolean;
  @Input() isLoading?: boolean;
  @Input() isExpanded?: boolean;

  get isShowLineIcon(): boolean {
    return !this.isLeaf && !!this.nzShowLine;
  }

  get isShowSwitchIcon(): boolean {
    return !this.isLeaf && !this.nzShowLine;
  }

  get isSwitcherOpen(): boolean {
    return !!this.isExpanded && !this.isLeaf;
  }

  get isSwitcherClose(): boolean {
    return !this.isExpanded && !this.isLeaf;
  }
}
