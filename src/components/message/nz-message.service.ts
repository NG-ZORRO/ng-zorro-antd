import { Injectable, ComponentRef, Type } from '@angular/core';
import { FloaterService } from '../core/floater/index';
import { NzMessageConfig } from './nz-message-config';
import { NzMessageData, NzMessageDataFilled, NzMessageDataOptions } from './nz-message.definitions';
import { NzMessageContainerComponent } from './nz-message-container.component';

export class NzMessageBaseService<ContainerClass extends NzMessageContainerComponent<any>, MessageData> {
  protected _counter = 0; // Id counter for messages
  protected _container: ContainerClass;

  constructor(floaterService: FloaterService, containerClass: Type<ContainerClass>, private _idPrefix: string = '') {
    this._container = floaterService.persistAttachComponent(containerClass);
  }

  remove(messageId?: string): void {
    if (messageId) {
      this._container.removeMessage(messageId);
    } else {
      this._container.removeMessageAll();
    }
  }

  createMessage(message: MessageData, options?: NzMessageDataOptions): NzMessageDataFilled {
    const resultMessage: NzMessageDataFilled = Object.assign(message, {
      messageId: this._generateMessageId(),
      options: options,
      createdAt: new Date()
    });
    this._container.createMessage(resultMessage);

    return resultMessage;
  }

  protected _generateMessageId(): string {
    return this._idPrefix + this._counter++;
  }
}

@Injectable()
export class NzMessageService extends NzMessageBaseService<NzMessageContainerComponent<NzMessageConfig>, NzMessageData> {

  constructor(floaterService: FloaterService) {
    super(floaterService, NzMessageContainerComponent, 'message-');
  }

  // Shortcut methods
  success(content: string, options?: NzMessageDataOptions) {
    return this.createMessage({ type: 'success', content: content }, options);
  }

  error(content: string, options?: NzMessageDataOptions) {
    return this.createMessage({ type: 'error', content: content }, options);
  }

  info(content: string, options?: NzMessageDataOptions) {
    return this.createMessage({ type: 'info', content: content }, options);
  }

  warning(content: string, options?: NzMessageDataOptions) {
    return this.createMessage({ type: 'warning', content: content }, options);
  }

  loading(content: string, options?: NzMessageDataOptions) {
    return this.createMessage({ type: 'loading', content: content }, options);
  }

  create(type: string, content: string, options?: NzMessageDataOptions) {
    return this.createMessage({ type: type as any, content: content }, options);
  }

  // For content with html
  html(html: string, options?: NzMessageDataOptions) {
    return this.createMessage({ html: html }, options);
  }
}
