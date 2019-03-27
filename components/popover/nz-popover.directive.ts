import {
  ComponentFactory,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  Host,
  Optional,
  Renderer2,
  ViewContainerRef
} from '@angular/core';

import { NzNoAnimationDirective } from '../core/no-animation/nz-no-animation.directive';
import { NzTooltipDirective } from '../tooltip/nz-tooltip.directive';
import { NzPopoverComponent } from './nz-popover.component';

@Directive({
  selector: '[nz-popover]',
  host: {
    '[class.ant-popover-open]': 'isTooltipOpen'
  }
})
export class NzPopoverDirective extends NzTooltipDirective {
  factory: ComponentFactory<NzPopoverComponent> = this.resolver.resolveComponentFactory(NzPopoverComponent);

  constructor(
    elementRef: ElementRef,
    hostView: ViewContainerRef,
    resolver: ComponentFactoryResolver,
    renderer: Renderer2,
    @Optional() tooltip: NzPopoverComponent,
    @Host() @Optional() public noAnimation?: NzNoAnimationDirective
  ) {
    super(elementRef, hostView, resolver, renderer, tooltip, noAnimation);
  }
}
