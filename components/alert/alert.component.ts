/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { slideAlertMotion } from 'ng-zorro-antd/core/animation';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const NZ_CONFIG_COMPONENT_NAME = 'alert';

@Component({
  selector: 'nz-alert',
  exportAs: 'nzAlert',
  animations: [slideAlertMotion],
  template: `
    <div
      *ngIf="!closed"
      class="ant-alert"
      [class.ant-alert-success]="nzType === 'success'"
      [class.ant-alert-info]="nzType === 'info'"
      [class.ant-alert-warning]="nzType === 'warning'"
      [class.ant-alert-error]="nzType === 'error'"
      [class.ant-alert-no-icon]="!nzShowIcon"
      [class.ant-alert-banner]="nzBanner"
      [class.ant-alert-closable]="nzCloseable"
      [class.ant-alert-with-description]="!!nzDescription"
      [@.disabled]="nzNoAnimation"
      [@slideAlertMotion]
      (@slideAlertMotion.done)="onFadeAnimationDone()"
    >
      <ng-container *ngIf="nzShowIcon">
        <i nz-icon class="ant-alert-icon" [nzType]="nzIconType || inferredIconType" [nzTheme]="iconTheme"></i>
      </ng-container>
      <span class="ant-alert-message" *ngIf="nzMessage">
        <ng-container *nzStringTemplateOutlet="nzMessage">{{ nzMessage }}</ng-container>
      </span>
      <span class="ant-alert-description" *ngIf="nzDescription">
        <ng-container *nzStringTemplateOutlet="nzDescription">{{ nzDescription }}</ng-container>
      </span>
      <button type="button" tabindex="0" *ngIf="nzCloseable || nzCloseText" class="ant-alert-close-icon" (click)="closeAlert()">
        <ng-template #closeDefaultTemplate>
          <i nz-icon nzType="close"></i>
        </ng-template>
        <ng-container *ngIf="nzCloseText; else closeDefaultTemplate">
          <ng-container *nzStringTemplateOutlet="nzCloseText">
            <span class="ant-alert-close-text">{{ nzCloseText }}</span>
          </ng-container>
        </ng-container>
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false
})
export class NzAlertComponent implements OnChanges, OnDestroy {
  static ngAcceptInputType_nzCloseable: BooleanInput;
  static ngAcceptInputType_nzShowIcon: BooleanInput;
  static ngAcceptInputType_nzBanner: BooleanInput;
  static ngAcceptInputType_nzNoAnimation: BooleanInput;

  @Input() nzCloseText: string | TemplateRef<void> | null = null;
  @Input() nzIconType: string | null = null;
  @Input() nzMessage: string | TemplateRef<void> | null = null;
  @Input() nzDescription: string | TemplateRef<void> | null = null;
  @Input() nzType: 'success' | 'info' | 'warning' | 'error' = 'info';
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME) @InputBoolean() nzCloseable: boolean = false;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME) @InputBoolean() nzShowIcon: boolean = false;
  @Input() @InputBoolean() nzBanner = false;
  @Input() @InputBoolean() nzNoAnimation = false;
  @Output() readonly nzOnClose = new EventEmitter<boolean>();
  closed = false;
  iconTheme: 'outline' | 'fill' = 'fill';
  inferredIconType: string = 'info-circle';
  private isTypeSet = false;
  private isShowIconSet = false;
  private destroy$ = new Subject();

  constructor(public nzConfigService: NzConfigService, private cdr: ChangeDetectorRef) {
    this.nzConfigService
      .getConfigChangeEventForComponent(NZ_CONFIG_COMPONENT_NAME)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.cdr.markForCheck();
      });
  }

  closeAlert(): void {
    this.closed = true;
  }

  onFadeAnimationDone(): void {
    if (this.closed) {
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
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
