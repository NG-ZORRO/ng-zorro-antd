/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ComponentFactory,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  Host,
  Input,
  Optional,
  Renderer2,
  ViewContainerRef
} from '@angular/core';

import { NzNoAnimationDirective, NzTSType } from 'ng-zorro-antd/core';
import { NzTooltipBaseDirective, NzTooltipTrigger } from 'ng-zorro-antd/tooltip';

import { NzPopoverComponent } from './nz-popover.component';

@Directive({
  selector: '[nz-popover]',
  exportAs: 'nzPopover',
  host: {
    '[class.ant-popover-open]': 'isTooltipComponentVisible'
  }
})
export class NzPopoverDirective extends NzTooltipBaseDirective {
  @Input('nzPopoverTitle') specificTitle: NzTSType;
  @Input('nzPopoverContent') specificContent: NzTSType;
  @Input('nz-popover') directiveNameTitle: NzTSType | null;
  @Input('nzPopoverTrigger') specificTrigger: NzTooltipTrigger;
  @Input('nzPopoverPlacement') specificPlacement: string;

  componentFactory: ComponentFactory<NzPopoverComponent> = this.resolver.resolveComponentFactory(NzPopoverComponent);

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
