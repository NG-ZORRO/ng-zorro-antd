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
  ContentChild,
  Host,
  Input,
  Optional,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { NzNoAnimationDirective, NzTSType, zoomBigMotion } from 'ng-zorro-antd/core';

import { isTooltipEmpty, NzTooltipBaseComponent } from './base.component';

@Component({
  selector: 'nz-tooltip',
  exportAs: 'nzTooltipComponent',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [zoomBigMotion],
  preserveWhitespaces: false,
  template: `
    <ng-content></ng-content>
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
    super(cdr);
  }

  protected isEmpty(): boolean {
    return isTooltipEmpty(this.title);
  }
}
