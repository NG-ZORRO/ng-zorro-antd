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

import { NzSingletonService } from 'ng-zorro-antd/core';
import { NzNotificationContainerComponent } from './notification-container.component';
import { NzNotificationServiceModule } from './notification.service.module';
import { NzNotificationData, NzNotificationDataFilled, NzNotificationDataOptions } from './typings';

let globalCounter = 0;

@Injectable({
  providedIn: NzNotificationServiceModule
})
export class NzNotificationService {
  private name = 'notification-';
  protected container: NzNotificationContainerComponent;
  remove(messageId?: string): void {
    if (messageId) {
      this.container.removeMessage(messageId);
    } else {
      this.container.removeMessageAll();
    }
  }

  createMessage(message: NzNotificationData, options?: NzNotificationDataOptions): NzNotificationDataFilled {
    this.container = this.withContainer();
    this.nzSingletonService.registerSingletonWithKey(this.name, this.container);
    const resultMessage: NzNotificationDataFilled = {
      ...(message as NzNotificationData),
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
  private withContainer(): NzNotificationContainerComponent {
    const containerInstance = this.nzSingletonService.getSingletonWithKey(this.name);

    if (containerInstance) {
      return containerInstance as NzNotificationContainerComponent;
    }
    const overlayRef = this.overlay.create({
      hasBackdrop: false,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      positionStrategy: this.overlay.position().global()
    });
    const componentPortal = new ComponentPortal(NzNotificationContainerComponent, null, this.injector);
    const componentRef = overlayRef.attach(componentPortal);
    const overlayPane = overlayRef.overlayElement;
    overlayPane.style.zIndex = '1010'; // Patching: assign the same zIndex of ant-message to it's parent overlay panel, to the ant-message's zindex work.
    return componentRef.instance;
  }
  constructor(private nzSingletonService: NzSingletonService, private overlay: Overlay, private injector: Injector) {}

  // Shortcut methods
  success(title: string, content: string, options?: NzNotificationDataOptions): NzNotificationDataFilled {
    return this.createMessage({ type: 'success', title, content }, options) as NzNotificationDataFilled;
  }

  error(title: string, content: string, options?: NzNotificationDataOptions): NzNotificationDataFilled {
    return this.createMessage({ type: 'error', title, content }, options) as NzNotificationDataFilled;
  }

  info(title: string, content: string, options?: NzNotificationDataOptions): NzNotificationDataFilled {
    return this.createMessage({ type: 'info', title, content }, options) as NzNotificationDataFilled;
  }

  warning(title: string, content: string, options?: NzNotificationDataOptions): NzNotificationDataFilled {
    return this.createMessage({ type: 'warning', title, content }, options) as NzNotificationDataFilled;
  }

  blank(title: string, content: string, options?: NzNotificationDataOptions): NzNotificationDataFilled {
    return this.createMessage({ type: 'blank', title, content }, options) as NzNotificationDataFilled;
  }

  create(
    type: 'success' | 'info' | 'warning' | 'error' | 'blank' | string,
    title: string,
    content: string,
    options?: NzNotificationDataOptions
  ): NzNotificationDataFilled {
    return this.createMessage({ type, title, content }, options) as NzNotificationDataFilled;
  }

  // For content with template
  template(template: TemplateRef<{}>, options?: NzNotificationDataOptions): NzNotificationDataFilled {
    return this.createMessage({ template }, options) as NzNotificationDataFilled;
  }
}
