/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Overlay } from '@angular/cdk/overlay';
import { ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injector, Type } from '@angular/core';
import { warnDeprecation, NzSingletonService } from 'ng-zorro-antd/core';

import { NzMessageConfigLegacy } from './nz-message-config';
import { NzMessageContainerComponent } from './nz-message-container.component';
import { NzMessageData, NzMessageDataFilled, NzMessageDataOptions } from './nz-message.definitions';

let globalCounter = 0;

export class NzMessageBaseService<
  ContainerClass extends NzMessageContainerComponent,
  MessageData,
  MessageConfig extends NzMessageConfigLegacy
> {
  protected _container: ContainerClass;

  constructor(
    private nzSingletonService: NzSingletonService,
    private overlay: Overlay,
    private containerClass: Type<ContainerClass>,
    private injector: Injector,
    private cfr: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private name: string = ''
  ) {
    this._container = this.withContainer();
    this.nzSingletonService.registerSingletonWithKey(this.name, this._container);
  }

  remove(messageId?: string): void {
    if (messageId) {
      this._container.removeMessage(messageId);
    } else {
      this._container.removeMessageAll();
    }
  }

  createMessage(message: MessageData, options?: NzMessageDataOptions): NzMessageDataFilled {
    const resultMessage: NzMessageDataFilled = {
      ...(message as NzMessageData),
      ...{
        createdAt: new Date(),
        messageId: this._generateMessageId(),
        options
      }
    };
    this._container.createMessage(resultMessage);

    return resultMessage;
  }

  config(config: MessageConfig): void {
    warnDeprecation(`'config' of 'NzMessageService' and 'NzNotificationService' is deprecated and will be removed in 9.0.0. Please use 'set' of 'NzConfigService' instead.`);

    this._container.setConfig(config);
  }

  protected _generateMessageId(): string {
    return `${this.name}-${globalCounter++}`;
  }

  // Manually creating container for overlay to avoid multi-checking error, see: https://github.com/NG-ZORRO/ng-zorro-antd/issues/391
  // NOTE: we never clean up the container component and it's overlay resources, if we should, we need to do it by our own codes.
  private withContainer(): ContainerClass {
    const containerInstance = this.nzSingletonService.getSingletonWithKey(this.name);

    if (containerInstance) {
      return containerInstance as ContainerClass;
    }

    const factory = this.cfr.resolveComponentFactory(this.containerClass);
    const componentRef = factory.create(this.injector); // Use root injector
    componentRef.changeDetectorRef.detectChanges(); // Immediately change detection to avoid multi-checking error
    this.appRef.attachView(componentRef.hostView); // Load view into app root
    const overlayPane = this.overlay.create().overlayElement;
    overlayPane.style.zIndex = '1010'; // Patching: assign the same zIndex of ant-message to it's parent overlay panel, to the ant-message's zindex work.
    overlayPane.appendChild((componentRef.hostView as EmbeddedViewRef<{}>).rootNodes[0] as HTMLElement);

    return componentRef.instance;
  }
}
