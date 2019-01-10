<<<<<<< HEAD
import { Component, Inject, OnInit, Optional } from '@angular/core';
=======
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Optional, ViewEncapsulation } from '@angular/core';
>>>>>>> 8906dff75d811e92e8239d5e943715c0cfdac3ea

import { Subject } from 'rxjs';
import { NzMessageConfig, NZ_MESSAGE_CONFIG, NZ_MESSAGE_DEFAULT_CONFIG } from './nz-message-config';
import { NzMessageDataFilled, NzMessageDataOptions } from './nz-message.definitions';
import { NzMessageService } from './nz-message.service';

@Component({
<<<<<<< HEAD
  selector: 'nz-message-container',
=======
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  selector           : 'nz-message-container',
>>>>>>> 8906dff75d811e92e8239d5e943715c0cfdac3ea
  preserveWhitespaces: false,
  templateUrl: './nz-message-container.component.html'
})
export class NzMessageContainerComponent {

  messages: NzMessageDataFilled[] = [];
  config: NzMessageConfig = {};

<<<<<<< HEAD
  $nzAfterClose = new Subject<NzMessageDataFilled>();

  constructor(@Optional() @Inject(NZ_MESSAGE_DEFAULT_CONFIG) defaultConfig: NzMessageConfig,
              @Optional() @Inject(NZ_MESSAGE_CONFIG) config: NzMessageConfig) {
    this.setConfig({...defaultConfig, ...config});
=======
  constructor(
    protected cdr: ChangeDetectorRef,
    @Optional() @Inject(NZ_MESSAGE_DEFAULT_CONFIG) defaultConfig: NzMessageConfig,
    @Optional() @Inject(NZ_MESSAGE_CONFIG) config: NzMessageConfig
  ) {
    this.setConfig({ ...defaultConfig, ...config });
>>>>>>> 8906dff75d811e92e8239d5e943715c0cfdac3ea
  }

  setConfig(config: NzMessageConfig): void {
    this.config = {...this.config, ...config};
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

  removeMessage(messageId: string): void {
    const removeMessage = this.messages.find((nzMessageDataFilled: NzMessageDataFilled) => nzMessageDataFilled.messageId === messageId);
    this.messages.some((message, index) => {
      if (message.messageId === messageId) {
        this.messages.splice(index, 1);
        this.cdr.detectChanges();
        return true;
      }
    });
    this.$removeMessage(removeMessage);
  }

  // Remove all messages
  removeMessageAll(): void {
    this.messages = [];
<<<<<<< HEAD
    this.$removeMessage();
  }

  $removeMessage(message?: NzMessageDataFilled): void {
    this.$nzAfterClose.next(message);
=======
    this.cdr.detectChanges();
>>>>>>> 8906dff75d811e92e8239d5e943715c0cfdac3ea
  }

  // Merge default options and custom message options
  protected _mergeMessageOptions(options: NzMessageDataOptions): NzMessageDataOptions {
    const defaultOptions: NzMessageDataOptions = {
      nzDuration: this.config.nzDuration,
      nzAnimate: this.config.nzAnimate,
      nzPauseOnHover: this.config.nzPauseOnHover
    };
    return {...defaultOptions, ...options};
  }
}
