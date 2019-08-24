/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { ChangeDetectorRef, EventEmitter, Host, Input, OnChanges, Optional, Output, ViewChild } from '@angular/core';
import { toBoolean, NgStyleInterface, NzNoAnimationDirective, POSITION_MAP } from 'ng-zorro-antd/core';

import { NzTooltipTrigger } from '../nz-tooltip.definitions';
import { NzTooltipBaseComponent } from './nz-tooltip-base.component';

/**
 * This component overrides some properties of `NzTooltipBaseComponent` and make them
 * input properties.
 *
 * @deprecated 9.0.0 tooltip and other components deprecate the old API. This
 * would be removed in 9.0.0.
 *
 * @example This example is what going to be removed
 *
 * ```html
 * <nz-tooltip>
 *   <a nz-tooltip></a>
 * </nz-tooltip>
 * ```
 */
export class NzTooltipBaseComponentLegacy extends NzTooltipBaseComponent implements OnChanges {
  @ViewChild('overlay', { static: false }) overlay: CdkConnectedOverlay;

  @Input() nzOverlayClassName = '';
  @Input() nzOverlayStyle: NgStyleInterface = {};
  @Input() nzMouseEnterDelay = 0.15; // second
  @Input() nzMouseLeaveDelay = 0.1; // second

  // TODO: placement logic should be removed into `NzTooltipBaseDirective` once this component is removed.
  @Input()
  set nzPlacement(value: string) {
    if (value !== this._placement) {
      this._placement = value;
      this._positions = [POSITION_MAP[this.nzPlacement], ...this._positions];
    }
  }

  get nzPlacement(): string {
    return this._placement;
  }

  @Input()
  set nzVisible(value: boolean) {
    const visible = toBoolean(value);
    if (this._visible !== visible) {
      this._visible = visible;
      this.nzVisibleChange.emit(visible);
    }
  }

  get nzVisible(): boolean {
    return this._visible;
  }

  @Input()
  set nzTrigger(value: NzTooltipTrigger) {
    this._trigger = value;
    this._hasBackdrop = this._trigger === 'click';
  }

  get nzTrigger(): NzTooltipTrigger {
    return this._trigger;
  }

  @Output() readonly nzVisibleChange = new EventEmitter<boolean>();

  constructor(cdr: ChangeDetectorRef, @Host() @Optional() public noAnimation?: NzNoAnimationDirective) {
    super(cdr, noAnimation);
  }

  ngOnChanges(): void {
    Promise.resolve().then(() => {
      this.updatePosition();
    });
  }
}
