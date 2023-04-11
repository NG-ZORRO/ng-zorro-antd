/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { FocusTrap, FocusTrapFactory } from '@angular/cdk/a11y';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { ESCAPE } from '@angular/cdk/keycodes';
import { Overlay, OverlayConfig, OverlayKeyboardDispatcher, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortalOutlet, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
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
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { BooleanInput, NgStyleInterface, NzSafeAny } from 'ng-zorro-antd/core/types';
import { InputBoolean, toCssPixel } from 'ng-zorro-antd/core/util';

import { NzDrawerContentDirective } from './drawer-content.directive';
import {
  DRAWER_DEFAULT_SIZE,
  DRAWER_LARGE_SIZE,
  NzDrawerOptionsOfComponent,
  NzDrawerPlacement,
  NzDrawerSize
} from './drawer-options';
import { NzDrawerRef } from './drawer-ref';

export const DRAWER_ANIMATE_DURATION = 300;

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'drawer';

@Component({
  selector: 'nz-drawer',
  exportAs: 'nzDrawer',
  template: `
    <ng-template #drawerTemplate>
      <div
        class="ant-drawer"
        [nzNoAnimation]="nzNoAnimation"
        [class.ant-drawer-rtl]="dir === 'rtl'"
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
              <div
                *ngIf="nzTitle || nzClosable"
                class="ant-drawer-header"
                [class.ant-drawer-header-close-only]="!nzTitle"
              >
                <div class="ant-drawer-header-title">
                  <button
                    *ngIf="nzClosable"
                    (click)="closeClick()"
                    aria-label="Close"
                    class="ant-drawer-close"
                    style="--scroll-bar: 0px;"
                  >
                    <ng-container *nzStringTemplateOutlet="nzCloseIcon; let closeIcon">
                      <span nz-icon [nzType]="closeIcon"></span>
                    </ng-container>
                  </button>
                  <div *ngIf="nzTitle" class="ant-drawer-title">
                    <ng-container *nzStringTemplateOutlet="nzTitle">
                      <div [innerHTML]="nzTitle"></div>
                    </ng-container>
                  </div>
                </div>
                <div *ngIf="nzExtra" class="ant-drawer-extra">
                  <ng-container *nzStringTemplateOutlet="nzExtra">
                    <div [innerHTML]="nzExtra"></div>
                  </ng-container>
                </div>
              </div>
              <div class="ant-drawer-body" [ngStyle]="nzBodyStyle">
                <ng-template cdkPortalOutlet></ng-template>
                <ng-container *ngIf="nzContent; else contentElseTemp">
                  <ng-container *ngIf="isTemplateRef(nzContent)">
                    <ng-container *ngTemplateOutlet="$any(nzContent); context: templateContext"></ng-container>
                  </ng-container>
                </ng-container>
                <ng-template #contentElseTemp>
                  <ng-container *ngIf="contentFromContentChild && (isOpen || inAnimation)">
                    <ng-template [ngTemplateOutlet]="contentFromContentChild"></ng-template>
                  </ng-container>
                </ng-template>
              </div>
              <div *ngIf="nzFooter" class="ant-drawer-footer">
                <ng-container *nzStringTemplateOutlet="nzFooter">
                  <div [innerHTML]="nzFooter"></div>
                </ng-container>
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
export class NzDrawerComponent<T extends {} = NzSafeAny, R = NzSafeAny, D extends Partial<T> = NzSafeAny>
  extends NzDrawerRef<T, R>
  implements OnInit, OnDestroy, AfterViewInit, OnChanges, NzDrawerOptionsOfComponent
{
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;
  static ngAcceptInputType_nzClosable: BooleanInput;
  static ngAcceptInputType_nzMaskClosable: BooleanInput;
  static ngAcceptInputType_nzMask: BooleanInput;
  static ngAcceptInputType_nzNoAnimation: BooleanInput;
  static ngAcceptInputType_nzKeyboard: BooleanInput;
  static ngAcceptInputType_nzCloseOnNavigation: BooleanInput;

  @Input() nzContent!: TemplateRef<{ $implicit: D; drawerRef: NzDrawerRef<R> }> | Type<T>;
  @Input() nzCloseIcon: string | TemplateRef<void> = 'close';
  @Input() @InputBoolean() nzClosable: boolean = true;
  @Input() @WithConfig() @InputBoolean() nzMaskClosable: boolean = true;
  @Input() @WithConfig() @InputBoolean() nzMask: boolean = true;
  @Input() @WithConfig() @InputBoolean() nzCloseOnNavigation: boolean = true;
  @Input() @InputBoolean() nzNoAnimation = false;
  @Input() @InputBoolean() nzKeyboard: boolean = true;
  @Input() nzTitle?: string | TemplateRef<{}>;
  @Input() nzExtra?: string | TemplateRef<{}>;
  @Input() nzFooter?: string | TemplateRef<{}>;
  @Input() nzPlacement: NzDrawerPlacement = 'right';
  @Input() nzSize: NzDrawerSize = 'default';
  @Input() nzMaskStyle: NgStyleInterface = {};
  @Input() nzBodyStyle: NgStyleInterface = {};
  @Input() nzWrapClassName?: string;
  @Input() nzWidth?: number | string;
  @Input() nzHeight?: number | string;
  @Input() nzZIndex = 1000;
  @Input() nzOffsetX = 0;
  @Input() nzOffsetY = 0;
  private componentInstance: T | null = null;

  @Input()
  set nzVisible(value: boolean) {
    this.isOpen = value;
  }

  get nzVisible(): boolean {
    return this.isOpen;
  }

  @Output() readonly nzOnViewInit = new EventEmitter<void>();
  @Output() readonly nzOnClose = new EventEmitter<MouseEvent>();
  @Output() readonly nzVisibleChange = new EventEmitter<boolean>();

  @ViewChild('drawerTemplate', { static: true }) drawerTemplate!: TemplateRef<void>;
  @ViewChild(CdkPortalOutlet, { static: false }) bodyPortalOutlet?: CdkPortalOutlet;
  @ContentChild(NzDrawerContentDirective, { static: true, read: TemplateRef })
  contentFromContentChild?: TemplateRef<NzSafeAny>;

  private destroy$ = new Subject<void>();
  previouslyFocusedElement?: HTMLElement;
  placementChanging = false;
  placementChangeTimeoutId = -1;
  nzContentParams?: NzSafeAny; // only service
  overlayRef?: OverlayRef | null;
  portal?: TemplatePortal;
  focusTrap?: FocusTrap;
  isOpen = false;
  inAnimation = false;
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
    if (this.isLeftOrRight) {
      const defaultWidth = this.nzSize === 'large' ? DRAWER_LARGE_SIZE : DRAWER_DEFAULT_SIZE;
      return this.nzWidth === undefined ? toCssPixel(defaultWidth) : toCssPixel(this.nzWidth);
    }
    return null;
  }

  get height(): string | null {
    if (!this.isLeftOrRight) {
      const defaultHeight = this.nzSize === 'large' ? DRAWER_LARGE_SIZE : DRAWER_DEFAULT_SIZE;
      return this.nzHeight === undefined ? toCssPixel(defaultHeight) : toCssPixel(this.nzHeight);
    }
    return null;
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

  // from service config
  @WithConfig() nzDirection?: Direction = undefined;

  dir: Direction = 'ltr';

  constructor(
    private cdr: ChangeDetectorRef,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Optional() @Inject(DOCUMENT) private document: NzSafeAny,
    public nzConfigService: NzConfigService,
    private renderer: Renderer2,
    private overlay: Overlay,
    private injector: Injector,
    private changeDetectorRef: ChangeDetectorRef,
    private focusTrapFactory: FocusTrapFactory,
    private viewContainerRef: ViewContainerRef,
    private overlayKeyboardDispatcher: OverlayKeyboardDispatcher,
    @Optional() private directionality: Directionality
  ) {
    super();
  }

  ngOnInit(): void {
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });
    this.dir = this.nzDirection || this.directionality.value;

    this.attachOverlay();
    this.updateOverlayStyle();
    this.updateBodyOverflow();
    this.templateContext = { $implicit: this.nzContentParams, drawerRef: this as NzDrawerRef<R> };
    this.changeDetectorRef.detectChanges();
  }

  ngAfterViewInit(): void {
    this.attachBodyContent();
    // The `setTimeout` triggers change detection. There's no sense to schedule the DOM timer if anyone is
    // listening to the `nzOnViewInit` event inside the template, for instance `<nz-drawer (nzOnViewInit)="...">`.
    if (this.nzOnViewInit.observers.length) {
      setTimeout(() => {
        this.nzOnViewInit.emit();
      });
    }
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
    this.inAnimation = true;
    this.nzVisibleChange.emit(false);
    this.updateOverlayStyle();
    this.overlayKeyboardDispatcher.remove(this.overlayRef!);
    this.changeDetectorRef.detectChanges();
    setTimeout(() => {
      this.updateBodyOverflow();
      this.restoreFocus();
      this.inAnimation = false;
      this.nzAfterClose.next(result);
      this.nzAfterClose.complete();
      this.componentInstance = null;
    }, this.getAnimationDuration());
  }

  open(): void {
    this.attachOverlay();
    this.isOpen = true;
    this.inAnimation = true;
    this.nzVisibleChange.emit(true);
    this.overlayKeyboardDispatcher.add(this.overlayRef!);
    this.updateOverlayStyle();
    this.updateBodyOverflow();
    this.savePreviouslyFocusedElement();
    this.trapFocus();
    this.changeDetectorRef.detectChanges();
    setTimeout(() => {
      this.inAnimation = false;
      this.changeDetectorRef.detectChanges();
      this.nzAfterOpen.next();
    }, this.getAnimationDuration());
  }

  getContentComponent(): T | null {
    return this.componentInstance;
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
      const childInjector = Injector.create({
        parent: this.injector,
        providers: [{ provide: NzDrawerRef, useValue: this }]
      });
      const componentPortal = new ComponentPortal<T>(this.nzContent, null, childInjector);
      const componentRef = this.bodyPortalOutlet!.attachComponentPortal(componentPortal);
      this.componentInstance = componentRef.instance;
      Object.assign(componentRef.instance!, this.nzContentParams);
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
