import {
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { NzTooltipDirective } from '../tooltip/nz-tooltip.directive';
import { NzPopoverComponent } from './nz-popover.component';

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
