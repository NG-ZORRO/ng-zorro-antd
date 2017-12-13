import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Type } from '@angular/core';
import { NzMessageContainerComponent } from './nz-message-container.component';
import { NzMessageData, NzMessageDataFilled, NzMessageDataOptions } from './nz-message.definitions';

// TODO: remove MessageData generic type as it has no contributon in typing
export class NzMessageBaseService<ContainerClass extends NzMessageContainerComponent, MessageData> {
  protected _counter = 0; // Id counter for messages
  protected _container: ContainerClass;

  constructor(overlay: Overlay, containerClass: Type<ContainerClass>, private _idPrefix: string = '') {
    this._container = overlay.create().attach(new ComponentPortal(containerClass)).instance;
  }

  remove(messageId?: string): void {
    if (messageId) {
      this._container.removeMessage(messageId);
    } else {
      this._container.removeMessageAll();
    }
  }

  createMessage(message: object, options?: NzMessageDataOptions): NzMessageDataFilled {
    // TODO: spread on literal has been disallow on latest proposal
    const resultMessage: NzMessageDataFilled = { ...message, ...{
      messageId: this._generateMessageId(),
      options,
      createdAt: new Date()
    }};
    this._container.createMessage(resultMessage);

    return resultMessage;
  }

  protected _generateMessageId(): string {
    return this._idPrefix + this._counter++;
  }
}

@Injectable()
export class NzMessageService extends NzMessageBaseService<NzMessageContainerComponent, NzMessageData> {

  constructor(overlay: Overlay) {
    super(overlay, NzMessageContainerComponent, 'message-');
  }

  // Shortcut methods
  success(content: string, options?: NzMessageDataOptions): NzMessageDataFilled {
    return this.createMessage({ type: 'success', content }, options);
  }

  error(content: string, options?: NzMessageDataOptions): NzMessageDataFilled {
    return this.createMessage({ type: 'error', content }, options);
  }

  info(content: string, options?: NzMessageDataOptions): NzMessageDataFilled {
    return this.createMessage({ type: 'info', content }, options);
  }

  warning(content: string, options?: NzMessageDataOptions): NzMessageDataFilled {
    return this.createMessage({ type: 'warning', content }, options);
  }

  loading(content: string, options?: NzMessageDataOptions): NzMessageDataFilled {
    return this.createMessage({ type: 'loading', content }, options);
  }

  create(type: string, content: string, options?: NzMessageDataOptions): NzMessageDataFilled {
    return this.createMessage({ type, content }, options);
  }

  // For content with html
  html(html: string, options?: NzMessageDataOptions): NzMessageDataFilled {
    return this.createMessage({ html }, options);
  }
}
