/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { notificationMotion } from 'ng-zorro-antd/core';
import { NzNotificationDataFilled, NzNotificationDataOptions } from './typings';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-notification',
  exportAs: 'nzNotification',
  preserveWhitespaces: false,
  animations: [notificationMotion],
  template: `
    <div
      class="ant-notification-notice ant-notification-notice-closable"
      [ngStyle]="nzMessage.options?.nzStyle"
      [ngClass]="nzMessage.options?.nzClass"
      [@notificationMotion]="state"
      (mouseenter)="onEnter()"
      (mouseleave)="onLeave()"
    >
      <div *ngIf="!nzMessage.template" class="ant-notification-notice-content">
        <div class="ant-notification-notice-content" [ngClass]="{ 'ant-notification-notice-with-icon': nzMessage.type !== 'blank' }">
          <div [class.ant-notification-notice-with-icon]="nzMessage.type !== 'blank'">
            <ng-container [ngSwitch]="nzMessage.type">
              <i
                *ngSwitchCase="'success'"
                nz-icon
                nzType="check-circle"
                class="ant-notification-notice-icon ant-notification-notice-icon-success"
              ></i>
              <i
                *ngSwitchCase="'info'"
                nz-icon
                nzType="info-circle"
                class="ant-notification-notice-icon ant-notification-notice-icon-info"
              ></i>
              <i
                *ngSwitchCase="'warning'"
                nz-icon
                nzType="exclamation-circle"
                class="ant-notification-notice-icon ant-notification-notice-icon-warning"
              ></i>
              <i
                *ngSwitchCase="'error'"
                nz-icon
                nzType="close-circle"
                class="ant-notification-notice-icon ant-notification-notice-icon-error"
              ></i>
            </ng-container>
            <div class="ant-notification-notice-message" [innerHTML]="nzMessage.title"></div>
            <div class="ant-notification-notice-description" [innerHTML]="nzMessage.content"></div>
          </div>
        </div>
      </div>
      <ng-template
        [ngIf]="nzMessage.template"
        [ngTemplateOutlet]="nzMessage.template"
        [ngTemplateOutletContext]="{ $implicit: this, data: nzMessage.options?.nzData }"
      >
      </ng-template>
      <a tabindex="0" class="ant-notification-notice-close" (click)="close()">
        <span class="ant-notification-notice-close-x">
          <ng-container *ngIf="nzMessage.options?.nzCloseIcon; else iconTpl">
            <ng-container *nzStringTemplateOutlet="nzMessage.options?.nzCloseIcon">
              <i nz-icon [nzType]="nzMessage.options?.nzCloseIcon"></i>
            </ng-container>
          </ng-container>
          <ng-template #iconTpl>
            <i nz-icon nzType="close" class="ant-notification-close-icon"></i>
          </ng-template>
        </span>
      </a>
    </div>
  `
})
export class NzNotificationComponent implements OnInit, OnDestroy {
  @Input() nzMessage: NzNotificationDataFilled;
  @Input() nzIndex: number;
  @Input() nzPlacement: string;
  @Output() readonly messageDestroy = new EventEmitter<{ id: string; userAction: boolean }>();

  protected options: Required<NzNotificationDataOptions>;

  // Whether to set a timeout to destroy itself.
  private autoClose: boolean;

  private eraseTimer: number | null = null;
  private eraseTimingStart: number;
  private eraseTTL: number; // Time to live.

  constructor(protected cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // `NzMessageContainer` does its job so all properties cannot be undefined.
    this.options = this.nzMessage.options as Required<NzNotificationDataOptions>;

    if (this.options.nzAnimate) {
      this.nzMessage.state = 'enter';
    }

    this.autoClose = this.options.nzDuration > 0;

    if (this.autoClose) {
      this.initErase();
      this.startEraseTimeout();
    }
  }

  ngOnDestroy(): void {
    if (this.autoClose) {
      this.clearEraseTimeout();
    }
  }

  onEnter(): void {
    if (this.autoClose && this.options.nzPauseOnHover) {
      this.clearEraseTimeout();
      this.updateTTL();
    }
  }

  onLeave(): void {
    if (this.autoClose && this.options.nzPauseOnHover) {
      this.startEraseTimeout();
    }
  }

  // Remove self
  protected destroy(userAction: boolean = false): void {
    if (this.options.nzAnimate) {
      this.nzMessage.state = 'leave';
      this.cdr.detectChanges();
      setTimeout(() => {
        this.messageDestroy.next({ id: this.nzMessage.messageId, userAction: userAction });
      }, 200);
    } else {
      this.messageDestroy.next({ id: this.nzMessage.messageId, userAction: userAction });
    }
  }

  private initErase(): void {
    this.eraseTTL = this.options.nzDuration;
    this.eraseTimingStart = Date.now();
  }

  private updateTTL(): void {
    if (this.autoClose) {
      this.eraseTTL -= Date.now() - this.eraseTimingStart;
    }
  }

  private startEraseTimeout(): void {
    if (this.eraseTTL > 0) {
      this.clearEraseTimeout();
      this.eraseTimer = setTimeout(() => this.destroy(), this.eraseTTL);
      this.eraseTimingStart = Date.now();
    } else {
      this.destroy();
    }
  }

  private clearEraseTimeout(): void {
    if (this.eraseTimer !== null) {
      clearTimeout(this.eraseTimer);
      this.eraseTimer = null;
    }
  }

  close(): void {
    this.destroy(true);
  }

  get state(): string | undefined {
    if (this.nzMessage.state === 'enter') {
      if (this.nzPlacement === 'topLeft' || this.nzPlacement === 'bottomLeft') {
        return 'enterLeft';
      } else {
        return 'enterRight';
      }
    } else {
      return this.nzMessage.state;
    }
  }
}
