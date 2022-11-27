/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
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
import { isPresetColor, NzPresetColor } from 'ng-zorro-antd/core/color';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { BooleanInput, NgStyleInterface, NzTSType } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';

import {
  isTooltipEmpty,
  NzTooltipBaseComponent,
  NzTooltipBaseDirective,
  NzTooltipTrigger,
  PropertyMapping
} from './base';

@Directive({
  selector: '[nz-tooltip]',
  exportAs: 'nzTooltip',
  host: {
    '[class.ant-tooltip-open]': 'visible'
  }
})
export class NzTooltipDirective extends NzTooltipBaseDirective {
  static ngAcceptInputType_nzTooltipArrowPointAtCenter: BooleanInput;

  @Input('nzTooltipTitle') override title?: NzTSType | null;
  @Input('nzTooltipTitleContext') titleContext?: Object | null = null;
  @Input('nz-tooltip') override directiveTitle?: NzTSType | null;
  @Input('nzTooltipTrigger') override trigger?: NzTooltipTrigger = 'hover';
  @Input('nzTooltipPlacement') override placement?: string | string[] = 'top';
  @Input('nzTooltipOrigin') override origin?: ElementRef<HTMLElement>;
  @Input('nzTooltipVisible') override visible?: boolean;
  @Input('nzTooltipMouseEnterDelay') override mouseEnterDelay?: number;
  @Input('nzTooltipMouseLeaveDelay') override mouseLeaveDelay?: number;
  @Input('nzTooltipOverlayClassName') override overlayClassName?: string;
  @Input('nzTooltipOverlayStyle') override overlayStyle?: NgStyleInterface;
  @Input('nzTooltipArrowPointAtCenter') @InputBoolean() override arrowPointAtCenter?: boolean;
  @Input() nzTooltipColor?: string;

  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('nzTooltipVisibleChange') override readonly visibleChange = new EventEmitter<boolean>();

  override componentRef: ComponentRef<NzToolTipComponent> = this.hostView.createComponent(NzToolTipComponent);

  constructor(
    elementRef: ElementRef,
    hostView: ViewContainerRef,
    resolver: ComponentFactoryResolver,
    renderer: Renderer2,
    @Host() @Optional() noAnimation?: NzNoAnimationDirective
  ) {
    super(elementRef, hostView, resolver, renderer, noAnimation);
  }

  protected override getProxyPropertyMap(): PropertyMapping {
    return {
      ...super.getProxyPropertyMap(),
      nzTooltipColor: ['nzColor', () => this.nzTooltipColor],
      nzTooltipTitleContext: ['nzTitleContext', () => this.titleContext]
    };
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
      [cdkConnectedOverlayPositions]="_positions"
      [cdkConnectedOverlayPush]="true"
      [nzArrowPointAtCenter]="nzArrowPointAtCenter"
      (overlayOutsideClick)="onClickOutside($event)"
      (detach)="hide()"
      (positionChange)="onPositionChange($event)"
    >
      <div
        class="ant-tooltip"
        [class.ant-tooltip-rtl]="dir === 'rtl'"
        [ngClass]="_classMap"
        [ngStyle]="nzOverlayStyle"
        [@.disabled]="!!noAnimation?.nzNoAnimation"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        [@zoomBigMotion]="'active'"
      >
        <div class="ant-tooltip-content">
          <div class="ant-tooltip-arrow">
            <span class="ant-tooltip-arrow-content" [ngStyle]="_contentStyleMap"></span>
          </div>
          <div class="ant-tooltip-inner" [ngStyle]="_contentStyleMap">
            <ng-container *nzStringTemplateOutlet="nzTitle; context: nzTitleContext">{{ nzTitle }}</ng-container>
          </div>
        </div>
      </div>
    </ng-template>
  `,
  preserveWhitespaces: false
})
export class NzToolTipComponent extends NzTooltipBaseComponent {
  override nzTitle: NzTSType | null = null;
  nzTitleContext: Object | null = null;

  nzColor?: string | NzPresetColor;

  _contentStyleMap: NgStyleInterface = {};

  constructor(
    cdr: ChangeDetectorRef,
    @Optional() directionality: Directionality,
    @Host() @Optional() noAnimation?: NzNoAnimationDirective
  ) {
    super(cdr, directionality, noAnimation);
  }

  protected isEmpty(): boolean {
    return isTooltipEmpty(this.nzTitle);
  }

  protected override updateStyles(): void {
    const isColorPreset = this.nzColor && isPresetColor(this.nzColor);

    this._classMap = {
      [this.nzOverlayClassName]: true,
      [`${this._prefix}-placement-${this.preferredPlacement}`]: true,
      [`${this._prefix}-${this.nzColor}`]: isColorPreset
    };

    this._contentStyleMap = {
      backgroundColor: !!this.nzColor && !isColorPreset ? this.nzColor : null
    };
  }
}
