/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { AnimationEvent } from '@angular/animations';
import { FocusTrap, FocusTrapFactory } from '@angular/cdk/a11y';
import { OverlayRef } from '@angular/cdk/overlay';
import { BasePortalOutlet, CdkPortalOutlet, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectorRef, ComponentRef, ElementRef, EmbeddedViewRef, EventEmitter, NgZone, OnDestroy, Renderer2 } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { getElementOffset } from 'ng-zorro-antd/core/util';
import { FADE_CLASS_NAME_MAP, MODAL_MASK_CLASS_NAME, ZOOM_CLASS_NAME_MAP } from './modal-config';

import { NzModalRef } from './modal-ref';
import { ModalOptions } from './modal-types';

export function throwNzModalContentAlreadyAttachedError(): never {
  throw Error('Attempting to attach modal content after content is already attached');
}

export class BaseModalContainer extends BasePortalOutlet implements OnDestroy {
  portalOutlet!: CdkPortalOutlet;
  modalElementRef!: ElementRef<HTMLDivElement>;

  animationStateChanged = new EventEmitter<AnimationEvent>();
  containerClick = new EventEmitter<void>();
  cancelTriggered = new EventEmitter<void>();
  okTriggered = new EventEmitter<void>();
  onDestroy = new EventEmitter<void>();

  state: 'void' | 'enter' | 'exit' = 'enter';
  document: Document;
  modalRef!: NzModalRef;
  isStringContent: boolean = false;
  private elementFocusedBeforeModalWasOpened: HTMLElement | null = null;
  private focusTrap!: FocusTrap;
  private latestMousedownTarget: HTMLElement | null = null;
  private oldMaskStyle: { [key: string]: string } | null = null;

  constructor(
    protected elementRef: ElementRef,
    protected focusTrapFactory: FocusTrapFactory,
    public cdr: ChangeDetectorRef,
    protected render: Renderer2,
    protected zone: NgZone,
    protected overlayRef: OverlayRef,
    public config: ModalOptions,
    document?: NzSafeAny,
    protected animationType?: string
  ) {
    super();
    this.document = document;
    this.isStringContent = typeof config.nzContent === 'string';
    this.setContainer();
  }

  ngOnDestroy(): void {
    this.onDestroy.emit();
  }

  onMousedown(e: MouseEvent): void {
    this.latestMousedownTarget = (e.target as HTMLElement) || null;
  }

  onMouseup(e: MouseEvent): void {
    if (e.target === this.latestMousedownTarget && e.target === this.elementRef.nativeElement) {
      this.containerClick.emit();
    }
    this.latestMousedownTarget = null;
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
    this.setModalTransformOrigin();
    return this.portalOutlet.attachComponentPortal(portal);
  }

  attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    if (this.portalOutlet.hasAttached()) {
      throwNzModalContentAlreadyAttachedError();
    }
    this.savePreviouslyFocusedElement();
    return this.portalOutlet.attachTemplatePortal(portal);
  }

  getNativeElement(): HTMLElement {
    return this.elementRef.nativeElement;
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
    if (this.document) {
      this.elementFocusedBeforeModalWasOpened = this.document.activeElement as HTMLElement;
      if (this.elementRef.nativeElement.focus) {
        Promise.resolve().then(() => this.elementRef.nativeElement.focus());
      }
    }
  }

  private trapFocus(): void {
    const element = this.elementRef.nativeElement;

    if (!this.focusTrap) {
      this.focusTrap = this.focusTrapFactory.create(element);
    }

    if (this.config.nzAutofocus) {
      this.focusTrap.focusInitialElementWhenReady().then();
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
      const element = this.elementRef.nativeElement;

      if (!activeElement || activeElement === this.document.body || activeElement === element || element.contains(activeElement)) {
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
    this.zone.runOutsideAngular(() => {
      // Make sure to set the `TransformOrigin` style before set the modelElement's class names
      this.setModalTransformOrigin();
      const modalElement = this.modalElementRef.nativeElement;
      const backdropElement = this.overlayRef.backdropElement;
      this.render.addClass(modalElement, ZOOM_CLASS_NAME_MAP.enter);
      this.render.addClass(modalElement, ZOOM_CLASS_NAME_MAP.enterActive);
      this.render.addClass(backdropElement, FADE_CLASS_NAME_MAP.enter);
      this.render.addClass(backdropElement, FADE_CLASS_NAME_MAP.enterActive);
    });
  }

  private setExitAnimationClass(): void {
    this.zone.runOutsideAngular(() => {
      const modalElement = this.modalElementRef.nativeElement;
      const backdropElement = this.overlayRef.backdropElement;

      if (this.animationDisabled()) {
        // https://github.com/angular/components/issues/18645
        this.render.removeClass(backdropElement, MODAL_MASK_CLASS_NAME);
        return;
      }

      this.render.addClass(modalElement, ZOOM_CLASS_NAME_MAP.leave);
      this.render.addClass(modalElement, ZOOM_CLASS_NAME_MAP.leaveActive);
      this.render.addClass(backdropElement, FADE_CLASS_NAME_MAP.leave);
      this.render.addClass(backdropElement, FADE_CLASS_NAME_MAP.leaveActive);
    });
  }

  private cleanAnimationClass(): void {
    if (this.animationDisabled()) {
      return;
    }
    this.zone.runOutsideAngular(() => {
      const backdropElement = this.overlayRef.backdropElement;
      const modalElement = this.modalElementRef.nativeElement;
      this.render.removeClass(modalElement, ZOOM_CLASS_NAME_MAP.enter);
      this.render.removeClass(modalElement, ZOOM_CLASS_NAME_MAP.enterActive);
      this.render.removeClass(modalElement, ZOOM_CLASS_NAME_MAP.leave);
      this.render.removeClass(modalElement, ZOOM_CLASS_NAME_MAP.leaveActive);
      this.render.removeClass(backdropElement, FADE_CLASS_NAME_MAP.enter);
      this.render.removeClass(backdropElement, FADE_CLASS_NAME_MAP.enterActive);
    });
  }

  private bindBackdropStyle(): void {
    this.zone.runOutsideAngular(() => {
      if (this.oldMaskStyle) {
        const backdropElement = this.overlayRef.backdropElement;
        const styles = this.oldMaskStyle as { [key: string]: string };
        Object.keys(styles).forEach(key => {
          this.render.removeStyle(backdropElement, key);
        });
        this.oldMaskStyle = null;
      }

      if (typeof this.config.nzMaskStyle === 'object' && Object.keys(this.config.nzMaskStyle).length) {
        const backdropElement = this.overlayRef.backdropElement;
        const styles: { [key: string]: string } = { ...this.config.nzMaskStyle };
        Object.keys(styles).forEach(key => {
          this.render.setStyle(backdropElement, key, styles[key]);
        });
        this.oldMaskStyle = styles;
      }
    });
  }

  /**
   * Set the container element.
   * @deprecated Not supported.
   * @breaking-change 10.0.0
   */
  private setContainer(): void {
    const container = this.getContainer();
    if (container) {
      this.render.appendChild(container, this.elementRef.nativeElement);
    }
  }

  /**
   * Reset the container element.
   * @deprecated Not supported.
   * @breaking-change 10.0.0
   */
  private resetContainer(): void {
    const container = this.getContainer();
    if (container) {
      this.render.appendChild(this.overlayRef.overlayElement, this.elementRef.nativeElement);
    }
  }

  private getContainer(): HTMLElement | null {
    const { nzGetContainer } = this.config;
    const container = typeof nzGetContainer === 'function' ? nzGetContainer() : nzGetContainer;
    return container instanceof HTMLElement ? container : null;
  }

  onAnimationDone(event: AnimationEvent): void {
    if (event.toState === 'void') {
      return;
    }
    if (event.toState === 'enter') {
      this.setContainer();
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
      this.resetContainer();
      this.setExitAnimationClass();
    }
    this.animationStateChanged.emit(event);
  }

  startExitAnimation(): void {
    this.state = 'exit';
    this.cdr.markForCheck();
  }
}
