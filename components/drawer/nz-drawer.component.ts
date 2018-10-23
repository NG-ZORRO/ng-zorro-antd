import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
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
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortalOutlet, ComponentPortal, PortalInjector, TemplatePortal } from '@angular/cdk/portal';

import { Observable, Subject } from 'rxjs';

import { NzScrollStrategyOptions } from '../core/overlay/scroll/nz-scroll-strategy-options';
import { toCssPixel, InputBoolean } from '../core/util/convert';
import { NzDrawerOptions, NzDrawerPlacement } from './nz-drawer-options';
import { NzDrawerRef } from './nz-drawer-ref';

export const DRAWER_ANIMATE_DURATION = 300;

@Component({
  selector           : 'nz-drawer',
  templateUrl        : './nz-drawer.component.html',
  preserveWhitespaces: false,
  changeDetection    : ChangeDetectionStrategy.OnPush
})
// tslint:disable-next-line:no-any
export class NzDrawerComponent<T = any, R = any, D = any> extends NzDrawerRef<R> implements OnInit, OnDestroy, AfterViewInit, OnChanges, NzDrawerOptions {
  previouslyFocusedElement: HTMLElement;
  nzContentParams: D; // only service
  overlayRef: OverlayRef;
  portal: TemplatePortal;
  focusTrap: FocusTrap;
  isOpen = false;
  templateContext: { $implicit: D; drawerRef: NzDrawerRef<R> } = {
    $implicit: undefined,
    drawerRef: this as NzDrawerRef<R>
  };

  get offsetTransform(): string {
    if (!this.isOpen || (this.nzOffsetX + this.nzOffsetY) === 0) {
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

  get transform(): string {

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

  get width(): string {
    return this.isLeftOrRight ? toCssPixel(this.nzWidth) : null;
  }

  get height(): string {
    return !this.isLeftOrRight ? toCssPixel(this.nzHeight) : null;
  }

  get isLeftOrRight(): boolean {
    return this.nzPlacement === 'left' || this.nzPlacement === 'right';
  }

  @ViewChild('drawerTemplate') drawerTemplate: TemplateRef<{}>;
  @ViewChild('contentTemplate') contentTemplate: TemplateRef<{}>;
  @ViewChild(CdkPortalOutlet) bodyPortalOutlet: CdkPortalOutlet;
  @Input() nzContent: TemplateRef<{ $implicit: D, drawerRef: NzDrawerRef<R> }> | Type<T>;
  @Input() @InputBoolean() nzClosable = true;
  @Input() @InputBoolean() nzMaskClosable = true;
  @Input() @InputBoolean() nzMask = true;
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

  @Output() nzOnViewInit = new EventEmitter<void>();
  @Output() nzOnClose = new EventEmitter<MouseEvent>();
  nzAfterOpen = new Subject<void>();
  nzAfterClose = new Subject<R>();

  get afterOpen(): Observable<void> {
    return this.nzAfterOpen.asObservable();
  }

  get afterClose(): Observable<R> {
    return this.nzAfterClose.asObservable();
  }

  isNonEmptyString(value: {}): boolean {
    return typeof value === 'string' && value !== '';
  }

  isTemplateRef(value: {}): boolean {
    return value instanceof TemplateRef;
  }

  constructor(
    // tslint:disable-next-line:no-any
    @Optional() @Inject(DOCUMENT) private document: any,
    private renderer: Renderer2,
    private overlay: Overlay,
    private elementRef: ElementRef,
    private injector: Injector,
    private changeDetectorRef: ChangeDetectorRef,
    private focusTrapFactory: FocusTrapFactory,
    private nzScrollStrategyOptions: NzScrollStrategyOptions,
    private viewContainerRef: ViewContainerRef) {
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
      this.updateOverlayStyle();
      if (value) {
        this.updateBodyOverflow();
        this.savePreviouslyFocusedElement();
        this.trapFocus();
      } else {
        setTimeout(() => {
          this.updateBodyOverflow();
          this.restoreFocus();
        }, DRAWER_ANIMATE_DURATION);
      }
    }
  }

  ngOnDestroy(): void {
    this.disposeOverlay();
  }

  close(result?: R): void {
    this.isOpen = false;
    this.updateOverlayStyle();
    this.changeDetectorRef.detectChanges();
    setTimeout(() => {
      this.updateBodyOverflow();
      this.restoreFocus();
      this.nzAfterClose.next(result);
      this.nzAfterClose.complete();
    }, DRAWER_ANIMATE_DURATION);
  }

  open(): void {
    this.isOpen = true;
    this.updateOverlayStyle();
    this.updateBodyOverflow();
    this.savePreviouslyFocusedElement();
    this.trapFocus();
    this.changeDetectorRef.detectChanges();
    setTimeout(() => {
      this.nzAfterOpen.next();
    }, DRAWER_ANIMATE_DURATION);
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
      const childInjector = new PortalInjector(this.injector, new WeakMap([ [ NzDrawerRef, this ] ]));
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
    }
  }

  private disposeOverlay(): void {
    this.overlayRef.dispose();
    this.overlayRef = null;
  }

  private getOverlayConfig(): OverlayConfig {
    return new OverlayConfig({
      scrollStrategy: this.nzScrollStrategyOptions.block()
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
        this.overlayRef.getConfig().scrollStrategy.enable();
      } else {
        this.overlayRef.getConfig().scrollStrategy.disable();
      }
    }
  }

  savePreviouslyFocusedElement(): void {
    if (this.document) {
      this.previouslyFocusedElement = this.document.activeElement as HTMLElement;
      this.previouslyFocusedElement.blur();
    }
  }

  private trapFocus(): void {
    if (!this.focusTrap) {
      this.focusTrap = this.focusTrapFactory.create(this.overlayRef.overlayElement);
    }
    this.focusTrap.focusInitialElementWhenReady();
  }

  private restoreFocus(): void {
    if (this.previouslyFocusedElement) {
      this.previouslyFocusedElement.focus();
    }
    if (this.focusTrap) {
      this.focusTrap.destroy();
    }
  }
}
