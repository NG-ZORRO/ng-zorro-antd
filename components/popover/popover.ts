/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OverlayModule } from '@angular/cdk/overlay';
import { NgClass, NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
  booleanAttribute
} from '@angular/core';

import { zoomBigMotion } from 'ng-zorro-antd/core/animation';
import { NzConfigKey, WithConfig } from 'ng-zorro-antd/core/config';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzOverlayModule } from 'ng-zorro-antd/core/overlay';
import { NgStyleInterface, NzTSType } from 'ng-zorro-antd/core/types';
import {
  NzToolTipComponent,
  NzTooltipBaseDirective,
  NzTooltipTrigger,
  PropertyMapping,
  isTooltipEmpty
} from 'ng-zorro-antd/tooltip';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'popover';

@Directive({
  selector: '[nz-popover]',
  exportAs: 'nzPopover',
  host: {
    '[class.ant-popover-open]': 'visible'
  },
  standalone: true
})
export class NzPopoverDirective extends NzTooltipBaseDirective {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  @Input({ alias: 'nzPopoverArrowPointAtCenter', transform: booleanAttribute }) override arrowPointAtCenter?: boolean;
  @Input('nzPopoverTitle') override title?: NzTSType;
  @Input('nzPopoverContent') override content?: NzTSType;
  @Input('nz-popover') override directiveTitle?: NzTSType | null;
  @Input('nzPopoverTrigger') override trigger?: NzTooltipTrigger = 'hover';
  @Input('nzPopoverPlacement') override placement?: string | string[] = 'top';
  @Input('nzPopoverOrigin') override origin?: ElementRef<HTMLElement>;
  @Input('nzPopoverVisible') override visible?: boolean;
  @Input('nzPopoverMouseEnterDelay') override mouseEnterDelay?: number;
  @Input('nzPopoverMouseLeaveDelay') override mouseLeaveDelay?: number;
  @Input('nzPopoverOverlayClassName') override overlayClassName?: string;
  @Input('nzPopoverOverlayStyle') override overlayStyle?: NgStyleInterface;

  @Input() @WithConfig() nzPopoverBackdrop?: boolean = false;

  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('nzPopoverVisibleChange') override readonly visibleChange = new EventEmitter<boolean>();

  protected override getProxyPropertyMap(): PropertyMapping {
    return {
      nzPopoverBackdrop: ['nzBackdrop', () => this.nzPopoverBackdrop],
      ...super.getProxyPropertyMap()
    };
  }

  constructor() {
    super(NzPopoverComponent);
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
      [cdkConnectedOverlayPush]="cdkConnectedOverlayPush"
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
        [@.disabled]="!!noAnimation?.nzNoAnimation"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        [@zoomBigMotion]="'active'"
      >
        <div class="ant-popover-content">
          <div class="ant-popover-arrow">
            <span class="ant-popover-arrow-content"></span>
          </div>
          <div class="ant-popover-inner" role="tooltip">
            <div>
              @if (nzTitle) {
                <div class="ant-popover-title">
                  <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
                </div>
              }
              <div class="ant-popover-inner-content">
                <ng-container *nzStringTemplateOutlet="nzContent">{{ nzContent }}</ng-container>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ng-template>
  `,
  imports: [OverlayModule, NzOverlayModule, NgClass, NgStyle, NzNoAnimationDirective, NzOutletModule],
  standalone: true
})
export class NzPopoverComponent extends NzToolTipComponent {
  override _prefix = 'ant-popover';

  get hasBackdrop(): boolean {
    return this.nzTrigger === 'click' ? this.nzBackdrop : false;
  }

  protected override isEmpty(): boolean {
    return isTooltipEmpty(this.nzTitle) && isTooltipEmpty(this.nzContent);
  }
}
