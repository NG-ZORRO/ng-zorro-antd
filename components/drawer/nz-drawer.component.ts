import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input, OnDestroy,
  OnInit,
  Output,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import { CdkOverlayOrigin, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { NzScrollStrategyOptions } from '../core/overlay/scroll/nz-scroll-strategy-options';

import { toCssPixel, InputBoolean } from '../core/util/convert';

export type NzDrawerPlacement = 'top' | 'right' | 'bottom' | 'left';

@Component({
  selector           : 'nz-drawer',
  templateUrl        : './nz-drawer.component.html',
  preserveWhitespaces: false,
  changeDetection    : ChangeDetectionStrategy.OnPush
})
export class NzDrawerComponent implements OnInit, OnDestroy {
  origin: CdkOverlayOrigin;
  overlayRef: OverlayRef;
  portal: TemplatePortal;
  isOpen = false;

  get transform(): string {

    switch (this.nzPlacement) {
      case 'left':
        return this.isOpen ? `translateX(${this.nzOffsetX}px)` : `translateX(-${this.width})`;
      case 'right':
        return this.isOpen ? `translateX(-${this.nzOffsetX}px)` : `translateX(${this.width})`;
      case 'top':
        return this.isOpen ? `translateY(${this.nzOffsetY}px)` : `translateY(-${this.height})`;
      case 'bottom':
        return this.isOpen ? `translateY(-${this.nzOffsetY}px)` : `translateY(${this.height})`;
      default:
        return '';
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
  @Input() @InputBoolean() nzClosable = true;
  @Input() @InputBoolean() nzMaskClosable = true;
  @Input() @InputBoolean() nzMask = true;
  @Input() nzTitle: string | TemplateRef<{}>;
  @Input() nzMaskStyle: object = {};
  @Input() nzBodyStyle: object = {};
  @Input() nzWrapClassName: string;
  @Input() nzWidth: number | string = 256;
  @Input() nzHeight: number | string = 256;
  @Input() nzPlacement: NzDrawerPlacement = 'right';
  @Input() nzZIndex = 1000;
  @Input() nzOffsetX = 0;
  @Input() nzOffsetY = 0;
  @Output() nzOnClose = new EventEmitter<MouseEvent>();

  @Input()
  set nzVisible(value: boolean) {
    this.isOpen = value;
    this.updateOverlayStyle();
  }

  get nzVisible(): boolean {
    return this.isOpen;
  }

  isNonEmptyString(value: {}): boolean {
    return typeof value === 'string' && value !== '';
  }

  isTemplateRef(value: {}): boolean {
    return value instanceof TemplateRef;
  }

  constructor(
    private renderer: Renderer2,
    private overlay: Overlay,
    private elementRef: ElementRef,
    private nzScrollStrategyOptions: NzScrollStrategyOptions,
    private viewContainerRef: ViewContainerRef) {

  }

  ngOnInit(): void {
    this.origin = new CdkOverlayOrigin(this.elementRef);
    this.attachOverlay();
    this.updateOverlayStyle();
  }

  ngOnDestroy(): void {
    this.disposeOverlay();
  }

  attachOverlay(): void {
    if (!this.overlayRef) {
      this.portal = new TemplatePortal(this.drawerTemplate, this.viewContainerRef);
      this.overlayRef = this.overlay.create(this.getOverlayConfig());
    }

    if (this.overlayRef && !this.overlayRef.hasAttached()) {
      this.overlayRef.attach(this.portal);
    }
  }

  disposeOverlay(): void {
    this.overlayRef.dispose();
    this.overlayRef = null;
  }

  getOverlayConfig(): OverlayConfig {
    return new OverlayConfig({
      scrollStrategy: this.nzScrollStrategyOptions.block()
    });
  }

  updateOverlayStyle(): void {
    if (this.overlayRef && this.overlayRef.overlayElement) {
      this.renderer.setStyle(this.overlayRef.overlayElement, 'pointer-events', this.isOpen ? 'auto' : 'none');
      if (this.isOpen) {
        this.overlayRef.getConfig().scrollStrategy.enable();
      } else {
        this.overlayRef.getConfig().scrollStrategy.disable();
      }
    }
  }

  close(e?: MouseEvent): void {
    this.nzOnClose.emit(e);
  }

  maskClick(e: MouseEvent): void {
    if (this.nzMaskClosable && this.nzMask) {
      this.close(e);
    }
  }

}
