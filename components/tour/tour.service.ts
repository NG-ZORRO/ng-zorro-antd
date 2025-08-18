/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ConnectionPositionPair,
  FlexibleConnectedPositionStrategyOrigin,
  Overlay,
  OverlayRef
} from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, type ComponentRef, inject, Injector } from '@angular/core';

import { DEFAULT_TOUR_POSITIONS, overlayZIndexSetter, POSITION_MAP, POSITION_TYPE } from 'ng-zorro-antd/core/overlay';

import { NzTourMaskComponent } from './mask';
import { NzTourComponent } from './tour';
import { NzTourRef } from './tour-ref';
import { NzTourOptions, NzTourPlacement, TourPlacements } from './types';

export const DEFAULT_PLACEMENT: NzTourPlacement = 'bottom';

@Injectable({
  providedIn: 'root'
})
export class NzTourService {
  private readonly overlay = inject(Overlay);
  private readonly platform = inject(Platform);
  private readonly injector = inject(Injector);
  private tourRef?: NzTourRef | null;
  private overlayRef?: OverlayRef | null;
  private stepRef?: ComponentRef<NzTourComponent> | null;
  private maskOverlayRef?: OverlayRef | null;
  private maskRef?: ComponentRef<NzTourMaskComponent> | null;

  start(options: NzTourOptions): void {
    if (!this.platform.isBrowser) {
      return;
    }

    this.tourRef?.dispose();
    this.tourRef = new NzTourRef(this, options);
    this.tourRef.start();
  }

  close(): void {
    this.tourRef?.dispose();
    this.tourRef = null;

    // Detach mask overlay if it exists
    this.detachMask();
    this.detachStep();
  }

  private createInjector(tourRef: NzTourRef): Injector {
    return Injector.create({
      parent: this.injector,
      providers: [{ provide: NzTourRef, useValue: tourRef }]
    });
  }

  attachOrUpdateStep(target: FlexibleConnectedPositionStrategyOrigin | null, tourRef: NzTourRef): void {
    const positionStrategy = target
      ? this.overlay
          .position()
          .flexibleConnectedTo(target)
          .withPositions(
            this.getPositions(tourRef.currentPlacement || DEFAULT_PLACEMENT).map(position =>
              this.setPositionOffset(position, tourRef.gap.offset)
            )
          )
      : this.overlay.position().global().top('0').left('0');

    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create({
        hasBackdrop: false,
        positionStrategy,
        scrollStrategy: this.overlay.scrollStrategies.block()
      });
    } else {
      this.overlayRef.updatePositionStrategy(positionStrategy);
    }
    overlayZIndexSetter(this.overlayRef, tourRef.zIndex);

    if (target === null) {
      this.overlayRef.addPanelClass('ant-tour-container-centered');
    } else {
      this.overlayRef.removePanelClass('ant-tour-container-centered');
    }

    if (this.overlayRef.hasAttached()) {
      this.detachStep();
    }

    this.stepRef = this.overlayRef.attach(new ComponentPortal(NzTourComponent, null, this.createInjector(tourRef)));
  }

  attachOrUpdateMask(
    target: FlexibleConnectedPositionStrategyOrigin | null,
    opts: {
      zIndex: number;
      padding?: number;
      radius?: number;
      fill?: string;
      disabledInteraction?: boolean;
      animated?: boolean;
    }
  ): void {
    if (!this.maskOverlayRef) {
      this.maskOverlayRef = this.overlay.create({
        hasBackdrop: false,
        positionStrategy: this.overlay.position().global().top('0').left('0'),
        scrollStrategy: this.overlay.scrollStrategies.reposition()
      });
      const pane = this.maskOverlayRef.hostElement as HTMLElement;
      pane.style.width = '100%';
      pane.style.height = '100%';
    }

    const { zIndex, padding, radius, fill, disabledInteraction, animated } = opts || {};

    overlayZIndexSetter(this.maskOverlayRef, zIndex);

    if (!this.maskRef || !this.maskOverlayRef.hasAttached()) {
      this.maskRef = this.maskOverlayRef.attach(new ComponentPortal(NzTourMaskComponent));
    }

    this.maskRef!.setInput('zIndex', zIndex);
    this.maskRef!.setInput('target', target);
    if (padding != null) this.maskRef!.setInput('padding', padding);
    if (radius != null) this.maskRef!.setInput('radius', radius);
    if (fill != null) this.maskRef!.setInput('fill', fill);
    if (disabledInteraction != null) this.maskRef!.setInput('disabledInteraction', disabledInteraction);
    if (animated != null) this.maskRef!.setInput('animated', animated);
  }

  getPositions(placement: NzTourPlacement): ConnectionPositionPair[] {
    if (TourPlacements.includes(placement)) {
      if (placement === 'center') {
        return [
          new ConnectionPositionPair(
            { originX: 'center', originY: 'center' },
            { overlayX: 'center', overlayY: 'center' }
          )
        ];
      }
      return [POSITION_MAP[placement as POSITION_TYPE]];
    } else {
      return DEFAULT_TOUR_POSITIONS;
    }
  }

  private setPositionOffset(
    position: ConnectionPositionPair,
    offset: number | [number, number]
  ): ConnectionPositionPair {
    const [offsetX, offsetY] = Array.isArray(offset) ? offset : [offset, offset];
    position.offsetX = offsetX;
    position.offsetY = offsetY;
    return position;
  }

  detachStep(): void {
    this.overlayRef?.detach();
    this.stepRef?.destroy();
    this.stepRef = null;
  }

  detachMask(): void {
    this.maskOverlayRef?.detach();
  }

  dispose(): void {
    this.overlayRef?.dispose();
    this.overlayRef = null;
    this.stepRef = null;
    this.maskOverlayRef?.dispose();
    this.maskOverlayRef = null;
    this.maskRef = null;
    this.tourRef = null;
  }
}
