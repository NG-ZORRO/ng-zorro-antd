/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Host,
  OnDestroy,
  Optional,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { NzNoAnimationDirective, zoomBigMotion } from 'ng-zorro-antd/core';
import { NzToolTipComponent, NzTooltipTrigger } from 'ng-zorro-antd/tooltip';
import { Subject } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-popconfirm',
  exportAs: 'nzPopconfirmComponent',
  preserveWhitespaces: false,
  animations: [zoomBigMotion],
  template: `
    <ng-content></ng-content>
    <ng-template
      #overlay="cdkConnectedOverlay"
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayHasBackdrop]="_hasBackdrop"
      (backdropClick)="hide()"
      (detach)="hide()"
      (positionChange)="onPositionChange($event)"
      [cdkConnectedOverlayPositions]="_positions"
      [cdkConnectedOverlayOpen]="_visible"
    >
      <div
        class="ant-popover"
        [ngClass]="_classMap"
        [ngStyle]="nzOverlayStyle"
        [@.disabled]="noAnimation?.nzNoAnimation"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        [@zoomBigMotion]="'active'"
      >
        <div class="ant-popover-content">
          <div class="ant-popover-arrow"></div>
          <div class="ant-popover-inner">
            <div>
              <div class="ant-popover-inner-content">
                <div class="ant-popover-message">
                  <ng-container *nzStringTemplateOutlet="title">
                    <ng-container *nzStringTemplateOutlet="nzIcon">
                      <i nz-icon [nzType]="nzIcon || 'exclamation-circle'" nzTheme="fill"></i>
                    </ng-container>
                    <div class="ant-popover-message-title">{{ title }}</div>
                  </ng-container>
                </div>
                <div class="ant-popover-buttons">
                  <button nz-button [nzSize]="'small'" (click)="onCancel()">
                    <ng-container *ngIf="nzCancelText">{{ nzCancelText }}</ng-container>
                    <ng-container *ngIf="!nzCancelText">{{ 'Modal.cancelText' | nzI18n }}</ng-container>
                  </button>
                  <button nz-button [nzSize]="'small'" [nzType]="nzOkType" (click)="onConfirm()">
                    <ng-container *ngIf="nzOkText">{{ nzOkText }}</ng-container>
                    <ng-container *ngIf="!nzOkText">{{ 'Modal.okText' | nzI18n }}</ng-container>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ng-template>
  `,
  styles: [
    `
      .ant-popover {
        position: relative;
      }
    `
  ]
})
export class NzPopconfirmComponent extends NzToolTipComponent implements OnDestroy {
  nzCancelText: string;
  nzCondition = false;
  nzIcon: string | TemplateRef<void>;
  nzOkText: string;
  nzOkType: string = 'primary';

  readonly nzOnCancel = new Subject<void>();
  readonly nzOnConfirm = new Subject<void>();

  protected _trigger: NzTooltipTrigger = 'click';

  _prefix = 'ant-popover-placement';
  _hasBackdrop = true;

  constructor(cdr: ChangeDetectorRef, @Host() @Optional() public noAnimation?: NzNoAnimationDirective) {
    super(cdr, noAnimation);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this.nzOnCancel.complete();
    this.nzOnConfirm.complete();
  }

  show(): void {
    if (!this.nzCondition) {
      super.show();
    } else {
      this.onConfirm();
    }
  }

  onCancel(): void {
    this.nzOnCancel.next();
    super.hide();
  }

  onConfirm(): void {
    this.nzOnConfirm.next();
    super.hide();
  }
}
