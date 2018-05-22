import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector, Type } from '@angular/core';

import { NzMessageConfig } from './nz-message-config';
import { NzMessageContainerComponent } from './nz-message-container.component';
import { NzMessageData, NzMessageDataFilled, NzMessageDataOptions } from './nz-message.definitions';

let globalCounter = 0; // global ID counter for messages

export class NzMessageBaseService<ContainerClass extends NzMessageContainerComponent, MessageData, MessageConfig extends NzMessageConfig> {
  protected _container: ContainerClass;

  constructor(
    private overlay: Overlay,
    private containerClass: Type<ContainerClass>,
    private injector: Injector,
    private cfr: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private _idPrefix: string = '') {

    // this._container = overlay.create().attach(new ComponentPortal(containerClass)).instance;
    this._container = this.createContainer();
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

  // Manually creating container for overlay to avoid multi-checking error, see: https://github.com/NG-ZORRO/ng-zorro-antd/issues/391
  // NOTE: we never clean up the container component and it's overlay resources, if we should, we need to do it by our own codes.
  private createContainer(): ContainerClass {
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

@Injectable()
export class NzMessageService extends NzMessageBaseService<NzMessageContainerComponent, NzMessageData, NzMessageConfig> {

  constructor(
    overlay: Overlay,
    injector: Injector,
    cfr: ComponentFactoryResolver,
    appRef: ApplicationRef) {

    super(overlay, NzMessageContainerComponent, injector, cfr, appRef, 'message-');
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
