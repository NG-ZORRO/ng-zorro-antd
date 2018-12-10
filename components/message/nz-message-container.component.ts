import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Optional, ViewEncapsulation } from '@angular/core';

import { NZ_MESSAGE_CONFIG, NZ_MESSAGE_DEFAULT_CONFIG, NzMessageConfig } from './nz-message-config';
import { NzMessageDataFilled, NzMessageDataOptions } from './nz-message.definitions';

@Component({
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  selector           : 'nz-message-container',
  preserveWhitespaces: false,
  templateUrl        : './nz-message-container.component.html'
})
export class NzMessageContainerComponent {
  messages: NzMessageDataFilled[] = [];
  config: NzMessageConfig = {};

  constructor(
    protected cdr: ChangeDetectorRef,
    @Optional() @Inject(NZ_MESSAGE_DEFAULT_CONFIG) defaultConfig: NzMessageConfig,
    @Optional() @Inject(NZ_MESSAGE_CONFIG) config: NzMessageConfig
  ) {
    this.setConfig({ ...defaultConfig, ...config });
  }

  setConfig(config: NzMessageConfig): void {
    this.config = { ...this.config, ...config };
  }

  // Create a new message
  createMessage(message: NzMessageDataFilled): void {
    if (this.messages.length >= this.config.nzMaxStack) {
      this.messages.splice(0, 1);
    }
    message.options = this._mergeMessageOptions(message.options);
    this.messages.push(message);
    this.cdr.detectChanges();
  }

  // Remove a message by messageId
  removeMessage(messageId: string): void {
    this.messages.some((message, index) => {
      if (message.messageId === messageId) {
        this.messages.splice(index, 1);
        this.cdr.detectChanges();
        return true;
      }
    });
  }

  // Remove all messages
  removeMessageAll(): void {
    this.messages = [];
    this.cdr.detectChanges();
  }

  // Merge default options and custom message options
  protected _mergeMessageOptions(options: NzMessageDataOptions): NzMessageDataOptions {
    const defaultOptions: NzMessageDataOptions = {
      nzDuration    : this.config.nzDuration,
      nzAnimate     : this.config.nzAnimate,
      nzPauseOnHover: this.config.nzPauseOnHover
    };
    return { ...defaultOptions, ...options };
  }
}
