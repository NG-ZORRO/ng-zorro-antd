/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { NzBreakpointKey } from 'ng-zorro-antd/core/services';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: '[nz-sider-trigger]',
  exportAs: 'nzSiderTrigger',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isZeroTrigger) {
      <ng-template [ngTemplateOutlet]="nzZeroTrigger || defaultZeroTrigger" />
    }

    @if (isNormalTrigger) {
      <ng-template [ngTemplateOutlet]="nzTrigger || defaultTrigger" />
    }
    <ng-template #defaultTrigger>
      @if (nzReverseArrow) {
        <nz-icon [nzType]="nzCollapsed ? 'left' : 'right'" />
      } @else {
        <nz-icon [nzType]="nzCollapsed ? 'right' : 'left'" />
      }
    </ng-template>
    <ng-template #defaultZeroTrigger>
      <nz-icon nzType="bars" />
    </ng-template>
  `,
  host: {
    '[class.ant-layout-sider-trigger]': 'isNormalTrigger',
    '[style.width]': 'isNormalTrigger ? siderWidth : null',
    '[class.ant-layout-sider-zero-width-trigger]': 'isZeroTrigger',
    '[class.ant-layout-sider-zero-width-trigger-right]': 'isZeroTrigger && nzReverseArrow',
    '[class.ant-layout-sider-zero-width-trigger-left]': 'isZeroTrigger && !nzReverseArrow'
  },
  imports: [NgTemplateOutlet, NzIconModule]
})
export class NzSiderTriggerComponent implements OnChanges, OnInit {
  @Input() nzCollapsed = false;
  @Input() nzReverseArrow = false;
  @Input() nzZeroTrigger: TemplateRef<void> | null = null;
  @Input() nzTrigger: TemplateRef<void> | undefined | null = undefined;
  @Input() matchBreakPoint = false;
  @Input() nzCollapsedWidth: number | null = null;
  @Input() siderWidth: string | null = null;
  @Input() nzBreakpoint: NzBreakpointKey | null = null;
  isZeroTrigger = false;
  isNormalTrigger = false;
  updateTriggerType(): void {
    this.isZeroTrigger =
      this.nzCollapsedWidth === 0 && ((this.nzBreakpoint && this.matchBreakPoint) || !this.nzBreakpoint);
    this.isNormalTrigger = this.nzCollapsedWidth !== 0;
  }
  ngOnInit(): void {
    this.updateTriggerType();
  }
  ngOnChanges(): void {
    this.updateTriggerType();
  }
}
