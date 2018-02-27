import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EventEmitter, Injectable, Injector, TemplateRef, Type } from '@angular/core';

import { LoggerService } from '../core/util/logger/logger.service';

import { ModalPublicAgent } from './modal-public-agent.class';
import { NzModalComponent } from './nz-modal.component';
import { ConfirmType, ModalOptions, ModalOptionsForService } from './nz-modal.type';

// A builder used for managing service creating modals
export class ModalBuilderForService {
  private modalRef: ComponentRef<NzModalComponent>; // Modal ComponentRef, "null" means it has been destroyed
  private overlayRef: OverlayRef;

  constructor(private overlay: Overlay, options: ModalOptionsForService = {}) {
      this.createModal();

      if (!('nzGetContainer' in options)) { // As we use CDK to create modal in service, there is no need to append DOM to body by default
        options.nzGetContainer = null;
      }

      this.changeProps(options);
      this.modalRef.instance.open();
      this.modalRef.instance.nzAfterClose.subscribe(() => this.destroyModal()); // [NOTE] By default, close equals destroy when using as Service
  }

  getInstance(): NzModalComponent {
    return this.modalRef && this.modalRef.instance;
  }

  destroyModal(): void {
    if (this.modalRef) {
      this.overlayRef.dispose();
      this.modalRef = null;
    }
  }

  private changeProps(options: ModalOptions): void {
    if (this.modalRef) {
      Object.assign(this.modalRef.instance, options); // DANGER: here not limit user's inputs at runtime
    }
  }

  // Create component to ApplicationRef
  private createModal(): void {
    this.overlayRef = this.overlay.create();
    this.modalRef = this.overlayRef.attach(new ComponentPortal(NzModalComponent));
  }
}

@Injectable()
export class NzModalService {

  constructor(private overlay: Overlay, private logger: LoggerService) { }

  create(options: ModalOptionsForService = {}): ModalPublicAgent {
    if (typeof options.nzOnCancel !== 'function') {
      options.nzOnCancel = () => {}; // Leave a empty function to close this modal by default
    }

    return new ModalBuilderForService(this.overlay, options).getInstance();
  }

  confirm(options: ModalOptionsForService = {}, confirmType: ConfirmType = 'confirm'): ModalPublicAgent {
    if ('nzFooter' in options) {
      this.logger.warn(`The Confirm-Modal doesn't support "nzFooter", this property will be ignored.`);
    }
    if (!('nzWidth' in options)) {
      options.nzWidth = 416;
    }
    if (typeof options.nzOnOk !== 'function') { // NOTE: only support function currently by calling confirm()
      options.nzOnOk = () => {}; // Leave a empty function to close this modal by default
    }

    options.nzModalType = 'confirm';
    options.nzClassName = `ant-confirm ant-confirm-${confirmType} ${options.nzClassName || ''}`;
    options.nzMaskClosable = false;
    return this.create(options);
  }

  info(options: ModalOptionsForService = {}): ModalPublicAgent {
    return this.simpleConfirm(options, 'info');
  }

  success(options: ModalOptionsForService = {}): ModalPublicAgent {
    return this.simpleConfirm(options, 'success');
  }

  error(options: ModalOptionsForService = {}): ModalPublicAgent {
    return this.simpleConfirm(options, 'error');
  }

  warning(options: ModalOptionsForService = {}): ModalPublicAgent {
    return this.simpleConfirm(options, 'warning');
  }

  private simpleConfirm(options: ModalOptionsForService = {}, confirmType: ConfirmType): ModalPublicAgent {
    if (!('nzIconType' in options)) {
      options.nzIconType = { 'info': 'info-circle', 'success': 'check-circle', 'error': 'cross-circle', 'warning': 'exclamation-circle' }[ confirmType ];
    }
    if (!('nzCancelText' in options)) { // Remove the Cancel button if the user not specify a Cancel button
      options.nzCancelText = null;
    }
    return this.confirm(options, confirmType);
  }
}
