/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ConnectedOverlayPositionChange,
  ConnectionPositionPair
} from '@angular/cdk/overlay';
import { ChangeDetectorRef, EventEmitter, Output, TemplateRef } from '@angular/core';
import {
  getPlacementName,
  isNotNil,
  DEFAULT_TOOLTIP_POSITIONS,
  NgClassInterface,
  NgStyleInterface,
  NzNoAnimationDirective,
  NzTSType
} from 'ng-zorro-antd/core';

import { NzTooltipTrigger } from '../nz-tooltip.definitions';

/**
 * Tooltip component. Also the base component for legacy components.
 */
export abstract class NzTooltipBaseComponent {
  nzTitle: NzTSType | null = null;
  nzContent: NzTSType | null = null;
  nzVisible: boolean;
  nzPlacement: string;
  nzOverlayClassName: string;
  nzOverlayStyle: NgStyleInterface;
  nzMouseEnterDelay: number;
  nzMouseLeaveDelay: number;
  nzTrigger: NzTooltipTrigger;

  @Output() readonly nzVisibleChange = new EventEmitter<boolean>();

  overlay: CdkConnectedOverlay;
  origin: CdkOverlayOrigin;

  _classMap: NgClassInterface = {};
  _hasBackdrop = false;
  _prefix = 'ant-tooltip-placement';
  _visible = false;
  _positions: ConnectionPositionPair[] = [...DEFAULT_TOOLTIP_POSITIONS];
  _placement = 'top';
  _trigger: NzTooltipTrigger = 'hover';

  constructor(public cdr: ChangeDetectorRef, public noAnimation?: NzNoAnimationDirective) {}

  show(): void {
    if (this.nzVisible) {
      return;
    }

    if (!this.isTitleEmpty() || !this.isContentEmpty()) {
      this.nzVisible = true;
      this.nzVisibleChange.next(true);
      this.cdr.detectChanges();
    }
  }

  hide(): void {
    if (!this.nzVisible) {
      return;
    }

    this.nzVisible = false;
    this.nzVisibleChange.next(false);
    this.cdr.detectChanges();
  }

  updateByDirective(): void {
    this.setClassMap();
    this.cdr.detectChanges();

    Promise.resolve().then(() => {
      this.updatePosition();
    });
  }

  /**
   * Force the component to update its position.
   */
  updatePosition(): void {
    if (this.origin && this.overlay && this.overlay.overlayRef) {
      this.overlay.overlayRef.updatePosition();
    }
  }

  onPositionChange(position: ConnectedOverlayPositionChange): void {
    this._placement = getPlacementName(position)!;
    this.setClassMap();
    this.cdr.detectChanges();
  }

  setClassMap(): void {
    this._classMap = {
      [this.nzOverlayClassName]: true,
      [`${this._prefix}-${this._placement}`]: true
    };
  }

  setOverlayOrigin(origin: CdkOverlayOrigin): void {
    this.origin = origin;
    this.cdr.markForCheck();
  }

  private isTitleEmpty(): boolean {
    return this.nzTitle instanceof TemplateRef ? false : this.nzTitle === '' || !isNotNil(this.nzTitle);
  }

  private isContentEmpty(): boolean {
    return this.nzContent instanceof TemplateRef ? false : this.nzContent === '' || !isNotNil(this.nzContent);
  }
}
