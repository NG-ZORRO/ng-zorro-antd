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

import { NzTooltipBaseComponentLegacy } from './base/nz-tooltip-base-legacy.component';
import { NzTooltipBaseDirective } from './base/nz-tooltip-base.directive';
import { NzToolTipComponent } from './nz-tooltip.component';
import { NzTooltipTrigger } from './nz-tooltip.definitions';

@Directive({
  selector: '[nz-tooltip]',
  exportAs: 'nzTooltip',
  host: {
    '[class.ant-tooltip-open]': 'isTooltipComponentVisible'
  }
})
export class NzTooltipDirective extends NzTooltipBaseDirective {
  /**
   * The title that should have highest priority.
   */
  @Input('nzTooltipTitle') specificTitle: NzTSType;

  /**
   * Use the directive's name as the title that have priority in the second place.
   */
  @Input('nz-tooltip') directiveNameTitle: NzTSType | null;

  @Input('nzTooltipTrigger') specificTrigger: NzTooltipTrigger;
  @Input('nzTooltipPlacement') specificPlacement: string;

  componentFactory: ComponentFactory<NzToolTipComponent> = this.resolver.resolveComponentFactory(NzToolTipComponent);

  constructor(
    elementRef: ElementRef,
    hostView: ViewContainerRef,
    resolver: ComponentFactoryResolver,
    renderer: Renderer2,
    @Optional() _tooltip?: NzTooltipBaseComponentLegacy,
    @Host() @Optional() noAnimation?: NzNoAnimationDirective
  ) {
    super(elementRef, hostView, resolver, renderer, _tooltip, noAnimation);
  }
}
