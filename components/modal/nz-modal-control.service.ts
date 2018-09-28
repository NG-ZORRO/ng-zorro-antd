import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { NzModalRef } from './nz-modal-ref.class';

interface RegisteredMeta {
  modalRef: NzModalRef;
  afterOpenSubscription: Subscription;
  afterCloseSubscription: Subscription;
}

@Injectable()
export class NzModalControlService {
  // Track singleton afterAllClose through over the injection tree
  get afterAllClose(): Subject<void> {
    return this.parentService ? this.parentService.afterAllClose : this.rootAfterAllClose;
  }

  // Track singleton openModals array through over the injection tree
  get openModals(): NzModalRef[] {
    return this.parentService ? this.parentService.openModals : this.rootOpenModals;
  }

  private rootOpenModals: NzModalRef[] = this.parentService ? null : [];
  private rootAfterAllClose: Subject<void> = this.parentService ? null : new Subject<void>();

  private rootRegisteredMetaMap: Map<NzModalRef, RegisteredMeta> = this.parentService ? null : new Map();

  private get registeredMetaMap(): Map<NzModalRef, RegisteredMeta> { // Registered modal for later usage
    return this.parentService ? this.parentService.registeredMetaMap : this.rootRegisteredMetaMap;
  }

  constructor(
    @Optional() @SkipSelf() private parentService: NzModalControlService) {
  }

  // Register a modal to listen its open/close
  registerModal(modalRef: NzModalRef): void {
    if (!this.hasRegistered(modalRef)) {
      const afterOpenSubscription = modalRef.afterOpen.subscribe(() => this.openModals.push(modalRef));
      const afterCloseSubscription = modalRef.afterClose.subscribe(() => this.removeOpenModal(modalRef));

      this.registeredMetaMap.set(modalRef, { modalRef, afterOpenSubscription, afterCloseSubscription });
    }
  }

  // deregister modals
  deregisterModal(modalRef: NzModalRef): void {
    const registeredMeta = this.registeredMetaMap.get(modalRef);
    if (registeredMeta) {
      // Remove this modal if it is still in the opened modal list (NOTE: it may trigger "afterAllClose")
      this.removeOpenModal(registeredMeta.modalRef);
      registeredMeta.afterOpenSubscription.unsubscribe();
      registeredMeta.afterCloseSubscription.unsubscribe();
      this.registeredMetaMap.delete(modalRef);
    }
  }

  hasRegistered(modalRef: NzModalRef): boolean {
    return this.registeredMetaMap.has(modalRef);
  }

  // Close all registered opened modals
  closeAll(): void {
    let i = this.openModals.length;

    while (i--) {
      this.openModals[ i ].close();
    }
  }

  private removeOpenModal(modalRef: NzModalRef): void {
    const index = this.openModals.indexOf(modalRef);

    if (index > -1) {
      this.openModals.splice(index, 1);

      if (!this.openModals.length) {
        this.afterAllClose.next();
      }
    }
  }
}
