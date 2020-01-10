/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedOverlayPositionChange, ConnectionPositionPair } from '@angular/cdk/overlay';
import { ChangeDetectorRef, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

import {
  DEFAULT_TOOLTIP_POSITIONS,
  getPlacementName,
  isNotNil,
  NgClassInterface,
  NgStyleInterface,
  NzNoAnimationDirective,
  NzTSType,
  POSITION_MAP,
  toBoolean
} from 'ng-zorro-antd/core';

import { NzTooltipTrigger } from './nz-tooltip.definitions';

export abstract class NzTooltipBaseComponent implements OnDestroy {
  @ViewChild('overlay', { static: false }) overlay: CdkConnectedOverlay;

  nzVisibleChange = new Subject<boolean>();
  nzTitle: NzTSType | null;
  nzContent: NzTSType | null;
  nzOverlayClassName: string;
  nzOverlayStyle: NgStyleInterface = {};
  nzMouseEnterDelay: number = 0.15;
  nzMouseLeaveDelay: number = 0.1;

  set nzVisible(value: boolean) {
    const visible = toBoolean(value);
    if (this._visible !== visible) {
      this._visible = visible;
    }
  }

  get nzVisible(): boolean {
    return this._visible;
  }

  _visible = false;

  set nzTrigger(value: NzTooltipTrigger) {
    this._trigger = value;
    this._hasBackdrop = this._trigger === 'click';
  }

  get nzTrigger(): NzTooltipTrigger {
    return this._trigger;
  }

  protected _trigger: NzTooltipTrigger = 'hover';

  set nzPlacement(value: string) {
    if (value !== this.preferredPlacement) {
      this.preferredPlacement = value;
      this._positions = [POSITION_MAP[this.nzPlacement], ...this._positions];
    }
  }

  get nzPlacement(): string {
    return this.preferredPlacement;
  }

  nzContentTemplate: TemplateRef<void>;
  nzTitleTemplate: TemplateRef<void>;
  origin: CdkOverlayOrigin;
  preferredPlacement = 'top';

  _classMap: NgClassInterface = {};
  _hasBackdrop = false;
  _prefix = 'ant-tooltip-placement';
  _positions: ConnectionPositionPair[] = [...DEFAULT_TOOLTIP_POSITIONS];

  get content(): string | TemplateRef<void> | null {
    return this.nzContent !== undefined ? this.nzContent : this.nzContentTemplate;
  }

  get title(): string | TemplateRef<void> | null {
    return this.nzTitle !== undefined ? this.nzTitle : this.nzTitleTemplate;
  }

  constructor(public cdr: ChangeDetectorRef, public noAnimation?: NzNoAnimationDirective) {}

  ngOnDestroy(): void {
    this.nzVisibleChange.complete();
  }

  show(): void {
    if (this.nzVisible) {
      return;
    }

    if (!this.isEmpty()) {
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
    this.preferredPlacement = getPlacementName(position)!;
    this.setClassMap();
    this.cdr.detectChanges();
  }

  setClassMap(): void {
    this._classMap = {
      [this.nzOverlayClassName]: true,
      [`${this._prefix}-${this.preferredPlacement}`]: true
    };
  }

  setOverlayOrigin(origin: CdkOverlayOrigin): void {
    this.origin = origin;
    this.cdr.markForCheck();
  }

  /**
   * Empty tooltip cannot be openned.
   */
  protected abstract isEmpty(): boolean;
}

export function isTooltipEmpty(value: string | TemplateRef<void> | null): boolean {
  return value instanceof TemplateRef ? false : value === '' || !isNotNil(value);
}
