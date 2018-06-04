import {
  ComponentFactory,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  Optional,
  Renderer2,
  ViewContainerRef
} from '@angular/core';
import { NzTooltipDirective } from '../tooltip/nz-tooltip.directive';
import { NzPopoverComponent } from './nz-popover.component';

@Directive({
  selector: '[nz-popover]'
})
export class NzPopoverDirective extends NzTooltipDirective {
  factory: ComponentFactory<NzPopoverComponent> = this.resolver.resolveComponentFactory(NzPopoverComponent);

  constructor(
    elementRef: ElementRef,
    hostView: ViewContainerRef,
    resolver: ComponentFactoryResolver,
    renderer: Renderer2,
    @Optional() tooltip: NzPopoverComponent) {
    super(elementRef, hostView, resolver, renderer, tooltip);
  }
}
