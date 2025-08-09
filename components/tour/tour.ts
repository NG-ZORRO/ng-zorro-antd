/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { coerceElement } from '@angular/cdk/coercion';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  linkedSignal,
  numberAttribute,
  signal,
  TemplateRef,
  viewChild,
  ViewEncapsulation
} from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { isNotNil } from 'ng-zorro-antd/core/util';

import { NzTourMaskComponent } from './mask';
import { NzTourStep } from './types';

@Component({
  selector: 'nz-tour',
  exportAs: 'nzTour',
  imports: [NzButtonModule, CdkConnectedOverlay, NzTourMaskComponent],
  template: `
    <!-- Global mask overlay (attached via OverlayRef) -->
    @if (isOpen()) {
      <nz-tour-mask [target]="currentStepTarget()" />
    }

    <!-- Connected overlay for the tour panel -->
    <ng-template
      #tourTemplate
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="currentStepTarget()!"
      [cdkConnectedOverlayOpen]="isOpen()"
      (detach)="close()"
    >
      <div class="ant-tour">
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
              <div class="ant-tour-indicators"> {{ currentStepIndex() + 1 }} / {{ totalSteps() }} </div>
              <div class="ant-tour-buttons">
                <button nz-button nzType="default" (click)="prev()" [disabled]="currentStepIndex() === 0">
                  Previous
                </button>
                <button nz-button nzType="primary" (click)="next()">
                  @if (currentStepIndex() < totalSteps() - 1) {
                    Next
                  } @else {
                    Finish
                  }
                </button>
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
  nzSteps = input.required<NzTourStep[]>();
  nzOpen = input(false, { transform: booleanAttribute });
  nzZIndex = input(99, { transform: numberAttribute });

  readonly maskTemplate = viewChild.required('maskTemplate', { read: TemplateRef });
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

  close(): void {
    this.isOpen.set(false);
  }

  next(): void {
    this.currentStepIndex.update(index => (index < this.totalSteps() - 1 ? index + 1 : index));
  }

  prev(): void {
    this.currentStepIndex.update(index => (index > 0 ? index - 1 : index));
  }
}
