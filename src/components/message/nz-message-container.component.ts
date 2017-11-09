import { Optional, Inject, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NzMessageDataFilled, NzMessageDataOptions } from './nz-message.definitions';
import { NZ_MESSAGE_CONFIG, NZ_MESSAGE_DEFAULT_CONFIG, NzMessageConfig } from './nz-message-config';

@Component({
  selector     : 'nz-message-container',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div class="ant-message">
      <nz-message *ngFor="let message of messages; let i = index" [nzMessage]="message" [nzIndex]="i"></nz-message>
    </div>
  `,
  styleUrls    : [
    './style/index.less'
  ]
})
export class NzMessageContainerComponent implements OnInit {
  messages: NzMessageDataFilled[] = [];
  config: NzMessageConfig;

  constructor(@Optional() @Inject(NZ_MESSAGE_DEFAULT_CONFIG) defaultConfig: NzMessageConfig,
              @Optional() @Inject(NZ_MESSAGE_CONFIG) config: NzMessageConfig) {
    this.config = Object.assign({}, defaultConfig, config) as NzMessageConfig;
  }

  ngOnInit() { }

  // Create a new message
  createMessage(message: NzMessageDataFilled): void {
    if (this.messages.length >= this.config.nzMaxStack) {
      this.messages.splice(0, 1);
    }
    message.options = this._mergeMessageOptions(message.options);
    this.messages.push(message);
  }

  // Remove a message by messageId
  removeMessage(messageId: string): void {
    this.messages.some((message, index) => {
      if (message.messageId === messageId) {
        this.messages.splice(index, 1);
        return true;
      }
    });
  }

  // Remove all messages
  removeMessageAll() {
    this.messages = [];
  }

  // Merge default options and cutom message options
  protected _mergeMessageOptions(options: NzMessageDataOptions): NzMessageDataOptions {
    const defaultOptions: NzMessageDataOptions = {
      nzDuration: this.config.nzDuration,
      nzAnimate: this.config.nzAnimate,
      nzPauseOnHover: this.config.nzPauseOnHover
    };
    return Object.assign(defaultOptions, options);
  }
}
