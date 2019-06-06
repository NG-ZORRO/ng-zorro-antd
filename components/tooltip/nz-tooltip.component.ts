/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { AnimationEvent } from '@angular/animations';
import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ConnectedOverlayPositionChange,
  ConnectionPositionPair
} from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Host,
  Input,
  OnChanges,
  Optional,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import {
  getPlacementName,
  isNotNil,
  toBoolean,
  zoomBigMotion,
  DEFAULT_TOOLTIP_POSITIONS,
  NzNoAnimationDirective,
  POSITION_MAP
} from 'ng-zorro-antd/core';

@Component({
  selector: 'nz-tooltip',
  exportAs: 'nzTooltipComponent',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [zoomBigMotion],
  templateUrl: './nz-tooltip.component.html',
  preserveWhitespaces: false,
  styles: [
    `
      .ant-tooltip {
        position: relative;
      }
    `
  ]
})
export class NzToolTipComponent implements OnChanges {
  _hasBackdrop = false;
  _prefix = 'ant-tooltip-placement';
  _positions: ConnectionPositionPair[] = [...DEFAULT_TOOLTIP_POSITIONS];
  _classMap = {};
  _placement = 'top';
  _trigger = 'hover';
  overlayOrigin: CdkOverlayOrigin;
  visibleSource = new BehaviorSubject<boolean>(false);
  visible$: Observable<boolean> = this.visibleSource.asObservable();
  @ViewChild('overlay') overlay: CdkConnectedOverlay;
  @Input() @ContentChild('nzTemplate') nzTitle: string | TemplateRef<void> | null;
  @Input() nzOverlayClassName = '';
  @Input() nzOverlayStyle: { [key: string]: string } = {};
  @Input() nzMouseEnterDelay = 0.15; // second
  @Input() nzMouseLeaveDelay = 0.1; // second

  @Input()
  set nzVisible(value: boolean) {
    const visible = toBoolean(value);
    if (this.visibleSource.value !== visible) {
      this.visibleSource.next(visible);
      this.nzVisibleChange.emit(visible);
    }
  }

  get nzVisible(): boolean {
    return this.visibleSource.value;
  }

  @Input()
  set nzTrigger(value: string) {
    this._trigger = value;
    this._hasBackdrop = this._trigger === 'click';
  }

  get nzTrigger(): string {
    return this._trigger;
  }

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

  @Output() readonly nzVisibleChange = new EventEmitter<boolean>();

  [property: string]: any; // tslint:disable-line:no-any

  constructor(public cdr: ChangeDetectorRef, @Host() @Optional() public noAnimation?: NzNoAnimationDirective) {}

  ngOnChanges(): void {
    Promise.resolve().then(() => {
      this.updatePosition();
    });
  }

  // Manually force updating current overlay's position
  updatePosition(): void {
    if (this.overlay && this.overlay.overlayRef) {
      this.overlay.overlayRef.updatePosition();
    }
  }

  onPositionChange(position: ConnectedOverlayPositionChange): void {
    this.nzPlacement = getPlacementName(position)!;
    this.setClassMap();
    this.cdr.detectChanges(); // TODO: performance?
  }

  show(): void {
    if (!this.isContentEmpty()) {
      this.nzVisible = true;
    }
  }

  hide(): void {
    this.nzVisible = false;
  }

  _afterVisibilityAnimation(e: AnimationEvent): void {
    if (e.toState === 'false' && !this.nzVisible) {
      this.nzVisibleChange.emit(false);
    }
    if (e.toState === 'true' && this.nzVisible) {
      this.nzVisibleChange.emit(true);
    }
  }

  setClassMap(): void {
    this._classMap = {
      [this.nzOverlayClassName]: true,
      [`${this._prefix}-${this._placement}`]: true
    };
  }

  setOverlayOrigin(origin: CdkOverlayOrigin): void {
    this.overlayOrigin = origin;
  }

  protected isContentEmpty(): boolean {
    return this.nzTitle instanceof TemplateRef ? false : this.nzTitle === '' || !isNotNil(this.nzTitle);
  }
}
