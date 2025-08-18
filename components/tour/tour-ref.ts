/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { coerceElement } from '@angular/cdk/coercion';
import { FlexibleConnectedPositionStrategyOrigin } from '@angular/cdk/overlay';
import { computed, signal, WritableSignal } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { isNotNil, scrollIntoView } from 'ng-zorro-antd/core/util';

import { DEFAULT_PLACEMENT, NzTourService } from './tour.service';
import {
  NZ_TOUR_MASK_GAP_DEFAULT,
  NzTourMaskGap,
  NzTourOptions,
  NzTourPlacement,
  NzTourStep,
  TourPlacements
} from './types';
import { isInViewport } from './utils';

export class NzTourRef {
  steps!: NzTourStep[];
  zIndex: number = 1001;
  mask: boolean = true;
  gap: NzTourMaskGap;
  placement: NzTourPlacement = DEFAULT_PLACEMENT;

  private readonly destroy$ = new Subject<void>();

  // ====== Tour Step State ======

  currentStepIndex!: WritableSignal<number>;
  readonly currentStep = computed(() => this.steps[this.currentStepIndex()]);
  readonly currentStepTarget$ = new ReplaySubject<FlexibleConnectedPositionStrategyOrigin | null>(1);
  currentPlacement: NzTourPlacement = DEFAULT_PLACEMENT;

  constructor(
    private readonly tourService: NzTourService,
    readonly options: NzTourOptions
  ) {
    const { steps, zIndex = 1001, mask = true, gap, placement = DEFAULT_PLACEMENT } = options;
    this.steps = steps;
    this.zIndex = zIndex;
    this.mask = mask;
    this.placement = placement;
    this.gap = { ...NZ_TOUR_MASK_GAP_DEFAULT, ...gap };
  }

  private subscribeTargetChange(): void {
    this.currentStepTarget$.pipe(takeUntil(this.destroy$)).subscribe(target => {
      if (target) {
        const targetEl = coerceElement(target);
        if (!isInViewport(targetEl)) {
          scrollIntoView(targetEl);
        }
      }
      this.tourService.attachOrUpdateStep(target, this);
    });
  }

  protected loadStep(index: number = this.currentStepIndex()): void {
    const step = this.steps[index];
    const target = this.getOriginTarget();

    this.currentPlacement = this.normalizePlacement(step.placement, step.target);
    if (this.mask) {
      this.tourService.attachOrUpdateMask(target, { zIndex: this.zIndex });
    }

    this.currentStepTarget$.next(target);
  }

  start(): void {
    this.currentStepIndex = signal(0);
    this.loadStep();
    this.subscribeTargetChange();
  }

  next(): void {
    this.currentStepIndex.update(index => (index < this.steps.length - 1 ? index + 1 : index));
    this.loadStep();
  }

  prev(): void {
    this.currentStepIndex.update(index => (index > 0 ? index - 1 : index));
    this.loadStep();
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
    this.tourService.dispose();
  }
}
