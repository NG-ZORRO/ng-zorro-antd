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

import { distinctUntilChanged } from 'rxjs/operators';

import { InputBoolean, NzNoAnimationDirective } from 'ng-zorro-antd/core';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';

import { NzPopconfirmComponent } from './nz-popconfirm.component';

@Directive({
  selector: '[nz-popconfirm]',
  exportAs: 'nzPopconfirm',
  host: {
    '[class.ant-popover-open]': 'isTooltipOpen'
  }
})
export class NzPopconfirmDirective extends NzTooltipDirective implements OnInit {
  factory: ComponentFactory<NzPopconfirmComponent> = this.resolver.resolveComponentFactory(NzPopconfirmComponent);

  protected needProxyProperties = [
    'nzTitle',
    'nzContent',
    'nzOverlayClassName',
    'nzOverlayStyle',
    'nzMouseEnterDelay',
    'nzMouseLeaveDelay',
    'nzVisible',
    'nzTrigger',
    'nzPlacement',
    'nzOkText',
    'nzOkType',
    'nzCancelText',
    'nzCondition',
    'nzIcon'
  ];

  @Input() nzOkText: string;
  @Input() nzOkType: string;
  @Input() nzCancelText: string;
  @Input() nzIcon: string | TemplateRef<void>;
  @Input() @InputBoolean() nzCondition: boolean;
  @Output() readonly nzOnCancel = new EventEmitter<void>();
  @Output() readonly nzOnConfirm = new EventEmitter<void>();

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

  ngOnInit(): void {
    if (!this.tooltip) {
      const tooltipComponent = this.hostView.createComponent(this.factory);
      this.tooltip = tooltipComponent.instance;
      this.tooltip.noAnimation = this.noAnimation;
      // Remove element when use directive https://github.com/NG-ZORRO/ng-zorro-antd/issues/1967
      this.renderer.removeChild(
        this.renderer.parentNode(this.elementRef.nativeElement),
        tooltipComponent.location.nativeElement
      );
      this.isDynamicTooltip = true;
      this.needProxyProperties.forEach(property => this.updateCompValue(property, this[property]));
      const visible_ = this.tooltip.nzVisibleChange.pipe(distinctUntilChanged()).subscribe(data => {
        this.visible = data;
        this.nzVisibleChange.emit(data);
      });
      const cancel_ = (this.tooltip as NzPopconfirmComponent).nzOnCancel.subscribe(() => {
        this.nzOnCancel.emit();
      });
      const confirm_ = (this.tooltip as NzPopconfirmComponent).nzOnConfirm.subscribe(() => {
        this.nzOnConfirm.emit();
      });
      this.subs_.add(visible_);
      this.subs_.add(cancel_);
      this.subs_.add(confirm_);
    }
    this.tooltip.setOverlayOrigin(this);
  }
}
