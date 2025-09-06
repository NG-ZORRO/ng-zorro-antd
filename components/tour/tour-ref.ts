/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { coerceElement } from '@angular/cdk/coercion';
import {
  ConnectionPositionPair,
  createBlockScrollStrategy,
  createFlexibleConnectedPositionStrategy,
  createGlobalPositionStrategy,
  createOverlayRef,
  createRepositionScrollStrategy,
  FlexibleConnectedPositionStrategy,
  FlexibleConnectedPositionStrategyOrigin,
  OverlayRef
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { type ComponentRef, computed, Injector, signal, TemplateRef, WritableSignal } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DEFAULT_TOUR_POSITIONS, overlayZIndexSetter, POSITION_MAP, POSITION_TYPE } from 'ng-zorro-antd/core/overlay';
import { isNotNil, scrollIntoView } from 'ng-zorro-antd/core/util';
import { NZ_TOUR_MASK_GAP_DEFAULT } from 'ng-zorro-antd/tour/constant';
import { NzTourMaskComponent } from 'ng-zorro-antd/tour/mask';
import { NzTourComponent } from 'ng-zorro-antd/tour/tour';

import { DEFAULT_PLACEMENT } from './tour.service';
import {
  NzTourMaskGap,
  NzTourMaskOptions,
  NzTourOptions,
  NzTourPlacement,
  NzTourStep,
  NzTourTemplateContext,
  TourPlacements
} from './types';
import { isInViewport, normalizeGapOffset, normalizeMaskColor } from './utils';

export class NzTourRef {
  private tourRef?: NzTourRef | null;
  private overlayRef?: OverlayRef | null;
  private stepRef?: ComponentRef<NzTourComponent> | null;
  private maskOverlayRef?: OverlayRef | null;
  private maskRef?: ComponentRef<NzTourMaskComponent> | null;

  steps!: NzTourStep[];
  zIndex: number = 1001;
  mask: boolean | NzTourMaskOptions = true;
  gap: NzTourMaskGap;
  placement: NzTourPlacement = DEFAULT_PLACEMENT;
  indicatorsRender?: TemplateRef<NzTourTemplateContext>;

  private readonly destroy$ = new Subject<void>();

  // current step index
  current!: WritableSignal<number>;
  readonly currentStep = computed(() => this.steps[this.current()]);
  readonly currentStepTarget$ = new ReplaySubject<FlexibleConnectedPositionStrategyOrigin | null>(1);
  currentPlacement: NzTourPlacement = DEFAULT_PLACEMENT;

  constructor(
    private readonly injector: Injector,
    readonly options: NzTourOptions
  ) {
    const { steps, zIndex = 1001, mask = true, gap, placement = DEFAULT_PLACEMENT, indicatorsRender } = options;
    this.steps = steps;
    this.zIndex = zIndex;
    this.mask = mask;
    this.placement = placement;
    this.gap = { ...NZ_TOUR_MASK_GAP_DEFAULT, ...gap };
    this.indicatorsRender = indicatorsRender;
  }

  private subscribeTargetChange(): void {
    this.currentStepTarget$.pipe(takeUntil(this.destroy$)).subscribe(target => {
      if (target) {
        const targetEl = coerceElement(target);
        if (!isInViewport(targetEl)) {
          scrollIntoView(targetEl);
        }
      }
      this.attachOrUpdateStep(target);
    });
  }

  protected loadStep(index: number = this.current()): void {
    const step = this.steps[index];
    const target = this.getOriginTarget();

    this.currentPlacement = this.normalizePlacement(step.placement, step.target);
    const mergedMask = step.mask ?? this.mask;
    if (mergedMask) {
      this.attachOrUpdateMask(target, {
        zIndex: this.zIndex,
        radius: this.gap.radius,
        offset: normalizeGapOffset(this.gap.offset),
        fill: normalizeMaskColor(mergedMask)
      });
    } else {
      this.maskRef?.destroy();
    }

    this.currentStepTarget$.next(target);
  }

  start(): void {
    this.current = signal(0);
    this.loadStep();
    this.subscribeTargetChange();
  }

  next(): void {
    this.current.update(index => (index < this.steps.length - 1 ? index + 1 : index));
    this.loadStep();
  }

