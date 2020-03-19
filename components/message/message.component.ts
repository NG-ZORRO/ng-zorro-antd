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
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { moveUpMotion } from 'ng-zorro-antd/core/animation';

import { NzMessageDataFilled, NzMessageDataOptions } from './typings';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-message',
  exportAs: 'nzMessage',
  preserveWhitespaces: false,
  animations: [moveUpMotion],
  template: `
    <div class="ant-message-notice" [@moveUpMotion]="nzMessage.state" (mouseenter)="onEnter()" (mouseleave)="onLeave()">
      <div class="ant-message-notice-content">
        <div class="ant-message-custom-content" [ngClass]="'ant-message-' + nzMessage.type">
          <ng-container [ngSwitch]="nzMessage.type">
            <i *ngSwitchCase="'success'" nz-icon nzType="check-circle"></i>
            <i *ngSwitchCase="'info'" nz-icon nzType="info-circle"></i>
            <i *ngSwitchCase="'warning'" nz-icon nzType="exclamation-circle"></i>
            <i *ngSwitchCase="'error'" nz-icon nzType="close-circle"></i>
            <i *ngSwitchCase="'loading'" nz-icon nzType="loading"></i>
          </ng-container>
          <ng-container *nzStringTemplateOutlet="nzMessage.content">
            <span [innerHTML]="nzMessage.content"></span>
          </ng-container>
        </div>
      </div>
    </div>
  `
})
export class NzMessageComponent implements OnInit, OnDestroy {
  @Input() nzMessage: NzMessageDataFilled;
  @Input() nzIndex: number;
  @Output() readonly messageDestroy = new EventEmitter<{ id: string; userAction: boolean }>();

  protected options: Required<NzMessageDataOptions>;

  // Whether to set a timeout to destroy itself.
  private autoClose: boolean;

  private eraseTimer: number | null = null;
  private eraseTimingStart: number;
  private eraseTTL: number; // Time to live.

  constructor(protected cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // `NzMessageContainer` does its job so all properties cannot be undefined.
    this.options = this.nzMessage.options as Required<NzMessageDataOptions>;

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
}
