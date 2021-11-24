/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directionality } from '@angular/cdk/bidi';
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
import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { BooleanInput, NgStyleInterface, NzTSType } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import {
  isTooltipEmpty,
  NzTooltipBaseDirective,
  NzToolTipComponent,
  NzTooltipTrigger,
  PropertyMapping
} from 'ng-zorro-antd/tooltip';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'popover';

@Directive({
  selector: '[nz-popover]',
  exportAs: 'nzPopover',
  host: {
    '[class.ant-popover-open]': 'visible'
  }
})
export class NzPopoverDirective extends NzTooltipBaseDirective {
  static ngAcceptInputType_nzPopoverArrowPointAtCenter: BooleanInput;

  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  @Input('nzPopoverArrowPointAtCenter') @InputBoolean() arrowPointAtCenter?: boolean;
  @Input('nzPopoverTitle') title?: NzTSType;
  @Input('nzPopoverContent') content?: NzTSType;
  @Input('nz-popover') directiveTitle?: NzTSType | null;
  @Input('nzPopoverTrigger') trigger?: NzTooltipTrigger = 'hover';
  @Input('nzPopoverPlacement') placement?: string | string[] = 'top';
  @Input('nzPopoverOrigin') origin?: ElementRef<HTMLElement>;
  @Input('nzPopoverVisible') visible?: boolean;
  @Input('nzPopoverMouseEnterDelay') mouseEnterDelay?: number;
  @Input('nzPopoverMouseLeaveDelay') mouseLeaveDelay?: number;
  @Input('nzPopoverOverlayClassName') overlayClassName?: string;
  @Input('nzPopoverOverlayStyle') overlayStyle?: NgStyleInterface;
  @Input() @WithConfig() nzPopoverBackdrop?: boolean = false;

  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('nzPopoverVisibleChange') readonly visibleChange = new EventEmitter<boolean>();

  componentFactory: ComponentFactory<NzPopoverComponent> = this.resolver.resolveComponentFactory(NzPopoverComponent);

  protected getProxyPropertyMap(): PropertyMapping {
    return {
      nzPopoverBackdrop: ['nzBackdrop', () => this.nzPopoverBackdrop],
      ...super.getProxyPropertyMap()
    };
  }

  constructor(
    elementRef: ElementRef,
    hostView: ViewContainerRef,
    resolver: ComponentFactoryResolver,
    renderer: Renderer2,
    @Host() @Optional() public noAnimation?: NzNoAnimationDirective,
    nzConfigService?: NzConfigService
  ) {
    super(elementRef, hostView, resolver, renderer, noAnimation, nzConfigService);
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
      [cdkConnectedOverlayHasBackdrop]="hasBackdrop"
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayPositions]="_positions"
      [cdkConnectedOverlayOpen]="_visible"
      [cdkConnectedOverlayPush]="true"
      [nzArrowPointAtCenter]="nzArrowPointAtCenter"
      (overlayOutsideClick)="onClickOutside($event)"
      (detach)="hide()"
      (positionChange)="onPositionChange($event)"
    >
      <div
        class="ant-popover"
        [class.ant-popover-rtl]="dir === 'rtl'"
        [ngClass]="_classMap"
        [ngStyle]="nzOverlayStyle"
        [@.disabled]="noAnimation?.nzNoAnimation"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        [@zoomBigMotion]="'active'"
      >
        <div class="ant-popover-content">
          <div class="ant-popover-arrow">
            <span class="ant-popover-arrow-content"></span>
          </div>
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
  _prefix = 'ant-popover';

  constructor(
    cdr: ChangeDetectorRef,
    @Optional() directionality: Directionality,
    @Host() @Optional() public noAnimation?: NzNoAnimationDirective
  ) {
    super(cdr, directionality, noAnimation);
  }

  get hasBackdrop(): boolean {
    return this.nzTrigger === 'click' ? this.nzBackdrop : false;
  }

  protected isEmpty(): boolean {
    return isTooltipEmpty(this.nzTitle) && isTooltipEmpty(this.nzContent);
  }
}
