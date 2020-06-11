/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ComponentType, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector, TemplatePortal } from '@angular/cdk/portal';
import { Injectable, Injector, OnDestroy, Optional, SkipSelf, TemplateRef } from '@angular/core';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { warn } from 'ng-zorro-antd/core/logger';
import { IndexableObject, NzSafeAny } from 'ng-zorro-antd/core/types';
import { isNotNil } from 'ng-zorro-antd/core/util';
import { defer, Observable, Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { MODAL_MASK_CLASS_NAME, NZ_CONFIG_COMPONENT_NAME } from './modal-config';
import { NzModalConfirmContainerComponent } from './modal-confirm-container.component';
import { BaseModalContainer } from './modal-container';
import { NzModalContainerComponent } from './modal-container.component';
import { NzModalRef } from './modal-ref';
import { ConfirmType, ModalOptions } from './modal-types';
import { applyConfigDefaults, getValueWithConfig, setContentInstanceParams } from './utils';

type ContentType<T> = ComponentType<T> | TemplateRef<T> | string;

@Injectable()
export class NzModalService implements OnDestroy {
  private openModalsAtThisLevel: NzModalRef[] = [];
  private readonly afterAllClosedAtThisLevel = new Subject<void>();

  get openModals(): NzModalRef[] {
    return this.parentModal ? this.parentModal.openModals : this.openModalsAtThisLevel;
  }

  get _afterAllClosed(): Subject<void> {
    const parent = this.parentModal;
    return parent ? parent._afterAllClosed : this.afterAllClosedAtThisLevel;
  }

  readonly afterAllClose: Observable<void> = defer(() =>
    this.openModals.length ? this._afterAllClosed : this._afterAllClosed.pipe(startWith(undefined))
  ) as Observable<void>;

  constructor(
    private overlay: Overlay,
    private injector: Injector,
    private nzConfigService: NzConfigService,
    @Optional() @SkipSelf() private parentModal: NzModalService
  ) {}

  create<T, R = NzSafeAny>(config: ModalOptions<T, R>): NzModalRef<T, R> {
    return this.open<T, R>(config.nzContent as ComponentType<T>, config);
  }

  closeAll(): void {
    this.closeModals(this.openModals);
  }

  confirm<T>(options: ModalOptions<T> = {}, confirmType: ConfirmType = 'confirm'): NzModalRef<T> {
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

  info<T>(options: ModalOptions<T> = {}): NzModalRef<T> {
    return this.confirmFactory(options, 'info');
  }

  success<T>(options: ModalOptions<T> = {}): NzModalRef<T> {
    return this.confirmFactory(options, 'success');
  }

  error<T>(options: ModalOptions<T> = {}): NzModalRef<T> {
    return this.confirmFactory(options, 'error');
  }

  warning<T>(options: ModalOptions<T> = {}): NzModalRef<T> {
    return this.confirmFactory(options, 'warning');
  }

  private open<T, R>(componentOrTemplateRef: ContentType<T>, config?: ModalOptions): NzModalRef<T, R> {
    const configMerged = applyConfigDefaults(config || {}, new ModalOptions());
    const overlayRef = this.createOverlay(configMerged);
    const modalContainer = this.attachModalContainer(overlayRef, configMerged);
    const modalRef = this.attachModalContent<T, R>(componentOrTemplateRef, modalContainer, overlayRef, configMerged);
    modalContainer.modalRef = modalRef;

    this.openModals.push(modalRef);
    modalRef.afterClose.subscribe(() => this.removeOpenModal(modalRef));

    return modalRef;
  }

  private removeOpenModal(modalRef: NzModalRef): void {
    const index = this.openModals.indexOf(modalRef);
    if (index > -1) {
      this.openModals.splice(index, 1);

      if (!this.openModals.length) {
        this._afterAllClosed.next();
      }
    }
  }

  private closeModals(dialogs: NzModalRef[]): void {
    let i = dialogs.length;
    while (i--) {
      dialogs[i].close();
      if (!this.openModals.length) {
        this._afterAllClosed.next();
      }
    }
  }

  private createOverlay(config: ModalOptions): OverlayRef {
    const globalConfig = this.nzConfigService.getConfigForComponent(NZ_CONFIG_COMPONENT_NAME) || {};
    const overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy: this.overlay.position().global(),
      disposeOnNavigation: getValueWithConfig(config.nzCloseOnNavigation, globalConfig.nzCloseOnNavigation, true)
    });

    if (getValueWithConfig(config.nzMask, globalConfig.nzMask, true)) {
      overlayConfig.backdropClass = MODAL_MASK_CLASS_NAME;
    }

    return this.overlay.create(overlayConfig);
  }

  private attachModalContainer(overlayRef: OverlayRef, config: ModalOptions): BaseModalContainer {
    const userInjector = config && config.nzViewContainerRef && config.nzViewContainerRef.injector;
    const injector = new PortalInjector(
      userInjector || this.injector,
      new WeakMap<NzSafeAny, NzSafeAny>([
        [OverlayRef, overlayRef],
        [ModalOptions, config]
      ])
    );

    const ContainerComponent =
      config.nzModalType === 'confirm'
        ? // If the mode is `confirm`, use `NzModalConfirmContainerComponent`
          NzModalConfirmContainerComponent
        : // If the mode is not `confirm`, use `NzModalContainerComponent`
          NzModalContainerComponent;

    const containerPortal = new ComponentPortal<BaseModalContainer>(ContainerComponent, config.nzViewContainerRef, injector);
    const containerRef = overlayRef.attach<BaseModalContainer>(containerPortal);

    return containerRef.instance;
  }

  private attachModalContent<T, R>(
    componentOrTemplateRef: ContentType<T>,
    modalContainer: BaseModalContainer,
    overlayRef: OverlayRef,
    config: ModalOptions<T>
  ): NzModalRef<T, R> {
    const modalRef = new NzModalRef<T, R>(overlayRef, config, modalContainer);

    if (componentOrTemplateRef instanceof TemplateRef) {
      modalContainer.attachTemplatePortal(
        new TemplatePortal<T>(componentOrTemplateRef, null!, { $implicit: config.nzComponentParams, modalRef } as NzSafeAny)
      );
    } else if (isNotNil(componentOrTemplateRef) && typeof componentOrTemplateRef !== 'string') {
      const injector = this.createInjector<T, R>(modalRef, config);
      const contentRef = modalContainer.attachComponentPortal<T>(
        new ComponentPortal(componentOrTemplateRef, config.nzViewContainerRef, injector)
      );
      setContentInstanceParams<T>(contentRef.instance, config.nzComponentParams);
      modalRef.componentInstance = contentRef.instance;
    }
    return modalRef;
  }

  private createInjector<T, R>(modalRef: NzModalRef<T, R>, config: ModalOptions<T>): PortalInjector {
    const userInjector = config && config.nzViewContainerRef && config.nzViewContainerRef.injector;
    const injectionTokens = new WeakMap<NzSafeAny, NzSafeAny>([[NzModalRef, modalRef]]);

    return new PortalInjector(userInjector || this.injector, injectionTokens);
  }

  private confirmFactory<T>(options: ModalOptions<T> = {}, confirmType: ConfirmType): NzModalRef<T> {
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
