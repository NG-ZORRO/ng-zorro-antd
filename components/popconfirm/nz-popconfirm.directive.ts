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
  EventEmitter,
  Host,
  Input,
  OnInit,
  Optional,
  Output,
  Renderer2,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

import { takeUntil } from 'rxjs/operators';

import { InputBoolean, NzNoAnimationDirective, NzTSType } from 'ng-zorro-antd/core';
import { NzTooltipBaseDirective, NzTooltipTrigger } from 'ng-zorro-antd/tooltip';

import { NzPopconfirmComponent } from './nz-popconfirm.component';

@Directive({
  selector: '[nz-popconfirm]',
  exportAs: 'nzPopconfirm',
  host: {
    '[class.ant-popover-open]': 'isTooltipComponentVisible'
  }
})
export class NzPopconfirmDirective extends NzTooltipBaseDirective implements OnInit {
  @Input('nzPopconfirmTitle') specificTitle: NzTSType;
  @Input('nz-popconfirm') directiveNameTitle: NzTSType | null;
  @Input('nzPopconfirmTrigger') specificTrigger: NzTooltipTrigger;
  @Input('nzPopconfirmPlacement') specificPlacement: string;
  @Input() nzOkText: string;
  @Input() nzOkType: string;
  @Input() nzCancelText: string;
  @Input() nzIcon: string | TemplateRef<void>;
  @Input() @InputBoolean() nzCondition: boolean;

  /**
   * @deprecated 9.0.0. This is deprecated and going to be removed in 9.0.0.
   * Please use a more specific API. Like `nzTooltipTrigger`.
   */
  @Input() nzTrigger: NzTooltipTrigger = 'click';

  @Output() readonly nzOnCancel = new EventEmitter<void>();
  @Output() readonly nzOnConfirm = new EventEmitter<void>();

  componentFactory: ComponentFactory<NzPopconfirmComponent> = this.resolver.resolveComponentFactory(
    NzPopconfirmComponent
  );

  protected needProxyProperties = [
    'nzOverlayClassName',
    'nzOverlayStyle',
    'nzMouseEnterDelay',
    'nzMouseLeaveDelay',
    'nzVisible',
    'nzOkText',
    'nzOkType',
    'nzCancelText',
    'nzCondition',
    'nzIcon'
  ];

  constructor(
    elementRef: ElementRef,
    hostView: ViewContainerRef,
    resolver: ComponentFactoryResolver,
    renderer: Renderer2,
    @Optional() tooltip: NzPopconfirmComponent,
    @Host() @Optional() public noAnimation?: NzNoAnimationDirective
  ) {
    super(elementRef, hostView, resolver, renderer, tooltip, noAnimation);
  }

  /**
   * @override
   */
  protected createDynamicTooltipComponent(): void {
    super.createDynamicTooltipComponent();

    (this.tooltip as NzPopconfirmComponent).nzOnCancel.pipe(takeUntil(this.$destroy)).subscribe(() => {
      this.nzOnCancel.emit();
    });
    (this.tooltip as NzPopconfirmComponent).nzOnConfirm.pipe(takeUntil(this.$destroy)).subscribe(() => {
      this.nzOnConfirm.emit();
    });
  }
}
