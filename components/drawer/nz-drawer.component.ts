/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ESCAPE } from '@angular/cdk/keycodes';
import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { FocusTrap, FocusTrapFactory } from '@angular/cdk/a11y';
import { Overlay, OverlayConfig, OverlayKeyboardDispatcher, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortalOutlet, ComponentPortal, PortalInjector, TemplatePortal } from '@angular/cdk/portal';

import { Observable, Subject } from 'rxjs';

import { toCssPixel, InputBoolean, NzConfigService, WithConfig } from 'ng-zorro-antd/core';
import { takeUntil } from 'rxjs/operators';
import { NzDrawerOptionsOfComponent, NzDrawerPlacement } from './nz-drawer-options';
import { NzDrawerRef } from './nz-drawer-ref';

export const DRAWER_ANIMATE_DURATION = 300;

const NZ_CONFIG_COMPONENT_NAME = 'drawer';

@Component({
  selector: 'nz-drawer',
  exportAs: 'nzDrawer',
  templateUrl: './nz-drawer.component.html',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
// tslint:disable-next-line:no-any
export class NzDrawerComponent<T = any, R = any, D = any> extends NzDrawerRef<R>
  implements OnInit, OnDestroy, AfterViewInit, OnChanges, NzDrawerOptionsOfComponent {
  @Input() nzContent: TemplateRef<{ $implicit: D; drawerRef: NzDrawerRef<R> }> | Type<T>;
  @Input() @InputBoolean() nzClosable: boolean = true;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, true) @InputBoolean() nzMaskClosable: boolean;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, true) @InputBoolean() nzMask: boolean;
  @Input() @InputBoolean() nzNoAnimation = false;
  @Input() @InputBoolean() nzKeyboard: boolean = true;
  @Input() nzTitle: string | TemplateRef<{}>;
  @Input() nzPlacement: NzDrawerPlacement = 'right';
  @Input() nzMaskStyle: object = {};
  @Input() nzBodyStyle: object = {};
  @Input() nzWrapClassName: string;
  @Input() nzWidth: number | string = 256;
  @Input() nzHeight: number | string = 256;
  @Input() nzZIndex = 1000;
  @Input() nzOffsetX = 0;
  @Input() nzOffsetY = 0;

  @Input()
  set nzVisible(value: boolean) {
    this.isOpen = value;
  }

  get nzVisible(): boolean {
    return this.isOpen;
  }

  @Output() readonly nzOnViewInit = new EventEmitter<void>();
  @Output() readonly nzOnClose = new EventEmitter<MouseEvent>();

  @ViewChild('drawerTemplate', { static: true }) drawerTemplate: TemplateRef<void>;
  @ViewChild(CdkPortalOutlet, { static: false }) bodyPortalOutlet: CdkPortalOutlet;

  destroy$ = new Subject<void>();
  previouslyFocusedElement: HTMLElement;
  nzContentParams: D; // only service
  overlayRef: OverlayRef | null;
  portal: TemplatePortal;
  focusTrap: FocusTrap;
  isOpen = false;
  templateContext: { $implicit: D | undefined; drawerRef: NzDrawerRef<R> } = {
    $implicit: undefined,
    drawerRef: this as NzDrawerRef<R>
  };

  get offsetTransform(): string | null {
    if (!this.isOpen || this.nzOffsetX + this.nzOffsetY === 0) {
      return null;
    }
    switch (this.nzPlacement) {
      case 'left':
        return `translateX(${this.nzOffsetX}px)`;
      case 'right':
        return `translateX(-${this.nzOffsetX}px)`;
      case 'top':
        return `translateY(${this.nzOffsetY}px)`;
      case 'bottom':
        return `translateY(-${this.nzOffsetY}px)`;
    }
  }

  get transform(): string | null {
    if (this.isOpen) {
      return null;
    }

    switch (this.nzPlacement) {
      case 'left':
        return `translateX(-100%)`;
      case 'right':
        return `translateX(100%)`;
      case 'top':
        return `translateY(-100%)`;
      case 'bottom':
        return `translateY(100%)`;
    }
  }

  get width(): string | null {
    return this.isLeftOrRight ? toCssPixel(this.nzWidth) : null;
  }

  get height(): string | null {
    return !this.isLeftOrRight ? toCssPixel(this.nzHeight) : null;
  }

  get isLeftOrRight(): boolean {
    return this.nzPlacement === 'left' || this.nzPlacement === 'right';
  }

  nzAfterOpen = new Subject<void>();
  nzAfterClose = new Subject<R>();

  get afterOpen(): Observable<void> {
    return this.nzAfterOpen.asObservable();
  }

  get afterClose(): Observable<R> {
    return this.nzAfterClose.asObservable();
  }

  isTemplateRef(value: {}): boolean {
    return value instanceof TemplateRef;
  }

  constructor(
    // tslint:disable-next-line:no-any
    @Optional() @Inject(DOCUMENT) private document: any,
    public nzConfigService: NzConfigService,
    private renderer: Renderer2,
    private overlay: Overlay,
    private injector: Injector,
    private changeDetectorRef: ChangeDetectorRef,
    private focusTrapFactory: FocusTrapFactory,
    private viewContainerRef: ViewContainerRef,
    private overlayKeyboardDispatcher: OverlayKeyboardDispatcher
  ) {
    super();
  }

  ngOnInit(): void {
    this.attachOverlay();
    this.updateOverlayStyle();
    this.updateBodyOverflow();
    this.templateContext = { $implicit: this.nzContentParams, drawerRef: this as NzDrawerRef<R> };
    this.changeDetectorRef.detectChanges();
  }

  ngAfterViewInit(): void {
    this.attachBodyContent();
    setTimeout(() => {
      this.nzOnViewInit.emit();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('nzVisible')) {
      const value = changes.nzVisible.currentValue;
      if (value) {
        this.open();
      } else {
        this.close();
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.disposeOverlay();
  }

  private getAnimationDuration(): number {
    return this.nzNoAnimation ? 0 : DRAWER_ANIMATE_DURATION;
  }

  close(result?: R): void {
    this.isOpen = false;
    this.updateOverlayStyle();
    this.overlayKeyboardDispatcher.remove(this.overlayRef!);
    this.changeDetectorRef.detectChanges();
    setTimeout(() => {
      this.updateBodyOverflow();
      this.restoreFocus();
      this.nzAfterClose.next(result);
      this.nzAfterClose.complete();
    }, this.getAnimationDuration());
  }

  open(): void {
    this.isOpen = true;
    this.overlayKeyboardDispatcher.add(this.overlayRef!);
    this.updateOverlayStyle();
    this.updateBodyOverflow();
    this.savePreviouslyFocusedElement();
    this.trapFocus();
    this.changeDetectorRef.detectChanges();
    setTimeout(() => {
      this.nzAfterOpen.next();
    }, this.getAnimationDuration());
  }

  closeClick(): void {
    this.nzOnClose.emit();
  }

  maskClick(): void {
    if (this.nzMaskClosable && this.nzMask) {
      this.nzOnClose.emit();
    }
  }

  private attachBodyContent(): void {
    this.bodyPortalOutlet.dispose();

    if (this.nzContent instanceof Type) {
      const childInjector = new PortalInjector(this.injector, new WeakMap([[NzDrawerRef, this]]));
      const componentPortal = new ComponentPortal<T>(this.nzContent, null, childInjector);
      const componentRef = this.bodyPortalOutlet.attachComponentPortal(componentPortal);
      Object.assign(componentRef.instance, this.nzContentParams);
      componentRef.changeDetectorRef.detectChanges();
    }
  }

  private attachOverlay(): void {
    if (!this.overlayRef) {
      this.portal = new TemplatePortal(this.drawerTemplate, this.viewContainerRef);
      this.overlayRef = this.overlay.create(this.getOverlayConfig());
    }

    if (this.overlayRef && !this.overlayRef.hasAttached()) {
      this.overlayRef.attach(this.portal);
      this.overlayRef!.keydownEvents()
        .pipe(takeUntil(this.destroy$))
        .subscribe((event: KeyboardEvent) => {
          if (event.keyCode === ESCAPE && this.isOpen && this.nzKeyboard) {
            this.nzOnClose.emit();
          }
        });
    }
  }

  private disposeOverlay(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
    this.overlayRef = null;
  }

  private getOverlayConfig(): OverlayConfig {
    return new OverlayConfig({
      positionStrategy: this.overlay.position().global(),
      scrollStrategy: this.overlay.scrollStrategies.block()
    });
  }

  private updateOverlayStyle(): void {
    if (this.overlayRef && this.overlayRef.overlayElement) {
      this.renderer.setStyle(this.overlayRef.overlayElement, 'pointer-events', this.isOpen ? 'auto' : 'none');
    }
  }

  private updateBodyOverflow(): void {
    if (this.overlayRef) {
      if (this.isOpen) {
        this.overlayRef.getConfig().scrollStrategy!.enable();
      } else {
        this.overlayRef.getConfig().scrollStrategy!.disable();
      }
    }
  }

  savePreviouslyFocusedElement(): void {
    if (this.document && !this.previouslyFocusedElement) {
      this.previouslyFocusedElement = this.document.activeElement as HTMLElement;
      // We need the extra check, because IE's svg element has no blur method.
      if (this.previouslyFocusedElement && typeof this.previouslyFocusedElement.blur === 'function') {
        this.previouslyFocusedElement.blur();
      }
    }
  }

  private trapFocus(): void {
    if (!this.focusTrap && this.overlayRef && this.overlayRef.overlayElement) {
      this.focusTrap = this.focusTrapFactory.create(this.overlayRef!.overlayElement);
      this.focusTrap.focusInitialElement();
    }
  }

  private restoreFocus(): void {
    // We need the extra check, because IE can set the `activeElement` to null in some cases.
    if (this.previouslyFocusedElement && typeof this.previouslyFocusedElement.focus === 'function') {
      this.previouslyFocusedElement.focus();
    }
    if (this.focusTrap) {
      this.focusTrap.destroy();
    }
  }
}
