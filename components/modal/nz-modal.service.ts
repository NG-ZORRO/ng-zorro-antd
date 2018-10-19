import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LoggerService } from '../core/util/logger/logger.service';

import { NzModalControlService } from './nz-modal-control.service';
import { NzModalRef } from './nz-modal-ref.class';
import { NzModalComponent } from './nz-modal.component';
import { ConfirmType, ModalOptions, ModalOptionsForService } from './nz-modal.type';

// A builder used for managing service creating modals
export class ModalBuilderForService {
  private modalRef: ComponentRef<NzModalComponent>; // Modal ComponentRef, "null" means it has been destroyed
  private overlayRef: OverlayRef;

  constructor(private overlay: Overlay, options: ModalOptionsForService = {}) {
    this.createModal();

    if (!('nzGetContainer' in options)) { // As we use CDK to create modal in service by force, there is no need to use nzGetContainer
      options.nzGetContainer = null; // Override nzGetContainer's default value to prevent creating another overlay
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
  // Track of the current close modals (we assume invisible is close this time)
  get openModals(): NzModalRef[] {
    return this.modalControl.openModals;
  }

  get afterAllClose(): Observable<void> {
    return this.modalControl.afterAllClose.asObservable();
  }

  constructor(
    private overlay: Overlay,
    private logger: LoggerService,
    private modalControl: NzModalControlService) {
  }

  // Closes all of the currently-open dialogs
  closeAll(): void {
    this.modalControl.closeAll();
  }

  create<T>(options: ModalOptionsForService<T> = {}): NzModalRef<T> {
    if (typeof options.nzOnCancel !== 'function') {
      options.nzOnCancel = () => {
      }; // Leave a empty function to close this modal by default
    }

    const modalRef = new ModalBuilderForService(this.overlay, options).getInstance(); // NOTE: use NzModalComponent as the NzModalRef by now, we may need archive the real NzModalRef object in the future

    return modalRef;
  }

  confirm<T>(options: ModalOptionsForService<T> = {}, confirmType: ConfirmType = 'confirm'): NzModalRef<T> {
    if ('nzFooter' in options) {
      this.logger.warn(`The Confirm-Modal doesn't support "nzFooter", this property will be ignored.`);
    }
    if (!('nzWidth' in options)) {
      options.nzWidth = 416;
    }
    if (typeof options.nzOnOk !== 'function') { // NOTE: only support function currently by calling confirm()
      options.nzOnOk = () => {
      }; // Leave a empty function to close this modal by default
    }

    options.nzModalType = 'confirm';
    options.nzClassName = `ant-modal-confirm ant-modal-confirm-${confirmType} ${options.nzClassName || ''}`;
    options.nzMaskClosable = false;
    return this.create(options);
  }

  info<T>(options: ModalOptionsForService<T> = {}): NzModalRef<T> {
    return this.simpleConfirm(options, 'info');
  }

  success<T>(options: ModalOptionsForService<T> = {}): NzModalRef<T> {
    return this.simpleConfirm(options, 'success');
  }

  error<T>(options: ModalOptionsForService<T> = {}): NzModalRef<T> {
    return this.simpleConfirm(options, 'error');
  }

  warning<T>(options: ModalOptionsForService<T> = {}): NzModalRef<T> {
    return this.simpleConfirm(options, 'warning');
  }

  private simpleConfirm<T>(options: ModalOptionsForService<T> = {}, confirmType: ConfirmType): NzModalRef<T> {
    if (!('nzIconType' in options)) {
      options.nzIconType = {
        'info'   : 'info-circle',
        'success': 'check-circle',
        'error'  : 'close-circle',
        'warning': 'exclamation-circle'
      }[ confirmType ];
    }
    if (!('nzCancelText' in options)) { // Remove the Cancel button if the user not specify a Cancel button
      options.nzCancelText = null;
    }
    return this.confirm(options, confirmType);
  }
}
