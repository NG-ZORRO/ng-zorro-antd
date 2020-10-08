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

import { isTooltipEmpty, NzTooltipBaseDirective, NzToolTipComponent, NzTooltipTrigger } from 'ng-zorro-antd/tooltip';

@Directive({
  selector: '[nz-popover]',
  exportAs: 'nzPopover',
  host: {
    '[class.ant-popover-open]': 'visible'
  }
})
export class NzPopoverDirective extends NzTooltipBaseDirective {
  @Input('nzPopoverTitle') title?: NzTSType;
  @Input('nzPopoverContent') content?: NzTSType;
  @Input('nz-popover') directiveTitle?: NzTSType | null;
  @Input('nzPopoverTrigger') trigger?: NzTooltipTrigger = 'hover';
  @Input('nzPopoverPlacement') placement?: string = 'top';
  @Input('nzPopoverOrigin') origin?: ElementRef<HTMLElement>;
  @Input('nzPopoverVisible') visible?: boolean;
  @Input('nzPopoverMouseEnterDelay') mouseEnterDelay?: number;
  @Input('nzPopoverMouseLeaveDelay') mouseLeaveDelay?: number;
  @Input('nzPopoverOverlayClassName') overlayClassName?: string;
  @Input('nzPopoverOverlayStyle') overlayStyle?: NgStyleInterface;

  // tslint:disable-next-line:no-output-rename
  @Output('nzPopoverVisibleChange') readonly visibleChange = new EventEmitter<boolean>();

  componentFactory: ComponentFactory<NzPopoverComponent> = this.resolver.resolveComponentFactory(NzPopoverComponent);

  constructor(
    elementRef: ElementRef,
    hostView: ViewContainerRef,
    resolver: ComponentFactoryResolver,
    renderer: Renderer2,
    @Host() @Optional() public noAnimation?: NzNoAnimationDirective
  ) {
    super(elementRef, hostView, resolver, renderer, noAnimation);
  }
}

@Component({
  selector: 'nz-popover',
  exportAs: 'nzPopoverComponent',
  animations: [zoomBigMotion],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  template: `
    <ng-template
      #overlay="cdkConnectedOverlay"
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayHasBackdrop]="_hasBackdrop"
      (backdropClick)="hide()"
      (detach)="hide()"
      (positionChange)="onPositionChange($event)"
      [cdkConnectedOverlayPositions]="_positions"
      [cdkConnectedOverlayOpen]="_visible"
      [cdkConnectedOverlayPush]="true"
    >
      <div
        class="ant-popover"
        [ngClass]="_classMap"
        [ngStyle]="nzOverlayStyle"
        [@.disabled]="noAnimation?.nzNoAnimation"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        [@zoomBigMotion]="'active'"
      >
        <div class="ant-popover-content">
          <div class="ant-popover-arrow"></div>
          <div class="ant-popover-inner" role="tooltip">
            <div>
              <div class="ant-popover-title" *ngIf="nzTitle">
                <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
              </div>
              <div class="ant-popover-inner-content">
                <ng-container *nzStringTemplateOutlet="nzContent">{{ nzContent }}</ng-container>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ng-template>
  `
})
export class NzPopoverComponent extends NzToolTipComponent {
  _prefix = 'ant-popover-placement';

  constructor(cdr: ChangeDetectorRef, @Host() @Optional() public noAnimation?: NzNoAnimationDirective) {
    super(cdr, noAnimation);
  }

  protected isEmpty(): boolean {
    return isTooltipEmpty(this.nzTitle) && isTooltipEmpty(this.nzContent);
  }
}
