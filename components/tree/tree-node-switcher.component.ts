/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, Input, TemplateRef, booleanAttribute } from '@angular/core';

import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/core/tree';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'nz-tree-node-switcher',
  template: `
    @if (isShowSwitchIcon) {
      @if (!isLoading) {
        <ng-container *nzStringTemplateOutlet="nzExpandedIcon; context: { $implicit: context, origin: context.origin }">
          <nz-icon
            nzType="caret-down"
            [class.ant-select-tree-switcher-icon]="nzSelectMode"
            [class.ant-tree-switcher-icon]="!nzSelectMode"
          />
        </ng-container>
      } @else {
        <nz-icon nzType="loading" [nzSpin]="true" class="ant-tree-switcher-loading-icon" />
      }
    }
    @if (nzShowLine) {
      @if (!isLoading) {
        <ng-container *nzStringTemplateOutlet="nzExpandedIcon; context: { $implicit: context, origin: context.origin }">
          @if (isShowLineIcon) {
            <nz-icon [nzType]="isSwitcherOpen ? 'minus-square' : 'plus-square'" class="ant-tree-switcher-line-icon" />
          } @else {
            <nz-icon nzType="file" class="ant-tree-switcher-line-icon" />
          }
        </ng-container>
      } @else {
        <nz-icon nzType="loading" [nzSpin]="true" class="ant-tree-switcher-loading-icon" />
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ant-select-tree-switcher]': 'nzSelectMode',
    '[class.ant-select-tree-switcher-noop]': 'nzSelectMode && isLeaf',
    '[class.ant-select-tree-switcher_open]': 'nzSelectMode && isSwitcherOpen',
    '[class.ant-select-tree-switcher_close]': 'nzSelectMode && isSwitcherClose',
    '[class.ant-tree-switcher]': '!nzSelectMode',
    '[class.ant-tree-switcher-noop]': '!nzSelectMode && isLeaf',
    '[class.ant-tree-switcher_open]': '!nzSelectMode && isSwitcherOpen',
    '[class.ant-tree-switcher_close]': '!nzSelectMode && isSwitcherClose'
  },
  imports: [NzIconModule, NzOutletModule]
})
export class NzTreeNodeSwitcherComponent {
  @Input({ transform: booleanAttribute }) nzShowExpand?: boolean;
  @Input({ transform: booleanAttribute }) nzShowLine?: boolean;
  @Input() nzExpandedIcon?: TemplateRef<{ $implicit: NzTreeNode; origin: NzTreeNodeOptions }>;
  @Input() nzSelectMode = false;
  @Input() context!: NzTreeNode;
  @Input({ transform: booleanAttribute }) isLeaf?: boolean;
  @Input({ transform: booleanAttribute }) isLoading?: boolean;
  @Input({ transform: booleanAttribute }) isExpanded?: boolean;

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
