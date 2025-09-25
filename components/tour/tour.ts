/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzI18nPipe } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzTourRef } from './tour-ref';
import { DEFAULT_PLACEMENT } from './tour.service';
import { NzTourPlacement, NzTourTemplateContext } from './types';

@Component({
  selector: 'nz-tour',
  imports: [NgTemplateOutlet, NzButtonModule, NzIconModule, NzI18nPipe],
  template: `
    <div class="ant-tour-arrow"></div>
    <div class="ant-tour-content">
      <div class="ant-tour-inner">
        <button type="button" class="ant-tour-close" aria-label="close" (click)="close()">
          <nz-icon nzType="close" class="ant-tour-close-icon" />
        </button>

        @if (currentStep().cover; as cover) {
          <div class="ant-tour-cover">
            <img alt="tour.png" [attr.src]="cover" />
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
            @if (nzIndicatorsRender(); as indicatorsRender) {
              <ng-container
                *ngTemplateOutlet="indicatorsRender; context: { current: currentStepIndex(), total: totalSteps }"
              >
              </ng-container>
            } @else {
              @for (_ of tourRef.steps; track $index) {
                <div class="ant-tour-indicator" [class.ant-tour-indicator-active]="currentStepIndex() === $index"></div>
              }
            }
          </div>
          <div class="ant-tour-buttons">
            @if (currentStepIndex() > 0) {
              <button nz-button nzSize="small" nzType="default" (click)="prev()" [disabled]="currentStepIndex() === 0">
                {{ 'Tour.prevStepText' | nzI18n }}
              </button>
            }
            @if (currentStepIndex() < totalSteps - 1) {
              <button nz-button nzSize="small" nzType="primary" (click)="next()">
                {{ 'Tour.nextStepText' | nzI18n }}
              </button>
            } @else {
              <button nz-button nzSize="small" nzType="primary" (click)="close()">
                {{ 'Tour.finishText' | nzI18n }}
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ant-tour',
    '[class.ant-tour-placement-bottom]': "nzPlacement() === 'bottom'",
    '[class.ant-tour-placement-top]': "nzPlacement() === 'top'",
    '[class.ant-tour-placement-left]': "nzPlacement() === 'left'",
    '[class.ant-tour-placement-right]': "nzPlacement() === 'right'"
  }
})
export class NzTourComponent {
  protected readonly tourRef = inject(NzTourRef);

  nzIndicatorsRender = input<TemplateRef<NzTourTemplateContext>>();
  nzPlacement = input<NzTourPlacement>(DEFAULT_PLACEMENT);
  readonly nzClose = output<void>();

  protected readonly totalSteps = this.tourRef.steps.length;
  protected readonly currentStepIndex = this.tourRef.current.asReadonly();
  protected readonly currentStep = this.tourRef.currentStep;

  close(): void {
    this.tourRef.close();
    // Emit close event
    this.nzClose.emit();
  }

  next(): void {
    this.tourRef.next();
  }

  prev(): void {
    this.tourRef.prev();
  }
}
