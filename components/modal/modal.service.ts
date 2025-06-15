/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directionality } from '@angular/cdk/bidi';
import { ComponentType, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { Injectable, Injector, OnDestroy, TemplateRef, inject } from '@angular/core';
import { Observable, Subject, defer } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { NzConfigService } from 'ng-zorro-antd/core/config';
import { warn } from 'ng-zorro-antd/core/logger';
import { overlayZIndexSetter } from 'ng-zorro-antd/core/overlay';
import { IndexableObject, NzSafeAny } from 'ng-zorro-antd/core/types';
import { isNotNil } from 'ng-zorro-antd/core/util';

import { MODAL_MASK_CLASS_NAME, NZ_CONFIG_MODULE_NAME, NZ_MODAL_DATA } from './modal-config';
import { NzModalConfirmContainerComponent } from './modal-confirm-container.component';
import { NzModalContainerComponent } from './modal-container.component';
import { BaseModalContainerComponent } from './modal-container.directive';
import { NzModalRef } from './modal-ref';
import { ConfirmType, ModalOptions } from './modal-types';
import { applyConfigDefaults, getValueWithConfig } from './utils';

type ContentType<T> = ComponentType<T> | TemplateRef<T> | string;

@Injectable()
export class NzModalService implements OnDestroy {
  private overlay = inject(Overlay);
  private injector = inject(Injector);
  private nzConfigService = inject(NzConfigService);
  private directionality = inject(Directionality);
  private parentModal = inject(NzModalService, { skipSelf: true, optional: true });

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

  create<T, D = NzSafeAny, R = NzSafeAny>(config: ModalOptions<T, D, R>): NzModalRef<T, R> {
    return this.open<T, D, R>(config.nzContent as ComponentType<T>, config);
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

  private open<T, D, R>(componentOrTemplateRef: ContentType<T>, config?: ModalOptions<T, D, R>): NzModalRef<T, R> {
    const configMerged = applyConfigDefaults(config || {}, new ModalOptions());
    const overlayRef = this.createOverlay(configMerged);
    const modalContainer = this.attachModalContainer(overlayRef, configMerged);
    const modalRef = this.attachModalContent<T, D, R>(componentOrTemplateRef, modalContainer, overlayRef, configMerged);
    modalContainer.modalRef = modalRef;

    overlayZIndexSetter(overlayRef, config?.nzZIndex);

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
    const globalConfig: NzSafeAny = this.nzConfigService.getConfigForComponent(NZ_CONFIG_MODULE_NAME) || {};
    const overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      backdropClass: getValueWithConfig(config.nzMask, globalConfig.nzMask, true) ? MODAL_MASK_CLASS_NAME : '',
      positionStrategy: this.overlay.position().global(),
      disposeOnNavigation: getValueWithConfig(config.nzCloseOnNavigation, globalConfig.nzCloseOnNavigation, true),
      direction: getValueWithConfig(config.nzDirection, globalConfig.nzDirection, this.directionality.value)
    });

    return this.overlay.create(overlayConfig);
  }

  private attachModalContainer(overlayRef: OverlayRef, config: ModalOptions): BaseModalContainerComponent {
    const userInjector = config && config.nzViewContainerRef && config.nzViewContainerRef.injector;
    const injector = Injector.create({
      parent: userInjector || this.injector,
      providers: [
        { provide: OverlayRef, useValue: overlayRef },
        { provide: ModalOptions, useValue: config }
      ]
    });

    const ContainerComponent =
      config.nzModalType === 'confirm'
        ? // If the mode is `confirm`, use `NzModalConfirmContainerComponent`
          NzModalConfirmContainerComponent
        : // If the mode is not `confirm`, use `NzModalContainerComponent`
          NzModalContainerComponent;

    const containerPortal = new ComponentPortal<BaseModalContainerComponent>(
      ContainerComponent,
      config.nzViewContainerRef,
      injector
    );
    const containerRef = overlayRef.attach<BaseModalContainerComponent>(containerPortal);

    return containerRef.instance;
  }

  private attachModalContent<T, D, R>(
    componentOrTemplateRef: ContentType<T>,
    modalContainer: BaseModalContainerComponent,
    overlayRef: OverlayRef,
    config: ModalOptions<T>
  ): NzModalRef<T, R> {
    const modalRef = new NzModalRef<T, R>(overlayRef, config, modalContainer);

    if (componentOrTemplateRef instanceof TemplateRef) {
      modalContainer.attachTemplatePortal(
        new TemplatePortal<T>(componentOrTemplateRef, null!, {
          $implicit: config.nzData,
          modalRef
        } as NzSafeAny)
      );
    } else if (isNotNil(componentOrTemplateRef) && typeof componentOrTemplateRef !== 'string') {
      const injector = this.createInjector<T, D, R>(modalRef, config);
      const contentRef = modalContainer.attachComponentPortal<T>(
        new ComponentPortal(componentOrTemplateRef, config.nzViewContainerRef, injector)
      );
      modalRef.componentRef = contentRef;
      modalRef.componentInstance = contentRef.instance;
    } else {
      modalContainer.attachStringContent();
    }
    return modalRef;
  }

  private createInjector<T, D, R>(modalRef: NzModalRef<T, R>, config: ModalOptions<T, D, R>): Injector {
    const userInjector = config && config.nzViewContainerRef && config.nzViewContainerRef.injector;

    return Injector.create({
      parent: userInjector || this.injector,
      providers: [
        { provide: NzModalRef, useValue: modalRef },
        { provide: NZ_MODAL_DATA, useValue: config.nzData }
      ]
    });
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
