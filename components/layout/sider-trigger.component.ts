/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

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

@Component({
  selector: '[nz-sider-trigger]',
  exportAs: 'nzSiderTrigger',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngIf="isZeroTrigger">
      <ng-template [ngTemplateOutlet]="nzZeroTrigger || defaultZeroTrigger"></ng-template>
    </ng-container>
    <ng-container *ngIf="isNormalTrigger">
      <ng-template [ngTemplateOutlet]="nzTrigger || defaultTrigger"></ng-template>
    </ng-container>
    <ng-template #defaultTrigger>
      <span nz-icon [nzType]="nzCollapsed ? 'right' : 'left'" *ngIf="!nzReverseArrow"></span>
      <span nz-icon [nzType]="nzCollapsed ? 'left' : 'right'" *ngIf="nzReverseArrow"></span>
    </ng-template>
    <ng-template #defaultZeroTrigger>
      <span nz-icon nzType="bars"></span>
    </ng-template>
  `,
  host: {
    '[class.ant-layout-sider-trigger]': 'isNormalTrigger',
    '[style.width]': 'isNormalTrigger ? siderWidth : null',
    '[class.ant-layout-sider-zero-width-trigger]': 'isZeroTrigger',
    '[class.ant-layout-sider-zero-width-trigger-right]': 'isZeroTrigger && nzReverseArrow',
    '[class.ant-layout-sider-zero-width-trigger-left]': 'isZeroTrigger && !nzReverseArrow'
  }
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
