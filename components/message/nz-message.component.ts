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
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { moveUpMotion } from 'ng-zorro-antd/core';

import { NzMessageContainerComponent } from './nz-message-container.component';
import { NzMessageDataFilled, NzMessageDataOptions } from './nz-message.definitions';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-message',
  exportAs: 'nzMessage',
  preserveWhitespaces: false,
  animations: [moveUpMotion],
  templateUrl: './nz-message.component.html'
})
export class NzMessageComponent implements OnInit, OnDestroy {
  @Input() nzMessage: NzMessageDataFilled;
  @Input() nzIndex: number;

  protected _options: Required<NzMessageDataOptions>;

  private _autoErase: boolean; // Whether to set a timeout to destroy itself.
  private _eraseTimer: number | null = null;
  private _eraseTimingStart: number;
  private _eraseTTL: number; // Time to live.

  constructor(private _messageContainer: NzMessageContainerComponent, protected cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // `NzMessageContainer` does its job so all properties cannot be undefined.
    this._options = this.nzMessage.options as Required<NzMessageDataOptions>;

    if (this._options.nzAnimate) {
      this.nzMessage.state = 'enter';
    }

    this._autoErase = this._options.nzDuration > 0;

    if (this._autoErase) {
      this._initErase();
      this._startEraseTimeout();
    }
  }

  ngOnDestroy(): void {
    if (this._autoErase) {
      this._clearEraseTimeout();
    }
  }

  onEnter(): void {
    if (this._autoErase && this._options.nzPauseOnHover) {
      this._clearEraseTimeout();
      this._updateTTL();
    }
  }

  onLeave(): void {
    if (this._autoErase && this._options.nzPauseOnHover) {
      this._startEraseTimeout();
    }
  }

  // Remove self
  protected _destroy(userAction: boolean = false): void {
    if (this._options.nzAnimate) {
      this.nzMessage.state = 'leave';
      this.cdr.detectChanges();
      setTimeout(() => this._messageContainer.removeMessage(this.nzMessage.messageId, userAction), 200);
    } else {
      this._messageContainer.removeMessage(this.nzMessage.messageId, userAction);
    }
  }

  private _initErase(): void {
    this._eraseTTL = this._options.nzDuration;
    this._eraseTimingStart = Date.now();
  }

  private _updateTTL(): void {
    if (this._autoErase) {
      this._eraseTTL -= Date.now() - this._eraseTimingStart;
    }
  }

  private _startEraseTimeout(): void {
    if (this._eraseTTL > 0) {
      this._clearEraseTimeout();
      this._eraseTimer = setTimeout(() => this._destroy(), this._eraseTTL);
      this._eraseTimingStart = Date.now();
    } else {
      this._destroy();
    }
  }

  private _clearEraseTimeout(): void {
    if (this._eraseTimer !== null) {
      clearTimeout(this._eraseTimer);
      this._eraseTimer = null;
    }
  }
}
