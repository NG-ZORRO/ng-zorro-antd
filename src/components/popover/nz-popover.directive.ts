import {
  Directive,
  ElementRef,
  ViewContainerRef,
  ComponentFactoryResolver,
  Renderer2
} from '@angular/core';
import { NzPopoverComponent } from './nz-popover.component';
import { NzTooltipDirective } from '../tooltip/nz-tooltip.directive';

@Directive({
  selector: '[nz-popover]',
})
export class NzPopoverDirective extends NzTooltipDirective {
  constructor(
      elementRef: ElementRef,
      hostView: ViewContainerRef,
      resolver: ComponentFactoryResolver,
      renderer: Renderer2,
      tooltip: NzPopoverComponent) {
    super(elementRef, hostView, resolver, renderer, tooltip);
  }
}
