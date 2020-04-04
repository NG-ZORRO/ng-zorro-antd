/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector, TemplateRef } from '@angular/core';
import { NzSingletonService } from 'ng-zorro-antd/core/services';
import { NzMessageContainerComponent } from './message-container.component';
import { NzMessageServiceModule } from './message.service.module';
import { NzMessageData, NzMessageDataFilled, NzMessageDataOptions } from './typings';

let globalCounter = 0;

@Injectable({
  providedIn: NzMessageServiceModule
})
export class NzMessageService {
  private name = 'message-';
  protected container: NzMessageContainerComponent;

  constructor(private nzSingletonService: NzSingletonService, private overlay: Overlay, private injector: Injector) {}

  // Shortcut methods
  success(content: string | TemplateRef<void>, options?: NzMessageDataOptions): NzMessageDataFilled {
    return this.createMessage({ type: 'success', content }, options);
  }

  error(content: string | TemplateRef<void>, options?: NzMessageDataOptions): NzMessageDataFilled {
    return this.createMessage({ type: 'error', content }, options);
  }

  info(content: string | TemplateRef<void>, options?: NzMessageDataOptions): NzMessageDataFilled {
    return this.createMessage({ type: 'info', content }, options);
  }

  warning(content: string | TemplateRef<void>, options?: NzMessageDataOptions): NzMessageDataFilled {
    return this.createMessage({ type: 'warning', content }, options);
  }

  loading(content: string | TemplateRef<void>, options?: NzMessageDataOptions): NzMessageDataFilled {
    return this.createMessage({ type: 'loading', content }, options);
  }

  create(
    type: 'success' | 'info' | 'warning' | 'error' | 'loading' | string,
    content: string | TemplateRef<void>,
    options?: NzMessageDataOptions
  ): NzMessageDataFilled {
    return this.createMessage({ type, content }, options);
  }

  remove(messageId?: string): void {
    if (messageId) {
      this.container.removeMessage(messageId);
    } else {
      this.container.removeMessageAll();
    }
  }

  createMessage(message: NzMessageData, options?: NzMessageDataOptions): NzMessageDataFilled {
    this.container = this.withContainer();
    this.nzSingletonService.registerSingletonWithKey(this.name, this.container);
    const resultMessage: NzMessageDataFilled = {
      ...(message as NzMessageData),
      ...{
        createdAt: new Date(),
        messageId: this.generateMessageId(),
        options
      }
    };
    this.container.createMessage(resultMessage);

    return resultMessage;
  }

  protected generateMessageId(): string {
    return `${this.name}-${globalCounter++}`;
  }

  // Manually creating container for overlay to avoid multi-checking error, see: https://github.com/NG-ZORRO/ng-zorro-antd/issues/391
  // NOTE: we never clean up the container component and it's overlay resources, if we should, we need to do it by our own codes.
  private withContainer(): NzMessageContainerComponent {
    const containerInstance = this.nzSingletonService.getSingletonWithKey(this.name);

    if (containerInstance) {
      return containerInstance as NzMessageContainerComponent;
    }
    const overlayRef = this.overlay.create({
      hasBackdrop: false,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      positionStrategy: this.overlay.position().global()
    });
    const componentPortal = new ComponentPortal(NzMessageContainerComponent, null, this.injector);
    const componentRef = overlayRef.attach(componentPortal);
    const overlayPane = overlayRef.overlayElement;
    overlayPane.style.zIndex = '1010'; // Patching: assign the same zIndex of ant-message to it's parent overlay panel, to the ant-message's zindex work.
    return componentRef.instance;
  }
}
