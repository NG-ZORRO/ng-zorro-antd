import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Type } from '@angular/core';

import { NzMessageConfig } from './nz-message-config';
import { NzMessageContainerComponent } from './nz-message-container.component';
import { NzMessageData, NzMessageDataFilled, NzMessageDataOptions } from './nz-message.definitions';

let globalCounter = 0; // global ID counter for messages

export class NzMessageBaseService<ContainerClass extends NzMessageContainerComponent, MessageData, MessageConfig extends NzMessageConfig> {
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

  createMessage(message: MessageData, options?: NzMessageDataOptions): NzMessageDataFilled {
    // TODO: spread on literal has been disallow on latest proposal
    const resultMessage: NzMessageDataFilled = {
      ...(message as {}), ...{
        messageId: this._generateMessageId(),
        options,
        createdAt: new Date()
      }
    };
    this._container.createMessage(resultMessage);

    return resultMessage;
  }

  config(config: MessageConfig): void {
    this._container.setConfig(config);
  }

  protected _generateMessageId(): string {
    return this._idPrefix + globalCounter++;
  }
}

@Injectable()
export class NzMessageService extends NzMessageBaseService<NzMessageContainerComponent, NzMessageData, NzMessageConfig> {

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

  create(type: 'success' | 'info' | 'warning' | 'error' | 'loading' | string, content: string, options?: NzMessageDataOptions): NzMessageDataFilled {
    return this.createMessage({ type, content }, options);
  }
}