  prev(): void {
    this.current.update(index => (index > 0 ? index - 1 : index));
    this.loadStep();
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

  attachOrUpdateStep(target: FlexibleConnectedPositionStrategyOrigin | null): void {
    const positionStrategy = target
      ? createFlexibleConnectedPositionStrategy(this.injector, target).withPositions(
          this.getPositions(this.currentPlacement, this.gap.offset)
        )
      : createGlobalPositionStrategy(this.injector).top('0').left('0');

    if (!this.overlayRef) {
      this.overlayRef = createOverlayRef(this.injector, {
        hasBackdrop: false,
        positionStrategy,
        scrollStrategy: createBlockScrollStrategy(this.injector)
      });
    } else {
      this.overlayRef.updatePositionStrategy(positionStrategy);
    }

    overlayZIndexSetter(this.overlayRef, this.zIndex);

    if (target === null) {
      this.overlayRef.addPanelClass('ant-tour-container-centered');
    } else {
      this.overlayRef.removePanelClass('ant-tour-container-centered');
    }

    if (this.overlayRef.hasAttached()) {
      this.detachStep();
    }

    this.stepRef = this.overlayRef.attach(new ComponentPortal(NzTourComponent, null, this.createInjector(this)));
    this.stepRef.setInput('nzPlacement', this.currentPlacement);
    this.stepRef.setInput('nzIndicatorsRender', this.indicatorsRender);
  }

  attachOrUpdateMask(
    target: FlexibleConnectedPositionStrategyOrigin | null,
    opts: {
      zIndex: number;
      offset?: number | [number, number];
      radius?: number;
      fill?: string;
    }
  ): void {
    if (!this.maskOverlayRef) {
      this.maskOverlayRef = createOverlayRef(this.injector, {
        hasBackdrop: false,
        positionStrategy: createGlobalPositionStrategy(this.injector).top('0').left('0'),
        scrollStrategy: createRepositionScrollStrategy(this.injector)
      });
      const pane = this.maskOverlayRef.hostElement as HTMLElement;
      pane.style.width = '100%';
      pane.style.height = '100%';
    }

    const { zIndex, offset, radius, fill } = opts || {};

    overlayZIndexSetter(this.maskOverlayRef, zIndex);

    if (!this.maskRef || !this.maskOverlayRef.hasAttached()) {
      this.maskRef = this.maskOverlayRef.attach(new ComponentPortal(NzTourMaskComponent));
    }

    this.maskRef.setInput('target', target);
    if (offset != null) this.maskRef.setInput('offset', offset);
    if (radius != null) this.maskRef.setInput('radius', radius);
    if (fill != null) this.maskRef.setInput('fill', fill);
  }

  getPositions(placement: NzTourPlacement, offset: number | [number, number]): ConnectionPositionPair[] {
    if (TourPlacements.includes(placement)) {
      if (placement === 'center') {
        return [
          new ConnectionPositionPair(
            { originX: 'center', originY: 'center' },
            { overlayX: 'center', overlayY: 'center' }
          )
        ];
      }
      return [this.setPositionOffset(POSITION_MAP[placement as POSITION_TYPE], offset)];
    } else {
      return DEFAULT_TOUR_POSITIONS.map(pos => this.setPositionOffset(pos, offset));
    }
  }

  private setPositionOffset(
    position: ConnectionPositionPair,
    offset: number | [number, number]
  ): ConnectionPositionPair {
    const [offsetX, offsetY] = normalizeGapOffset(offset);
    // return new object
    return {
      ...position,
      offsetX: offsetX,
      offsetY: offsetY
    };
  }

  detachStep(): void {
    this.overlayRef?.detach();
    this.stepRef?.destroy();
    this.stepRef = null;
  }

  detachMask(): void {
    this.maskOverlayRef?.detach();
  }

  updateMaskGap(options: NzTourMaskGap): void {
    this.gap = options;
    if (this.maskRef) {
      this.maskRef.setInput('offset', this.gap.offset);
      this.maskRef.setInput('radius', this.gap.radius);
    }
    if (this.overlayRef) {
      const positionStrategy = this.overlayRef.getConfig().positionStrategy;
      if (positionStrategy instanceof FlexibleConnectedPositionStrategy) {
        this.overlayRef.updatePositionStrategy(
          positionStrategy.withPositions(this.getPositions(this.currentPlacement, this.gap.offset))
        );
        this.overlayRef.updatePosition();
      }
    }
  }

  private getOriginTarget(): FlexibleConnectedPositionStrategyOrigin | null {
    const rawTarget = this.currentStep().target;
    const target = typeof rawTarget === 'function' ? rawTarget() : rawTarget;
    if (isNotNil(target)) {
      return coerceElement(target);
    }
    return null;
  }

  private normalizePlacement(placement: NzTourStep['placement'], rawTarget: NzTourStep['target']): NzTourPlacement {
    if (rawTarget === null) {
      return 'center';
    }
    return isNotNil(placement) && TourPlacements.includes(placement) ? placement : DEFAULT_PLACEMENT;
  }

  dispose(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
