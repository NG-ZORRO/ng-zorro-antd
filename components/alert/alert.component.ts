/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ANIMATION_MODULE_TYPE,
  AnimationCallbackEvent,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { withAnimationCheck } from 'ng-zorro-antd/core/animation';
import { NzConfigKey, onConfigChangeEventForComponent, WithConfig } from 'ng-zorro-antd/core/config';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'alert';
export type NzAlertType = 'success' | 'info' | 'warning' | 'error';

@Component({
  selector: 'nz-alert',
  exportAs: 'nzAlert',
  imports: [NzIconModule, NzOutletModule],
  template: `
    @if (!closed) {
      <div
        class="ant-alert"
        [class.ant-alert-rtl]="dir === 'rtl'"
        [class.ant-alert-success]="nzType === 'success'"
        [class.ant-alert-info]="nzType === 'info'"
        [class.ant-alert-warning]="nzType === 'warning'"
        [class.ant-alert-error]="nzType === 'error'"
        [class.ant-alert-no-icon]="!nzShowIcon"
        [class.ant-alert-banner]="nzBanner"
        [class.ant-alert-closable]="nzCloseable"
        [class.ant-alert-with-description]="!!nzDescription"
        [animate.leave]="alertAnimationLeave()"
        (animate.leave)="onLeaveAnimationComplete($event)"
      >
        @if (nzShowIcon) {
          <div class="ant-alert-icon">
            @if (nzIcon) {
              <ng-container *nzStringTemplateOutlet="nzIcon"></ng-container>
            } @else {
              <nz-icon [nzType]="nzIconType || inferredIconType" [nzTheme]="iconTheme" />
            }
          </div>
        }

        @if (nzMessage || nzDescription) {
          <div class="ant-alert-content">
            @if (nzMessage) {
              <span class="ant-alert-message">
                <ng-container *nzStringTemplateOutlet="nzMessage">{{ nzMessage }}</ng-container>
              </span>
            }
            @if (nzDescription) {
              <span class="ant-alert-description">
                <ng-container *nzStringTemplateOutlet="nzDescription">{{ nzDescription }}</ng-container>
              </span>
            }
          </div>
        }

        @if (nzAction) {
          <div class="ant-alert-action">
            <ng-container *nzStringTemplateOutlet="nzAction">{{ nzAction }}</ng-container>
          </div>
        }

        @if (nzCloseable || nzCloseText) {
          <button type="button" tabindex="0" class="ant-alert-close-icon" (click)="closeAlert()">
            @if (nzCloseText) {
              <ng-container *nzStringTemplateOutlet="nzCloseText">
                <span class="ant-alert-close-text">{{ nzCloseText }}</span>
              </ng-container>
            } @else {
              <nz-icon nzType="close" />
            }
          </button>
        }
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NzAlertComponent implements OnChanges, OnInit {
  private cdr = inject(ChangeDetectorRef);
  private directionality = inject(Directionality);
  private readonly destroyRef = inject(DestroyRef);
  private readonly animationType = inject(ANIMATION_MODULE_TYPE, { optional: true });
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  @Input() nzAction: string | TemplateRef<void> | null = null;
  @Input() nzCloseText: string | TemplateRef<void> | null = null;
  @Input() nzIconType: string | null = null;
  @Input() nzMessage: string | TemplateRef<void> | null = null;
  @Input() nzDescription: string | TemplateRef<void> | null = null;
  @Input() nzType: 'success' | 'info' | 'warning' | 'error' = 'info';
  @Input({ transform: booleanAttribute }) @WithConfig() nzCloseable: boolean = false;
  @Input({ transform: booleanAttribute }) @WithConfig() nzShowIcon: boolean = false;
  @Input({ transform: booleanAttribute }) nzBanner = false;
  @Input({ transform: booleanAttribute }) nzNoAnimation = false;
  @Input() nzIcon: string | TemplateRef<void> | null = null;
  @Output() readonly nzOnClose = new EventEmitter<boolean>();
  closed = false;
  iconTheme: 'outline' | 'fill' = 'fill';
  inferredIconType: string = 'info-circle';
  dir: Direction = 'ltr';
  private isTypeSet = false;
  private isShowIconSet = false;
  protected readonly alertAnimationLeave = withAnimationCheck(() => 'ant-alert-motion-leave');

  constructor() {
    onConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME, () => this.cdr.markForCheck());
  }

  ngOnInit(): void {
    this.directionality.change?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;
  }

  closeAlert(): void {
    // Guard against multiple calls to prevent duplicate emissions
    if (this.closed) {
      return;
    }

    this.closed = true;
    // If animations are disabled (NoopAnimations or nzNoAnimation), emit immediately
    // because the animation event won't fire
    if (this.nzNoAnimation || this.animationType === 'NoopAnimations') {
      this.nzOnClose.emit(true);
    }
  }

  onLeaveAnimationComplete(event: AnimationCallbackEvent): void {
    event.animationComplete();
    // Only emit if animations are enabled (event won't fire with NoopAnimations)
    if (!this.nzNoAnimation && this.animationType !== 'NoopAnimations') {
      this.nzOnClose.emit(true);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzShowIcon, nzDescription, nzType, nzBanner } = changes;
    if (nzShowIcon) {
      this.isShowIconSet = true;
    }
    if (nzType) {
      this.isTypeSet = true;
      switch (this.nzType) {
        case 'error':
          this.inferredIconType = 'close-circle';
          break;
        case 'success':
          this.inferredIconType = 'check-circle';
          break;
        case 'info':
          this.inferredIconType = 'info-circle';
          break;
        case 'warning':
          this.inferredIconType = 'exclamation-circle';
          break;
      }
    }
    if (nzDescription) {
      this.iconTheme = this.nzDescription ? 'outline' : 'fill';
    }
    if (nzBanner) {
      if (!this.isTypeSet) {
        this.nzType = 'warning';
      }
      if (!this.isShowIconSet) {
        this.nzShowIcon = true;
      }
    }
  }
}
