/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { slideAlertMotion } from 'ng-zorro-antd/core/animation';
import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'alert';

@Component({
  selector: 'nz-alert',
  exportAs: 'nzAlert',
  animations: [slideAlertMotion],
  template: `
    <div
      *ngIf="!closed"
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
      [@.disabled]="nzNoAnimation"
      [@slideAlertMotion]
      (@slideAlertMotion.done)="onFadeAnimationDone()"
    >
      <div *ngIf="nzShowIcon" class="ant-alert-icon">
        <ng-container *ngIf="nzIcon; else iconDefaultTemplate">
          <ng-container *nzStringTemplateOutlet="nzIcon"></ng-container>
        </ng-container>
        <ng-template #iconDefaultTemplate>
          <span nz-icon [nzType]="nzIconType || inferredIconType" [nzTheme]="iconTheme"></span>
        </ng-template>
      </div>
      <div class="ant-alert-content" *ngIf="nzMessage || nzDescription">
        <span class="ant-alert-message" *ngIf="nzMessage">
          <ng-container *nzStringTemplateOutlet="nzMessage">{{ nzMessage }}</ng-container>
        </span>
        <span class="ant-alert-description" *ngIf="nzDescription">
          <ng-container *nzStringTemplateOutlet="nzDescription">{{ nzDescription }}</ng-container>
        </span>
      </div>
      <div class="ant-alert-action" *ngIf="nzAction">
        <ng-container *nzStringTemplateOutlet="nzAction">{{ nzAction }}</ng-container>
      </div>
      <button
        type="button"
        tabindex="0"
        *ngIf="nzCloseable || nzCloseText"
        class="ant-alert-close-icon"
        (click)="closeAlert()"
      >
        <ng-template #closeDefaultTemplate>
          <span nz-icon nzType="close"></span>
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
export class NzAlertComponent implements OnChanges, OnDestroy, OnInit {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;
  static ngAcceptInputType_nzCloseable: BooleanInput;
  static ngAcceptInputType_nzShowIcon: BooleanInput;
  static ngAcceptInputType_nzBanner: BooleanInput;
  static ngAcceptInputType_nzNoAnimation: BooleanInput;

  @Input() nzAction: string | TemplateRef<void> | null = null;
  @Input() nzCloseText: string | TemplateRef<void> | null = null;
  @Input() nzIconType: string | null = null;
  @Input() nzMessage: string | TemplateRef<void> | null = null;
  @Input() nzDescription: string | TemplateRef<void> | null = null;
  @Input() nzType: 'success' | 'info' | 'warning' | 'error' = 'info';
  @Input() @WithConfig() @InputBoolean() nzCloseable: boolean = false;
  @Input() @WithConfig() @InputBoolean() nzShowIcon: boolean = false;
  @Input() @InputBoolean() nzBanner = false;
  @Input() @InputBoolean() nzNoAnimation = false;
  @Input() nzIcon: string | TemplateRef<void> | null = null;
  @Output() readonly nzOnClose = new EventEmitter<boolean>();
  closed = false;
  iconTheme: 'outline' | 'fill' = 'fill';
  inferredIconType: string = 'info-circle';
  dir: Direction = 'ltr';
  private isTypeSet = false;
  private isShowIconSet = false;
  private destroy$ = new Subject();

  constructor(
    public nzConfigService: NzConfigService,
    private cdr: ChangeDetectorRef,
    @Optional() private directionality: Directionality
  ) {
    this.nzConfigService
      .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.cdr.markForCheck();
      });
  }

  ngOnInit(): void {
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;
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
