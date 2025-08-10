/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { coerceElement } from '@angular/cdk/coercion';
import { CdkConnectedOverlay, ConnectedOverlayPositionChange, ConnectedPosition } from '@angular/cdk/overlay';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  linkedSignal,
  numberAttribute,
  output,
  signal,
  TemplateRef,
  viewChild,
  ViewEncapsulation
} from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzOverlayModule } from 'ng-zorro-antd/core/overlay';
import { isNotNil } from 'ng-zorro-antd/core/util';

import { NzTourService } from './tour.service';
import { NzTourStep } from './types';

@Component({
  selector: 'nz-tour',
  exportAs: 'nzTour',
  imports: [NzButtonModule, CdkConnectedOverlay, NzOverlayModule],
  template: `
    <!-- Connected overlay for the tour panel -->
    <ng-template
      #tourTemplate
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="currentStepTarget()!"
      [cdkConnectedOverlayOpen]="isOpen()"
      [cdkConnectedOverlayPositions]="positions"
      [cdkConnectedOverlayPush]="true"
      (positionChange)="onPositionChange($event)"
      (detach)="close()"
      nzConnectedOverlay
      [nzZIndex]="nzZIndex()"
    >
      <div
        class="ant-tour"
        [style.zIndex]="nzZIndex()"
        [class.ant-tour-placement-bottom]="placement() === 'bottom'"
        [class.ant-tour-placement-top]="placement() === 'top'"
        [class.ant-tour-placement-left]="placement() === 'left'"
        [class.ant-tour-placement-right]="placement() === 'right'"
      >
        <div class="ant-tour-arrow"></div>
        <div class="ant-tour-content">
          <div class="ant-tour-inner">
            @if (currentStep().cover; as cover) {
              <div class="ant-tour-cover">
                <img alt="tour" [attr.src]="cover" />
              </div>
            }

            <div class="ant-tour-header">
              <div class="ant-tour-title">{{ currentStep().title }}</div>
            </div>
            <div class="ant-tour-description">
              {{ currentStep().description }}
            </div>
            <div class="ant-tour-footer">
              <div class="ant-tour-indicators">
                @for (item of nzSteps(); let index = $index; track item) {
                  <div
                    class="ant-tour-indicator"
                    [class.ant-tour-indicator-active]="currentStepIndex() === index"
                  ></div>
                }
              </div>
              <div class="ant-tour-buttons">
                @if (currentStepIndex() > 0) {
                  <button nz-button nzType="default" (click)="prev()" [disabled]="currentStepIndex() === 0">
                    Previous
                  </button>
                }
                @if (currentStepIndex() < totalSteps() - 1) {
                  <button nz-button nzType="primary" (click)="next()">Next</button>
                } @else {
                  <button nz-button nzType="primary" (click)="close()">Finish</button>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NzTourComponent {
  // ====== Separate Mask Overlay management ======
  private readonly tourService = inject(NzTourService);

  nzSteps = input.required<NzTourStep[]>();
  nzOpen = input(false, { transform: booleanAttribute });
  nzZIndex = input(1001, { transform: numberAttribute });
  readonly nzClose = output<void>();

  readonly tourTemplate = viewChild.required('tourTemplate', { read: TemplateRef });

  readonly isOpen = linkedSignal(this.nzOpen);
  readonly totalSteps = computed(() => this.nzSteps().length);
  readonly currentStepIndex = signal(0);
  readonly currentStep = computed(() => this.nzSteps()[this.currentStepIndex()]);
  readonly currentStepTarget = computed(() => {
    const target = this.currentStep().target;
    if (isNotNil(target)) {
      return coerceElement(typeof target === 'function' ? target() : target);
    }
    return null;
  });

  // Positioning and placement state
  readonly positions: ConnectedPosition[] = [
    // Below target (default)
    { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: 8 },
    // Above target
    { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY: -8 },
    // Right side
    { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: 8 },
    // Left side
    { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -8 }
  ];
  readonly placement = signal<'bottom' | 'top' | 'left' | 'right'>('bottom');

  constructor() {
    // Attach or detach mask overlay when open state or zIndex changes
    effect(() => {
      const open = this.isOpen();
      const zIndex = this.nzZIndex();
      const target = this.currentStepTarget();
      if (open) {
        this.tourService.attachOrUpdateMask(zIndex, target);
      } else {
        this.tourService.detachMask();
      }
    });
  }

  protected onPositionChange(position: ConnectedOverlayPositionChange): void {
    const { originX, originY, overlayX, overlayY } = position.connectionPair;
    if (overlayY === 'top' && originY === 'bottom') {
      this.placement.set('bottom');
    } else if (overlayY === 'bottom' && originY === 'top') {
      this.placement.set('top');
    } else if (overlayX === 'start' && originX === 'end') {
      this.placement.set('right');
    } else if (overlayX === 'end' && originX === 'start') {
      this.placement.set('left');
    }
  }

  close(): void {
    this.isOpen.set(false);
    // reset current step index to 0
    this.currentStepIndex.set(0);
    // Detach mask overlay if it exists
    this.tourService.detachMask();
    // Emit close event
    this.nzClose.emit();
  }

  next(): void {
    this.currentStepIndex.update(index => (index < this.totalSteps() - 1 ? index + 1 : index));
  }

  prev(): void {
    this.currentStepIndex.update(index => (index > 0 ? index - 1 : index));
  }
}
