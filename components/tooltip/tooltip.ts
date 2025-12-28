/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OverlayModule } from '@angular/cdk/overlay';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

import { NzNoAnimationDirective, withAnimationCheck } from 'ng-zorro-antd/core/animation';
import { isPresetColor, NzPresetColor } from 'ng-zorro-antd/core/color';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzOverlayModule } from 'ng-zorro-antd/core/overlay';
import { NgStyleInterface, NzTSType } from 'ng-zorro-antd/core/types';

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
  /* eslint-disable @angular-eslint/no-input-rename, @angular-eslint/no-output-rename */
  @Input('nzTooltipTitle') override title?: NzTSType | null;
  @Input('nzTooltipTitleContext') titleContext?: object | null = null;
  @Input('nz-tooltip') override directiveTitle?: NzTSType | null;
  @Input('nzTooltipTrigger') override trigger?: NzTooltipTrigger = 'hover';
  @Input('nzTooltipPlacement') override placement?: string | string[] = 'top';
  @Input('nzTooltipOrigin') override origin?: ElementRef<HTMLElement>;
  @Input('nzTooltipVisible') override visible?: boolean;
  @Input('nzTooltipMouseEnterDelay') override mouseEnterDelay?: number;
  @Input('nzTooltipMouseLeaveDelay') override mouseLeaveDelay?: number;
  @Input('nzTooltipOverlayClassName') override overlayClassName?: string;
  @Input('nzTooltipOverlayStyle') override overlayStyle?: NgStyleInterface;
  @Input({ alias: 'nzTooltipArrowPointAtCenter', transform: booleanAttribute }) override arrowPointAtCenter?: boolean;
  /** @deprecated Default is false, and customization is no longer supported. This will be removed in v22.0.0. */
  @Input({ transform: booleanAttribute }) override cdkConnectedOverlayPush?: boolean = false;
  @Input() nzTooltipColor?: string;

  override directiveContent?: NzTSType | null = null;
  override content?: NzTSType | null = null;
  override overlayClickable?: boolean;

  @Output('nzTooltipVisibleChange') override readonly visibleChange = new EventEmitter<boolean>();

  constructor() {
    super(NzTooltipComponent);
  }

  protected override getProxyPropertyMap(): PropertyMapping {
    return {
      ...super.getProxyPropertyMap(),
      nzTooltipColor: ['nzColor', () => this.nzTooltipColor],
      titleContext: ['nzTitleContext', () => this.titleContext]
    };
  }
}

@Component({
  selector: 'nz-tooltip',
  exportAs: 'nzTooltipComponent',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-template
      #overlay="cdkConnectedOverlay"
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="_visible"
      [cdkConnectedOverlayPositions]="_positions"
      [cdkConnectedOverlayPush]="cdkConnectedOverlayPush"
      [nzArrowPointAtCenter]="nzArrowPointAtCenter"
      (overlayOutsideClick)="onClickOutside($event)"
      (detach)="hide()"
      (positionChange)="onPositionChange($event)"
    >
      <div
        class="ant-tooltip"
        [class.ant-tooltip-rtl]="dir() === 'rtl'"
        [class]="_classMap"
        [style]="nzOverlayStyle"
        [nzNoAnimation]="!!noAnimation?.nzNoAnimation?.()"
        [animate.enter]="zoomAnimationEnter()"
        [animate.leave]="zoomAnimationLeave()"
      >
        <div class="ant-tooltip-arrow" [style]="_arrowStyleMap"></div>
        <div class="ant-tooltip-content">
          <div class="ant-tooltip-inner" [style]="_contentStyleMap">
            <ng-container *nzStringTemplateOutlet="nzTitle; context: nzTitleContext">{{ nzTitle }}</ng-container>
          </div>
        </div>
      </div>
    </ng-template>
  `,
  imports: [OverlayModule, NzNoAnimationDirective, NzOutletModule, NzOverlayModule]
})
export class NzTooltipComponent extends NzTooltipBaseComponent {
  protected _animationPrefix = 'ant-zoom-big-fast';
  override nzTitle: NzTSType | null = null;
  nzTitleContext: object | null = null;
  nzColor?: string | NzPresetColor;

  protected _arrowStyleMap: NgStyleInterface = {};
  protected _contentStyleMap: NgStyleInterface = {};

  protected readonly zoomAnimationEnter = withAnimationCheck(
    () => `${this._animationPrefix}-enter ${this._animationPrefix}-enter-active`
  );
  protected readonly zoomAnimationLeave = withAnimationCheck(
    () => `${this._animationPrefix}-leave ${this._animationPrefix}-leave-active`
  );

  protected isEmpty(): boolean {
    return isTooltipEmpty(this.nzTitle);
  }

  protected override updateStyles(): void {
    const isColorPreset = this.nzColor && isPresetColor(this.nzColor);

    this._classMap = {
      ...this.transformClassListToMap(this.nzOverlayClassName),
      [`${this._prefix}-placement-${this.preferredPlacement}`]: true,
      [`${this._prefix}-${this.nzColor}`]: isColorPreset
    };

    this._contentStyleMap = {
      backgroundColor: !!this.nzColor && !isColorPreset ? this.nzColor : null
    };

    this._arrowStyleMap = {
      '--antd-arrow-background-color': !!this.nzColor && !isColorPreset ? this.nzColor : null
    };
  }
}
