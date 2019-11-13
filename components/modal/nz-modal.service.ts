/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { warn, IndexableObject } from 'ng-zorro-antd/core';

import { NzModalControlService } from './nz-modal-control.service';
import { NzModalRef } from './nz-modal-ref.class';
import { NzModalComponent } from './nz-modal.component';
import { NzModalServiceModule } from './nz-modal.service.module';
import { ConfirmType, ModalOptions, ModalOptionsForService } from './nz-modal.type';

// A builder used for managing service creating modals
export class ModalBuilderForService {
  private modalRef: ComponentRef<NzModalComponent> | null; // Modal ComponentRef, "null" means it has been destroyed
  private overlayRef: OverlayRef;

  constructor(private overlay: Overlay, options: ModalOptionsForService = {}) {
    this.createModal();

    if (!('nzGetContainer' in options)) {
      // As we use CDK to create modal in service by force, there is no need to use nzGetContainer
      options.nzGetContainer = undefined; // Override nzGetContainer's default value to prevent creating another overlay
    }

    this.changeProps(options);
    this.modalRef!.instance.setOverlayRef(this.overlayRef);
    this.modalRef!.instance.open();
    this.modalRef!.instance.nzAfterClose.subscribe(() => this.destroyModal()); // [NOTE] By default, close equals destroy when using as Service
  }

  getInstance(): NzModalComponent | null {
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

@Injectable({
  providedIn: NzModalServiceModule
})
export class NzModalService {
  // Track of the current close modals (we assume invisible is close this time)
  get openModals(): NzModalRef[] {
    return this.modalControl.openModals;
  }

  get afterAllClose(): Observable<void> {
    return this.modalControl.afterAllClose.asObservable();
  }

  constructor(private overlay: Overlay, private modalControl: NzModalControlService) {}

  // Closes all of the currently-open dialogs
  closeAll(): void {
    this.modalControl.closeAll();
  }

  create<T>(options: ModalOptionsForService<T> = {}): NzModalRef<T> {
    if (typeof options.nzOnCancel !== 'function') {
      options.nzOnCancel = () => {}; // Leave a empty function to close this modal by default
    }

    // NOTE: use NzModalComponent as the NzModalRef by now, we may need archive the real NzModalRef object in the future
    const modalRef = new ModalBuilderForService(this.overlay, options).getInstance()!;

    return modalRef;
  }

  confirm<T>(options: ModalOptionsForService<T> = {}, confirmType: ConfirmType = 'confirm'): NzModalRef<T> {
    if ('nzFooter' in options) {
      warn(`The Confirm-Modal doesn't support "nzFooter", this property will be ignored.`);
    }
    if (!('nzWidth' in options)) {
      options.nzWidth = 416;
    }
    if (!('nzMaskClosable' in options)) {
      options.nzMaskClosable = false;
    }
    if (typeof options.nzOnOk !== 'function') {
      // NOTE: only support function currently by calling confirm()
      options.nzOnOk = () => {}; // Leave a empty function to close this modal by default
    }

    options.nzModalType = 'confirm';
    options.nzClassName = `ant-modal-confirm ant-modal-confirm-${confirmType} ${options.nzClassName || ''}`;
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
    const iconMap: IndexableObject = {
      info: 'info-circle',
      success: 'check-circle',
      error: 'close-circle',
      warning: 'exclamation-circle'
    };
    if (!('nzIconType' in options)) {
      options.nzIconType = iconMap[confirmType];
    }
    if (!('nzCancelText' in options)) {
      // Remove the Cancel button if the user not specify a Cancel button
      options.nzCancelText = null;
    }
    return this.confirm(options, confirmType);
  }
}
