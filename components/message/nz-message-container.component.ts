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
  Inject,
  OnInit,
  Optional,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';

import { toCssPixel, warnDeprecation, NzConfigService } from 'ng-zorro-antd/core';

import { NzMessageConfigLegacy, NZ_MESSAGE_CONFIG, NZ_MESSAGE_DEFAULT_CONFIG } from './nz-message-config';
import { NzMessageDataFilled, NzMessageDataOptions } from './nz-message.definitions';

const NZ_CONFIG_COMPONENT_NAME = 'message';

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
  config: Required<NzMessageConfigLegacy>;
  top: string | null;

  constructor(
    protected cdr: ChangeDetectorRef,
    protected nzConfigService: NzConfigService,
    @Optional() @Inject(NZ_MESSAGE_DEFAULT_CONFIG) defaultConfig: NzMessageConfigLegacy,
    @Optional() @Inject(NZ_MESSAGE_CONFIG) config: NzMessageConfigLegacy
  ) {
    if (!!config) {
      warnDeprecation(
        `Injection token 'NZ_MESSAGE_CONFIG' is deprecated and will be removed in 9.0.0. Please use 'NzConfigService' instead.`
      );
    }
    this.setConfig({ ...defaultConfig, ...config });
  }

  ngOnInit(): void {
    this.subscribeConfigChange();
  }

  setConfig(config?: NzMessageConfigLegacy): void {
    this.config = this.mergeMessageConfig(config);
    this.top = toCssPixel(this.config.nzTop);
    this.cdr.markForCheck();
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

  protected subscribeConfigChange(): void {
    this.nzConfigService.getConfigChangeEventForComponent(NZ_CONFIG_COMPONENT_NAME).subscribe(() => this.setConfig());
  }

  protected mergeMessageConfig(config?: NzMessageConfigLegacy): Required<NzMessageConfigLegacy> {
    return {
      ...this.config,
      ...config,
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
