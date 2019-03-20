import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Optional,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';

import { toCssPixel } from '../core/util';

import {
  NzMessageConfig,
  NZ_MESSAGE_CONFIG,
  NZ_MESSAGE_DEFAULT_CONFIG
} from './nz-message-config';
import {
  NzMessageDataFilled,
  NzMessageDataOptions
} from './nz-message.definitions';

@Component({
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  selector           : 'nz-message-container',
  preserveWhitespaces: false,
  templateUrl        : './nz-message-container.component.html'
})
export class NzMessageContainerComponent {
  messages: NzMessageDataFilled[] = [];
  config: Required<NzMessageConfig>;
  top: string | null;

  constructor(
    protected cdr: ChangeDetectorRef,
    @Optional() @Inject(NZ_MESSAGE_DEFAULT_CONFIG) defaultConfig: NzMessageConfig,
    @Optional() @Inject(NZ_MESSAGE_CONFIG) config: NzMessageConfig
  ) {
    this.setConfig({ ...defaultConfig, ...config });
  }

  setConfig(config: NzMessageConfig): void {
    this.config = { ...this.config, ...config };
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

  /**
   * Merge default options and custom message options
   * @param options
   */
  protected _mergeMessageOptions(options?: NzMessageDataOptions): NzMessageDataOptions {
    const defaultOptions: NzMessageDataOptions = {
      nzDuration    : this.config.nzDuration,
      nzAnimate     : this.config.nzAnimate,
      nzPauseOnHover: this.config.nzPauseOnHover
    };
    return { ...defaultOptions, ...options};
  }
}
