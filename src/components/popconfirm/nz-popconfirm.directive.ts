import {
  Directive,
  ElementRef,
  ViewContainerRef,
  ComponentFactoryResolver,
  Renderer2
} from '@angular/core';
import { NzPopconfirmComponent } from './nz-popconfirm.component';
import { NzTooltipDirective } from '../tooltip/nz-tooltip.directive';

@Directive({
  selector: '[nz-popconfirm]',
})
export class NzPopconfirmDirective extends NzTooltipDirective {
  constructor(
      elementRef: ElementRef,
      hostView: ViewContainerRef,
      resolver: ComponentFactoryResolver,
      renderer: Renderer2,
      tooltip: NzPopconfirmComponent) {
    super(elementRef, hostView, resolver, renderer, tooltip);
  }
}
