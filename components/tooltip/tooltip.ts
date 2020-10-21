/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  EventEmitter,
  Host,
  Input,
  Optional,
  Output,
  Renderer2,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { zoomBigMotion } from 'ng-zorro-antd/core/animation';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { NgStyleInterface, NzTSType } from 'ng-zorro-antd/core/types';

import { isTooltipEmpty, NzTooltipBaseComponent, NzTooltipBaseDirective, NzTooltipTrigger } from './base';

@Directive({
  selector: '[nz-tooltip]',
  exportAs: 'nzTooltip',
  host: {
    '[class.ant-tooltip-open]': 'visible'
  }
})
export class NzTooltipDirective extends NzTooltipBaseDirective {
  @Input('nzTooltipTitle') title?: NzTSType | null;
  @Input('nz-tooltip') directiveTitle?: NzTSType | null;
  @Input('nzTooltipTrigger') trigger?: NzTooltipTrigger = 'hover';
  @Input('nzTooltipPlacement') placement?: string = 'top';
  @Input('nzTooltipOrigin') origin?: ElementRef<HTMLElement>;
  @Input('nzTooltipVisible') visible?: boolean;
  @Input('nzTooltipMouseEnterDelay') mouseEnterDelay?: number;
  @Input('nzTooltipMouseLeaveDelay') mouseLeaveDelay?: number;
  @Input('nzTooltipOverlayClassName') overlayClassName?: string;
  @Input('nzTooltipOverlayStyle') overlayStyle?: NgStyleInterface;

  // tslint:disable-next-line:no-output-rename
  @Output('nzTooltipVisibleChange') readonly visibleChange = new EventEmitter<boolean>();

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
      [cdkConnectedOverlayPush]="true"
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
          <div class="ant-tooltip-arrow">
            <span class="ant-tooltip-arrow-content"></span>
          </div>
          <div class="ant-tooltip-inner">
            <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
          </div>
        </div>
      </div>
    </ng-template>
  `,
  preserveWhitespaces: false
})
export class NzToolTipComponent extends NzTooltipBaseComponent {
  @Input() nzTitle: NzTSType | null = null;

  constructor(cdr: ChangeDetectorRef, @Host() @Optional() public noAnimation?: NzNoAnimationDirective) {
    super(cdr, noAnimation);
  }

  protected isEmpty(): boolean {
    return isTooltipEmpty(this.nzTitle);
  }
}
