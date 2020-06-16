/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ConfigurableFocusTrapFactory, FocusTrap } from '@angular/cdk/a11y';
import { ESCAPE } from '@angular/cdk/keycodes';
import { Overlay, OverlayConfig, OverlayKeyboardDispatcher, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortalOutlet, ComponentPortal, PortalInjector, TemplatePortal } from '@angular/cdk/portal';
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
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { BooleanInput, NgStyleInterface, NzSafeAny } from 'ng-zorro-antd/core/types';
import { InputBoolean, toCssPixel } from 'ng-zorro-antd/core/util';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzDrawerOptionsOfComponent, NzDrawerPlacement } from './drawer-options';
import { NzDrawerRef } from './drawer-ref';

export const DRAWER_ANIMATE_DURATION = 300;

const NZ_CONFIG_COMPONENT_NAME = 'drawer';

@Component({
  selector: 'nz-drawer',
  exportAs: 'nzDrawer',
  template: `
    <ng-template #drawerTemplate>
      <div
        class="ant-drawer"
        [nzNoAnimation]="nzNoAnimation"
        [class.ant-drawer-open]="isOpen"
        [class.no-mask]="!nzMask"
        [class.ant-drawer-top]="nzPlacement === 'top'"
        [class.ant-drawer-bottom]="nzPlacement === 'bottom'"
        [class.ant-drawer-right]="nzPlacement === 'right'"
        [class.ant-drawer-left]="nzPlacement === 'left'"
        [style.transform]="offsetTransform"
        [style.transition]="placementChanging ? 'none' : null"
        [style.zIndex]="nzZIndex"
      >
        <div class="ant-drawer-mask" (click)="maskClick()" *ngIf="nzMask" [ngStyle]="nzMaskStyle"></div>
        <div
          class="ant-drawer-content-wrapper {{ nzWrapClassName }}"
          [style.width]="width"
          [style.height]="height"
          [style.transform]="transform"
          [style.transition]="placementChanging ? 'none' : null"
        >
          <div class="ant-drawer-content">
            <div class="ant-drawer-wrapper-body" [style.height]="isLeftOrRight ? '100%' : null">
              <div *ngIf="nzTitle || nzClosable" [class.ant-drawer-header]="!!nzTitle" [class.ant-drawer-header-no-title]="!nzTitle">
                <div *ngIf="nzTitle" class="ant-drawer-title">
                  <ng-container *nzStringTemplateOutlet="nzTitle"><div [innerHTML]="nzTitle"></div></ng-container>
                </div>
                <button *ngIf="nzClosable" (click)="closeClick()" aria-label="Close" class="ant-drawer-close" style="--scroll-bar: 0px;">
                  <i nz-icon nzType="close"></i>
                </button>
              </div>
              <div class="ant-drawer-body" [ngStyle]="nzBodyStyle">
                <ng-template cdkPortalOutlet></ng-template>
                <ng-container *ngIf="isTemplateRef(nzContent)">
                  <ng-container *ngTemplateOutlet="$any(nzContent); context: templateContext"></ng-container>
                </ng-container>
                <ng-content *ngIf="!nzContent"></ng-content>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ng-template>
  `,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzDrawerComponent<T = NzSafeAny, R = NzSafeAny, D = NzSafeAny> extends NzDrawerRef<R>
  implements OnInit, OnDestroy, AfterViewInit, OnChanges, NzDrawerOptionsOfComponent {
  static ngAcceptInputType_nzClosable: BooleanInput;
  static ngAcceptInputType_nzMaskClosable: BooleanInput;
  static ngAcceptInputType_nzMask: BooleanInput;
  static ngAcceptInputType_nzNoAnimation: BooleanInput;
  static ngAcceptInputType_nzKeyboard: BooleanInput;
  static ngAcceptInputType_nzCloseOnNavigation: BooleanInput;

  @Input() nzContent!: TemplateRef<{ $implicit: D; drawerRef: NzDrawerRef<R> }> | Type<T>;
  @Input() @InputBoolean() nzClosable: boolean = true;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME) @InputBoolean() nzMaskClosable: boolean = true;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME) @InputBoolean() nzMask: boolean = true;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME) @InputBoolean() nzCloseOnNavigation: boolean = true;
  @Input() @InputBoolean() nzNoAnimation = false;
  @Input() @InputBoolean() nzKeyboard: boolean = true;
  @Input() nzTitle?: string | TemplateRef<{}>;
  @Input() nzPlacement: NzDrawerPlacement = 'right';
  @Input() nzMaskStyle: NgStyleInterface = {};
  @Input() nzBodyStyle: NgStyleInterface = {};
  @Input() nzWrapClassName?: string;
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

  @ViewChild('drawerTemplate', { static: true }) drawerTemplate!: TemplateRef<void>;
  @ViewChild(CdkPortalOutlet, { static: false }) bodyPortalOutlet?: CdkPortalOutlet;

  destroy$ = new Subject<void>();
  previouslyFocusedElement?: HTMLElement;
  placementChanging = false;
  placementChangeTimeoutId = -1;
  nzContentParams?: D; // only service
  overlayRef?: OverlayRef | null;
  portal?: TemplatePortal;
  focusTrap?: FocusTrap;
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
    @Optional() @Inject(DOCUMENT) private document: NzSafeAny,
    public nzConfigService: NzConfigService,
    private renderer: Renderer2,
    private overlay: Overlay,
    private injector: Injector,
    private changeDetectorRef: ChangeDetectorRef,
    private focusTrapFactory: ConfigurableFocusTrapFactory,
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
    const { nzPlacement, nzVisible } = changes;
    if (nzVisible) {
      const value = changes.nzVisible.currentValue;
      if (value) {
        this.open();
      } else {
        this.close();
      }
    }
    if (nzPlacement && !nzPlacement.isFirstChange()) {
      this.triggerPlacementChangeCycleOnce();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    clearTimeout(this.placementChangeTimeoutId);
    this.disposeOverlay();
  }

  private getAnimationDuration(): number {
    return this.nzNoAnimation ? 0 : DRAWER_ANIMATE_DURATION;
  }

  // Disable the transition animation temporarily when the placement changing
  private triggerPlacementChangeCycleOnce(): void {
    if (!this.nzNoAnimation) {
      this.placementChanging = true;
      this.changeDetectorRef.markForCheck();
      clearTimeout(this.placementChangeTimeoutId);
      this.placementChangeTimeoutId = setTimeout(() => {
        this.placementChanging = false;
        this.changeDetectorRef.markForCheck();
      }, this.getAnimationDuration());
    }
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
    this.attachOverlay();
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
    this.bodyPortalOutlet!.dispose();

    if (this.nzContent instanceof Type) {
      const childInjector = new PortalInjector(this.injector, new WeakMap([[NzDrawerRef, this]]));
      const componentPortal = new ComponentPortal<T>(this.nzContent, null, childInjector);
      const componentRef = this.bodyPortalOutlet!.attachComponentPortal(componentPortal);
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
      this.overlayRef
        .detachments()
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.disposeOverlay();
        });
    }
  }

  private disposeOverlay(): void {
    this.overlayRef?.dispose();
    this.overlayRef = null;
  }

  private getOverlayConfig(): OverlayConfig {
    return new OverlayConfig({
      disposeOnNavigation: this.nzCloseOnNavigation,
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
