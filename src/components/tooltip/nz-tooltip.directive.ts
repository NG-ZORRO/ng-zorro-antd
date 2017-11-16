import {
  Directive,
  Input,
  SimpleChanges,
  AfterViewInit,
  ViewContainerRef,
  ComponentFactoryResolver,
  ElementRef,
  HostBinding,
  Optional,
  Renderer2
} from '@angular/core';
import { NzToolTipComponent } from './nz-tooltip.component';

@Directive({
  selector: '[nz-tooltip]',
})
export class NzTooltipDirective implements AfterViewInit {
  // [NOTE] Here hard coded, and nzTitle used only under NzTooltipDirective currently.
  // The inherited class such as NzPopconfirmDirective should override this property if want using this property.
  @Input('nz-tooltip')
  get nzTitle() {
    return this.tooltip.nzTitle;
  }
  set nzTitle(title: string) {
    if (this.isDynamicTooltip) {
      this.tooltip.nzTitle = title;
    }
  }

  @HostBinding('class.ant-tooltip-open') isTooltipOpen;

  private tooltip: NzToolTipComponent;
  private isDynamicTooltip = false; // Indicate whether current tooltip is dynamic created

  constructor(
      public elementRef: ElementRef,
      private hostView: ViewContainerRef,
      private resolver: ComponentFactoryResolver,
      private renderer: Renderer2,
      @Optional() tooltip: NzToolTipComponent) {
    // Support faster tooltip mode: <a nz-tooltip="xxx"></a>. [NOTE] Used only under NzTooltipDirective currently.
    if (!tooltip) {
      const factory = this.resolver.resolveComponentFactory(NzToolTipComponent);
      tooltip = this.hostView.createComponent(factory).instance;
      this.isDynamicTooltip = true;
    }
    tooltip.setOverlayOrigin(this);
    this.tooltip = tooltip;
  }

  ngAfterViewInit() {
    if (this.tooltip.nzTrigger === 'hover') {
      this.renderer.listen(this.elementRef.nativeElement, 'mouseenter', () => this.show());
      this.renderer.listen(this.elementRef.nativeElement, 'mouseleave', () => this.hide());
    } else if (this.tooltip.nzTrigger === 'focus') {
      this.renderer.listen(this.elementRef.nativeElement, 'focus', () => this.show());
      this.renderer.listen(this.elementRef.nativeElement, 'blur', () => this.hide());
    } else if (this.tooltip.nzTrigger === 'click') {
      this.renderer.listen(this.elementRef.nativeElement, 'click', (e) => {
        e.preventDefault();
        this.show()
      });
    }
  }

  private show() {
    this.tooltip.show();
    this.isTooltipOpen = true;
  }

  private hide() {
    this.tooltip.hide();
    this.isTooltipOpen = false;
  }
}
