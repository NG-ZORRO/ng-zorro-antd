/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { coerceElement } from '@angular/cdk/coercion';
import { CdkConnectedOverlay, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  numberAttribute,
  TemplateRef,
  viewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { overlayZIndexSetter } from 'ng-zorro-antd/core/overlay';
import { isNotNil } from 'ng-zorro-antd/core/util';

import { NzTourStep } from './types';

@Component({
  selector: 'nz-tour',
  exportAs: 'nzTour',
  imports: [NzButtonModule, CdkConnectedOverlay],
  template: `
    <ng-template
      #tourTemplate
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="currentStepTarget()!"
      [cdkConnectedOverlayOpen]="nzOpen()"
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
              <div class="ant-tour-indicators"> {{ currentStepIndex }} / {{ totalSteps() }} </div>
              <div class="ant-tour-buttons"></div>
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
  private readonly overlay = inject(Overlay);
  private readonly viewContainerRef = inject(ViewContainerRef);
  private readonly destroyRef = inject(DestroyRef);

  nzSteps = input.required<NzTourStep[]>();
  nzOpen = input(false, { transform: booleanAttribute });
  nzZIndex = input(99, { transform: numberAttribute });

  readonly tourTemplate = viewChild.required('tourTemplate', { read: TemplateRef });

  overlayRef?: OverlayRef | null;
  portal?: TemplatePortal;
  isOpen = false;
  currentStepIndex = 0;

  readonly totalSteps = computed(() => this.nzSteps().length);
  readonly currentStep = computed(() => this.nzSteps()[this.currentStepIndex]);
  readonly currentStepTarget = computed(() => {
    const target = this.currentStep().target;
    if (isNotNil(target)) {
      return coerceElement(typeof target === 'function' ? target() : target);
    }
    return null;
  });

  // constructor() {
  //   effect(() => {
  //     if (this.nzOpen()) {
  //       this.open();
  //     } else {
  //       this.close();
  //     }
  //   });
  // }

  open(): void {
    this.attachOverlay();
    this.isOpen = true;
  }

  close(): void {
    this.isOpen = false;
  }

  private attachOverlay(): void {
    if (!this.overlayRef) {
      this.portal = new TemplatePortal(this.tourTemplate(), this.viewContainerRef);
      this.overlayRef = this.overlay.create(this.getOverlayConfig());

      overlayZIndexSetter(this.overlayRef, this.nzZIndex());
    }

    if (this.overlayRef && !this.overlayRef.hasAttached()) {
      this.overlayRef.attach(this.portal);
      this.overlayRef
        .detachments()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => this.disposeOverlay());
    }
  }

  private disposeOverlay(): void {
    this.overlayRef?.dispose();
    this.overlayRef = null;
  }

  private getOverlayConfig(): OverlayConfig {
    return new OverlayConfig({
      disposeOnNavigation: true,
      positionStrategy: this.overlay.position().global(),
      scrollStrategy: this.overlay.scrollStrategies.block()
    });
  }
}
