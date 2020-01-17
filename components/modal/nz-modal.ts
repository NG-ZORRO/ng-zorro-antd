/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ComponentType, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector, TemplatePortal } from '@angular/cdk/portal';
import { Injectable, Injector, OnDestroy, Optional, SkipSelf, TemplateRef } from '@angular/core';
import { IndexableObject, warn } from 'ng-zorro-antd/core';
import { NzModalConfirmContainerComponent } from 'ng-zorro-antd/modal/modal-confirm-container.component';
import { applyConfigDefaults, setContentInstanceParams } from 'ng-zorro-antd/modal/utils';
import { defer, Observable, Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { NzModalContainerComponent } from './modal-container.component';
import { NzModalRef2 } from './nz-modal-ref';
import { NzModalServiceModule } from './nz-modal.service.module';
import { ConfirmType, ModalConfig } from './nz-modal.type';

const MODAL_MASK_CLASS_NAME = 'ant-modal-mask';
type ContentType<T> = ComponentType<T> | TemplateRef<T> | string;

@Injectable({
  providedIn: NzModalServiceModule
})
export class NzModal implements OnDestroy {
  private openModalsAtThisLevel: NzModalRef2[] = [];
  private readonly afterAllClosedAtThisLevel = new Subject<void>();

  get openModals(): NzModalRef2[] {
    return this.parentModal ? this.parentModal.openModals : this.openModalsAtThisLevel;
  }

  get _afterAllClosed(): Subject<void> {
    const parent = this.parentModal;
    return parent ? parent._afterAllClosed : this.afterAllClosedAtThisLevel;
  }

  readonly afterAllClose: Observable<void> = defer(() =>
    this.openModals.length ? this._afterAllClosed : this._afterAllClosed.pipe(startWith(undefined))
  ) as Observable<void>;

  constructor(private overlay: Overlay, private injector: Injector, @Optional() @SkipSelf() private parentModal: NzModal) {}

  // tslint:disable-next-line:no-any
  create<T, R = any>(config: ModalConfig<T, R>): NzModalRef2<T, R> {
    return this.open<T, R>(config.nzContent as ComponentType<T>, config);
  }

  open<T, R>(componentOrTemplateRef: ContentType<T>, config?: ModalConfig): NzModalRef2<T, R> {
    const configMerged = applyConfigDefaults(config || {}, new ModalConfig());
    const overlayRef = this.createOverlay(configMerged);
    const modalContainer = this.attachModalContainer(overlayRef, configMerged);
    const modalRef = this.attachModalContent<T, R>(componentOrTemplateRef, modalContainer, overlayRef, configMerged);
    modalContainer.modalRef = modalRef;

    this.openModals.push(modalRef);
    modalRef.afterClose.subscribe(() => this.removeOpenModal(modalRef));

    return modalRef;
  }

  closeAll(): void {
    this.closeModals(this.openModals);
  }

  confirm<T>(options: ModalConfig<T> = {}, confirmType: ConfirmType = 'confirm'): NzModalRef2<T> {
    if ('nzFooter' in options) {
      warn(`The Confirm-Modal doesn't support "nzFooter", this property will be ignored.`);
    }
    if (!('nzWidth' in options)) {
      options.nzWidth = 416;
    }
    if (!('nzMaskClosable' in options)) {
      options.nzMaskClosable = false;
    }

    options.nzModalType = 'confirm';
    options.nzClassName = `ant-modal-confirm ant-modal-confirm-${confirmType} ${options.nzClassName || ''}`;
    return this.create(options);
  }

  info<T>(options: ModalConfig<T> = {}): NzModalRef2<T> {
    return this.confirmFactory(options, 'info');
  }

  success<T>(options: ModalConfig<T> = {}): NzModalRef2<T> {
    return this.confirmFactory(options, 'success');
  }

  error<T>(options: ModalConfig<T> = {}): NzModalRef2<T> {
    return this.confirmFactory(options, 'error');
  }

  warning<T>(options: ModalConfig<T> = {}): NzModalRef2<T> {
    return this.confirmFactory(options, 'warning');
  }

  private removeOpenModal(modalRef: NzModalRef2): void {
    const index = this.openModals.indexOf(modalRef);
    if (index > -1) {
      this.openModals.splice(index);
    }
  }

  private closeModals(dialogs: NzModalRef2[]): void {
    let i = dialogs.length;
    while (i--) {
      dialogs[i].close();
      if (!this.openModals.length) {
        this._afterAllClosed.next();
      }
    }
  }

  private createOverlay(config: ModalConfig): OverlayRef {
    const overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy: this.overlay.position().global()
    });

    if (config.nzMask) {
      overlayConfig.backdropClass = MODAL_MASK_CLASS_NAME;
    }

    return this.overlay.create(overlayConfig);
  }

  private attachModalContainer(overlayRef: OverlayRef, config: ModalConfig): NzModalContainerComponent {
    const injector = new PortalInjector(
      this.injector,
      // tslint:disable-next-line:no-any
      new WeakMap<any, any>([
        [OverlayRef, overlayRef],
        [ModalConfig, config]
      ])
    );

    const containerPortal = new ComponentPortal(
      config.nzModalType === 'confirm'
        ? // If the mode is `confirm`, use `NzModalConfirmContainerComponent`
          NzModalConfirmContainerComponent
        : // If the mode is not `confirm`, use `NzModalContainerComponent`
          NzModalContainerComponent,
      undefined,
      injector
    );
    const containerRef = overlayRef.attach<NzModalContainerComponent>(containerPortal);

    return containerRef.instance;
  }

  private attachModalContent<T, R>(
    componentOrTemplateRef: ContentType<T>,
    modalContainer: NzModalContainerComponent,
    overlayRef: OverlayRef,
    config: ModalConfig<T>
  ): NzModalRef2<T, R> {
    const modalRef = new NzModalRef2<T, R>(overlayRef, config, modalContainer);

    if (componentOrTemplateRef instanceof TemplateRef) {
      modalContainer.attachTemplatePortal(
        // tslint:disable-next-line:no-any
        new TemplatePortal<T>(componentOrTemplateRef, null!, { $implicit: modalRef } as any)
      );
    } else if (typeof componentOrTemplateRef !== 'string') {
      const injector = this.createInjector<T, R>(modalRef, modalContainer);
      const contentRef = modalContainer.attachComponentPortal<T>(new ComponentPortal(componentOrTemplateRef, undefined, injector));
      setContentInstanceParams<T>(contentRef.instance, config.nzComponentParams);
      modalRef.componentInstance = contentRef.instance;
    }
    modalRef.updateSize('520px').updatePosition();
    return modalRef;
  }

  private createInjector<T, R>(modalRef: NzModalRef2<T, R>, modalContainer: NzModalContainerComponent): PortalInjector {
    // tslint:disable-next-line:no-any
    const injectionTokens = new WeakMap<any, any>([
      [NzModalContainerComponent, modalContainer],
      [NzModalRef2, modalRef]
    ]);

    return new PortalInjector(this.injector, injectionTokens);
  }

  private confirmFactory<T>(options: ModalConfig<T> = {}, confirmType: ConfirmType): NzModalRef2<T> {
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

  ngOnDestroy(): void {
    this.closeModals(this.openModalsAtThisLevel);
    this.afterAllClosedAtThisLevel.complete();
  }
}
