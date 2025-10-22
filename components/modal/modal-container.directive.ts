/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { AnimationEvent } from '@angular/animations';
import { FocusTrap, FocusTrapFactory } from '@angular/cdk/a11y';
import { Direction } from '@angular/cdk/bidi';
import { OverlayRef } from '@angular/cdk/overlay';
import { BasePortalOutlet, CdkPortalOutlet, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import {
  ANIMATION_MODULE_TYPE,
  ChangeDetectorRef,
  ComponentRef,
  DestroyRef,
  Directive,
  DOCUMENT,
  ElementRef,
  EmbeddedViewRef,
  EventEmitter,
  inject,
  NgZone,
  Renderer2
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { NzConfigService, onConfigChangeEventForComponent } from 'ng-zorro-antd/core/config';
import { requestAnimationFrame } from 'ng-zorro-antd/core/polyfill';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { fromEventOutsideAngular, getElementOffset, isNotNil } from 'ng-zorro-antd/core/util';

import { FADE_CLASS_NAME_MAP, MODAL_MASK_CLASS_NAME, NZ_CONFIG_MODULE_NAME, ZOOM_CLASS_NAME_MAP } from './modal-config';
import { NzModalRef } from './modal-ref';
import { ModalOptions } from './modal-types';
import { getValueWithConfig } from './utils';

export function throwNzModalContentAlreadyAttachedError(): never {
  throw Error('Attempting to attach modal content after content is already attached');
}

@Directive()
export class BaseModalContainerComponent extends BasePortalOutlet {
  readonly document: Document = inject(DOCUMENT);
  readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  readonly config: ModalOptions = inject(ModalOptions);
  protected ngZone: NgZone = inject(NgZone);
  protected host: ElementRef<HTMLElement> = inject(ElementRef);
  protected focusTrapFactory: FocusTrapFactory = inject(FocusTrapFactory);
  protected render: Renderer2 = inject(Renderer2);
  protected overlayRef: OverlayRef = inject(OverlayRef);
  protected nzConfigService: NzConfigService = inject(NzConfigService);
  protected animationType = inject(ANIMATION_MODULE_TYPE, { optional: true });
  protected destroyRef = inject(DestroyRef);

  portalOutlet!: CdkPortalOutlet;
  modalElementRef!: ElementRef<HTMLDivElement>;

  animationStateChanged = new EventEmitter<AnimationEvent>();
  containerClick = new EventEmitter<void>();
  cancelTriggered = new EventEmitter<void>();
  okTriggered = new EventEmitter<void>();

  state: 'void' | 'enter' | 'exit' = 'enter';
  modalRef!: NzModalRef;
  isStringContent: boolean = false;
  dir: Direction = 'ltr';
  private elementFocusedBeforeModalWasOpened: HTMLElement | null = null;
  private focusTrap!: FocusTrap;
  private mouseDown = false;
  private oldMaskStyle: Record<string, string> | null = null;

  get showMask(): boolean {
    const defaultConfig: NzSafeAny = this.nzConfigService.getConfigForComponent(NZ_CONFIG_MODULE_NAME) || {};

    return !!getValueWithConfig<boolean>(this.config.nzMask, defaultConfig.nzMask, true);
  }

  get maskClosable(): boolean {
    const defaultConfig: NzSafeAny = this.nzConfigService.getConfigForComponent(NZ_CONFIG_MODULE_NAME) || {};

    return !!getValueWithConfig<boolean>(this.config.nzMaskClosable, defaultConfig.nzMaskClosable, true);
  }

  constructor() {
    super();
    this.dir = this.overlayRef.getDirection();
    this.isStringContent = typeof this.config.nzContent === 'string';

    onConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME, () => this.updateMaskClassname());

    this.destroyRef.onDestroy(() => {
      this.setMaskExitAnimationClass(true);
    });
  }

  onContainerClick(e: MouseEvent): void {
    if (e.target === e.currentTarget && !this.mouseDown && this.showMask && this.maskClosable) {
      this.containerClick.emit();
    }
  }

  onCloseClick(): void {
    this.cancelTriggered.emit();
  }

  onOkClick(): void {
    this.okTriggered.emit();
  }

  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    if (this.portalOutlet.hasAttached()) {
      throwNzModalContentAlreadyAttachedError();
    }
    this.savePreviouslyFocusedElement();
    this.setZIndexForBackdrop();
    return this.portalOutlet.attachComponentPortal(portal);
  }

  attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    if (this.portalOutlet.hasAttached()) {
      throwNzModalContentAlreadyAttachedError();
    }
    this.savePreviouslyFocusedElement();
    this.setZIndexForBackdrop();
    return this.portalOutlet.attachTemplatePortal(portal);
  }

  attachStringContent(): void {
    this.savePreviouslyFocusedElement();
    this.setZIndexForBackdrop();
  }

  getNativeElement(): HTMLElement {
    return this.host.nativeElement;
  }

  private animationDisabled(): boolean {
    return this.config.nzNoAnimation || this.animationType === 'NoopAnimations';
  }

  private setModalTransformOrigin(): void {
    const modalElement = this.modalElementRef.nativeElement;
    if (this.elementFocusedBeforeModalWasOpened as HTMLElement) {
      const previouslyDOMRect = this.elementFocusedBeforeModalWasOpened!.getBoundingClientRect();
      const lastPosition = getElementOffset(this.elementFocusedBeforeModalWasOpened!);
      const x = lastPosition.left + previouslyDOMRect.width / 2;
      const y = lastPosition.top + previouslyDOMRect.height / 2;
      const transformOrigin = `${x - modalElement.offsetLeft}px ${y - modalElement.offsetTop}px 0px`;
      this.render.setStyle(modalElement, 'transform-origin', transformOrigin);
    }
  }

  private savePreviouslyFocusedElement(): void {
    if (!this.focusTrap) {
      this.focusTrap = this.focusTrapFactory.create(this.host.nativeElement);
    }

    if (this.document) {
      this.elementFocusedBeforeModalWasOpened = this.document.activeElement as HTMLElement;
      if (this.host.nativeElement.focus) {
        this.ngZone.runOutsideAngular(() => requestAnimationFrame(() => this.host.nativeElement.focus()));
      }
    }
  }

  private trapFocus(): void {
    const element = this.host.nativeElement;

    if (this.config.nzAutofocus) {
      this.focusTrap.focusInitialElementWhenReady();
    } else {
      const activeElement = this.document.activeElement;
      if (activeElement !== element && !element.contains(activeElement)) {
        element.focus();
      }
    }
  }

  private restoreFocus(): void {
    const toFocus = this.elementFocusedBeforeModalWasOpened as HTMLElement;

    // We need the extra check, because IE can set the `activeElement` to null in some cases.
    if (toFocus && typeof toFocus.focus === 'function') {
      const activeElement = this.document.activeElement as Element;
      const element = this.host.nativeElement;

      if (
        !activeElement ||
        activeElement === this.document.body ||
        activeElement === element ||
        element.contains(activeElement)
      ) {
        toFocus.focus();
      }
    }

    if (this.focusTrap) {
      this.focusTrap.destroy();
    }
  }

  private setEnterAnimationClass(): void {
    if (this.animationDisabled()) {
      return;
    }
    // Make sure to set the `TransformOrigin` style before set the modelElement's class names
    this.setModalTransformOrigin();
    const modalElement = this.modalElementRef.nativeElement;
    const backdropElement = this.overlayRef.backdropElement;
    modalElement.classList.add(ZOOM_CLASS_NAME_MAP.enter);
    modalElement.classList.add(ZOOM_CLASS_NAME_MAP.enterActive);
    if (backdropElement) {
      backdropElement.classList.add(FADE_CLASS_NAME_MAP.enter);
      backdropElement.classList.add(FADE_CLASS_NAME_MAP.enterActive);
    }
  }

  private setExitAnimationClass(): void {
    const modalElement = this.modalElementRef.nativeElement;

    modalElement.classList.add(ZOOM_CLASS_NAME_MAP.leave);
    modalElement.classList.add(ZOOM_CLASS_NAME_MAP.leaveActive);

    this.setMaskExitAnimationClass();
  }

  private setMaskExitAnimationClass(force: boolean = false): void {
    const backdropElement = this.overlayRef.backdropElement;
    if (backdropElement) {
      if (this.animationDisabled() || force) {
        // https://github.com/angular/components/issues/18645
        backdropElement.classList.remove(MODAL_MASK_CLASS_NAME);
        return;
      }
      backdropElement.classList.add(FADE_CLASS_NAME_MAP.leave);
      backdropElement.classList.add(FADE_CLASS_NAME_MAP.leaveActive);
    }
  }

  private cleanAnimationClass(): void {
    if (this.animationDisabled()) {
      return;
    }
    const backdropElement = this.overlayRef.backdropElement;
    const modalElement = this.modalElementRef.nativeElement;
    if (backdropElement) {
      backdropElement.classList.remove(FADE_CLASS_NAME_MAP.enter);
      backdropElement.classList.remove(FADE_CLASS_NAME_MAP.enterActive);
    }
    modalElement.classList.remove(ZOOM_CLASS_NAME_MAP.enter);
    modalElement.classList.remove(ZOOM_CLASS_NAME_MAP.enterActive);
    modalElement.classList.remove(ZOOM_CLASS_NAME_MAP.leave);
    modalElement.classList.remove(ZOOM_CLASS_NAME_MAP.leaveActive);
  }

  private setZIndexForBackdrop(): void {
    const backdropElement = this.overlayRef.backdropElement;
    if (backdropElement) {
      if (isNotNil(this.config.nzZIndex)) {
        this.render.setStyle(backdropElement, 'z-index', this.config.nzZIndex);
      }
    }
  }

  bindBackdropStyle(): void {
    const backdropElement = this.overlayRef.backdropElement;
    if (backdropElement) {
      if (this.oldMaskStyle) {
        const styles = this.oldMaskStyle as Record<string, string>;
        Object.keys(styles).forEach(key => {
          this.render.removeStyle(backdropElement, key);
        });
        this.oldMaskStyle = null;
      }

      this.setZIndexForBackdrop();

      if (typeof this.config.nzMaskStyle === 'object' && Object.keys(this.config.nzMaskStyle).length) {
        const styles: Record<string, string> = { ...this.config.nzMaskStyle };
        Object.keys(styles).forEach(key => {
          this.render.setStyle(backdropElement, key, styles[key]);
        });
        this.oldMaskStyle = styles;
      }
    }
  }

  updateMaskClassname(): void {
    const backdropElement = this.overlayRef.backdropElement;
    if (backdropElement) {
      if (this.showMask) {
        backdropElement.classList.add(MODAL_MASK_CLASS_NAME);
      } else {
        backdropElement.classList.remove(MODAL_MASK_CLASS_NAME);
      }
    }
  }

  onAnimationDone(event: AnimationEvent): void {
    if (event.toState === 'enter') {
      this.trapFocus();
    } else if (event.toState === 'exit') {
      this.restoreFocus();
    }
    this.cleanAnimationClass();
    this.animationStateChanged.emit(event);
  }

  onAnimationStart(event: AnimationEvent): void {
    if (event.toState === 'enter') {
      this.setEnterAnimationClass();
      this.bindBackdropStyle();
    } else if (event.toState === 'exit') {
      this.setExitAnimationClass();
    }
    this.animationStateChanged.emit(event);
  }

  startExitAnimation(): void {
    this.state = 'exit';
    this.cdr.markForCheck();
  }

  protected setupMouseListeners(modalContainer: ElementRef<HTMLElement>): void {
    fromEventOutsideAngular(this.host.nativeElement, 'mouseup')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        if (this.mouseDown) {
          setTimeout(() => {
            this.mouseDown = false;
          });
        }
      });

    fromEventOutsideAngular(modalContainer.nativeElement, 'mousedown')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.mouseDown = true;
      });
  }
}
