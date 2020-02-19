/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ContentChild,
  Directive,
  ElementRef,
  Host,
  Input,
  Optional,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';

import { NzNoAnimationDirective, NzTSType, zoomBigMotion } from 'ng-zorro-antd/core';

import { isTooltipEmpty, NzTooltipBaseComponent, NzTooltipBaseDirective, NzTooltipTrigger } from './base';

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
    @Host() @Optional() noAnimation?: NzNoAnimationDirective
  ) {
    super(elementRef, hostView, resolver, renderer, noAnimation);
  }
}

@Component({
  selector: 'nz-tooltip',
  exportAs: 'nzTooltipComponent',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [zoomBigMotion],
  template: `
    <ng-template
      #overlay="cdkConnectedOverlay"
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="_visible"
      [cdkConnectedOverlayHasBackdrop]="_hasBackdrop"
      [cdkConnectedOverlayPositions]="_positions"
      (backdropClick)="hide()"
      (detach)="hide()"
      (positionChange)="onPositionChange($event)"
    >
      <div
        class="ant-tooltip"
        [ngClass]="_classMap"
        [ngStyle]="nzOverlayStyle"
        [@.disabled]="noAnimation?.nzNoAnimation"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        [@zoomBigMotion]="'active'"
      >
        <div class="ant-tooltip-content">
          <div class="ant-tooltip-arrow"></div>
          <div class="ant-tooltip-inner">
            <ng-container *nzStringTemplateOutlet="title">{{ title }}</ng-container>
          </div>
        </div>
      </div>
    </ng-template>
  `,
  preserveWhitespaces: false,
  styles: [
    `
      .ant-tooltip {
        position: relative;
      }
    `
  ]
})
export class NzToolTipComponent extends NzTooltipBaseComponent {
  @Input() nzTitle: NzTSType | null;
  @ContentChild('nzTemplate', { static: true }) nzTitleTemplate: TemplateRef<void>;

  constructor(cdr: ChangeDetectorRef, @Host() @Optional() public noAnimation?: NzNoAnimationDirective) {
    super(cdr, noAnimation);
  }

  protected isEmpty(): boolean {
    return isTooltipEmpty(this.title);
  }
}
