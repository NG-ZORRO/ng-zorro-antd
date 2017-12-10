import {
  AfterViewInit,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  Optional,
  Renderer2,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import { NzToolTipComponent } from './nz-tooltip.component';

@Directive({
  selector: '[nz-tooltip]',
})
export class NzTooltipDirective implements AfterViewInit {
  // [NOTE] Here hard coded, and nzTitle used only under NzTooltipDirective currently.
  // The inherited class such as NzPopconfirmDirective should override this property if want using this property.
  @Input('nz-tooltip')
  get nzTitle(): string { return this.tooltip.nzTitle; }
  set nzTitle(title: string) {
    if (this.isDynamicTooltip) {
      this.tooltip.nzTitle = title;
    }
  }

  @HostBinding('class.ant-tooltip-open') isTooltipOpen;

  private tooltip: NzToolTipComponent;
  private isDynamicTooltip = false; // Indicate whether current tooltip is dynamic created
  private smoothTimer; // Timer for hiding smoothly

  constructor(
      public elementRef: ElementRef,
      private hostView: ViewContainerRef,
      private resolver: ComponentFactoryResolver,
      private renderer: Renderer2,
      @Optional() tooltip: NzToolTipComponent) {

    this.tooltip = tooltip;
    // Support faster tooltip mode: <a nz-tooltip="xxx"></a>. [NOTE] Used only under NzTooltipDirective currently.
    if (!this.tooltip) {
      const factory = this.resolver.resolveComponentFactory(NzToolTipComponent);
      this.tooltip = this.hostView.createComponent(factory).instance;
      this.isDynamicTooltip = true;
    }
    this.tooltip.setOverlayOrigin(this);
  }

  ngAfterViewInit(): void {
    if (this.tooltip.nzTrigger === 'hover') {
      let overlayElement;
      this.renderer.listen(this.elementRef.nativeElement, 'mouseenter', () => this.showSmoothly());
      this.renderer.listen(this.elementRef.nativeElement, 'mouseleave', () => {
        this.hideSmoothly();
        if (this.tooltip.overlay.overlayRef && !overlayElement) { // NOTE: we bind events under "mouseleave" due to the overlayRef is only created after the overlay was completely shown up
          overlayElement = this.tooltip.overlay.overlayRef.overlayElement;
          this.renderer.listen(overlayElement, 'mouseenter', () => this.showSmoothly());
          this.renderer.listen(overlayElement, 'mouseleave', () => this.hideSmoothly());
        }
      });
    } else if (this.tooltip.nzTrigger === 'focus') {
      this.renderer.listen(this.elementRef.nativeElement, 'focus', () => this.show());
      this.renderer.listen(this.elementRef.nativeElement, 'blur', () => this.hide());
    } else if (this.tooltip.nzTrigger === 'click') {
      this.renderer.listen(this.elementRef.nativeElement, 'click', (e) => {
        e.preventDefault();
        this.show();
      });
    }
  }

  private show(): void {
    this.tooltip.show();
    this.isTooltipOpen = true;
  }

  private hide(): void {
    this.tooltip.hide();
    this.isTooltipOpen = false;
  }

  private showSmoothly(): void {
    if (this.smoothTimer) {
      clearTimeout(this.smoothTimer);
    } else {
      this.show();
    }
  }

  private hideSmoothly(): void {
    this.smoothTimer = setTimeout(() => {
      this.smoothTimer = null;
      this.hide();
    }, 50);
  }
}
