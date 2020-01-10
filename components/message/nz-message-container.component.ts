/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';

import { MessageConfig, NzConfigService, toCssPixel } from 'ng-zorro-antd/core';
import { NzMessageDataFilled, NzMessageDataOptions } from './nz-message.definitions';

const NZ_CONFIG_COMPONENT_NAME = 'message';
const NZ_MESSAGE_DEFAULT_CONFIG: Required<MessageConfig> = {
  nzAnimate: true,
  nzDuration: 3000,
  nzMaxStack: 7,
  nzPauseOnHover: true,
  nzTop: 24
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-message-container',
  exportAs: 'nzMessageContainer',
  preserveWhitespaces: false,
  templateUrl: './nz-message-container.component.html'
})
export class NzMessageContainerComponent implements OnInit {
  messages: NzMessageDataFilled[] = [];
  config: Required<MessageConfig>;
  top: string | null;

  constructor(protected cdr: ChangeDetectorRef, protected nzConfigService: NzConfigService) {
    this.updateConfig();
  }

  ngOnInit(): void {
    this.subscribeConfigChange();
  }

  /**
   * Create a new message.
   * @param message Parsed message configuration.
   */
  createMessage(message: NzMessageDataFilled): void {
    if (this.messages.length >= this.config.nzMaxStack) {
      this.messages.splice(0, 1);
    }
    message.options = this._mergeMessageOptions(message.options);
    message.onClose = new Subject<boolean>();
    this.messages.push(message);
    this.cdr.detectChanges();
  }

  /**
   * Remove a message by `messageId`.
   * @param messageId Id of the message to be removed.
   * @param userAction Whether this is closed by user interaction.
   */
  removeMessage(messageId: string, userAction: boolean = false): void {
    this.messages.some((message, index) => {
      if (message.messageId === messageId) {
        this.messages.splice(index, 1);
        this.cdr.detectChanges();
        message.onClose!.next(userAction);
        message.onClose!.complete();
        return true;
      }
      return false;
    });
  }

  /**
   * Remove all messages.
   */
  removeMessageAll(): void {
    this.messages = [];
    this.cdr.detectChanges();
  }

  protected updateConfig(): void {
    this.config = this.updateConfigFromConfigService();
    this.top = toCssPixel(this.config.nzTop);
    this.cdr.markForCheck();
  }

  protected subscribeConfigChange(): void {
    this.nzConfigService.getConfigChangeEventForComponent(NZ_CONFIG_COMPONENT_NAME).subscribe(() => this.updateConfig());
  }

  protected updateConfigFromConfigService(): Required<MessageConfig> {
    return {
      ...NZ_MESSAGE_DEFAULT_CONFIG,
      ...this.config,
      ...this.nzConfigService.getConfigForComponent(NZ_CONFIG_COMPONENT_NAME)
    };
  }

  /**
   * Merge default options and custom message options
   * @param options
   */
  protected _mergeMessageOptions(options?: NzMessageDataOptions): NzMessageDataOptions {
    const defaultOptions: NzMessageDataOptions = {
      nzDuration: this.config.nzDuration,
      nzAnimate: this.config.nzAnimate,
      nzPauseOnHover: this.config.nzPauseOnHover
    };
    return { ...defaultOptions, ...options };
  }
}
