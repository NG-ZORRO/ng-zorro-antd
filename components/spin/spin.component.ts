/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { BooleanInput, NumberInput, NzSafeAny, NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { InputBoolean, InputNumber } from 'ng-zorro-antd/core/util';

import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, flatMap, takeUntil } from 'rxjs/operators';

const NZ_CONFIG_COMPONENT_NAME = 'spin';

@Component({
  selector: 'nz-spin',
  exportAs: 'nzSpin',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-template #defaultTemplate>
      <span class="ant-spin-dot ant-spin-dot-spin">
        <i class="ant-spin-dot-item"></i>
        <i class="ant-spin-dot-item"></i>
        <i class="ant-spin-dot-item"></i>
        <i class="ant-spin-dot-item"></i>
      </span>
    </ng-template>
    <div *ngIf="isLoading">
      <div
        class="ant-spin"
        [class.ant-spin-spinning]="isLoading"
        [class.ant-spin-lg]="nzSize === 'large'"
        [class.ant-spin-sm]="nzSize === 'small'"
        [class.ant-spin-show-text]="nzTip"
      >
        <ng-template [ngTemplateOutlet]="nzIndicator || defaultTemplate"></ng-template>
        <div class="ant-spin-text" *ngIf="nzTip">{{ nzTip }}</div>
      </div>
    </div>
    <div *ngIf="!nzSimple" class="ant-spin-container" [class.ant-spin-blur]="isLoading">
      <ng-content></ng-content>
    </div>
  `,
  host: {
    '[class.ant-spin-nested-loading]': '!nzSimple'
  }
})
export class NzSpinComponent implements OnChanges, OnDestroy, OnInit {
  static ngAcceptInputType_nzDelay: NumberInput;
  static ngAcceptInputType_nzSimple: BooleanInput;
  static ngAcceptInputType_nzSpinning: BooleanInput;

  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME) nzIndicator: TemplateRef<NzSafeAny> | null = null;
  @Input() nzSize: NzSizeLDSType = 'default';
  @Input() nzTip: string | null = null;
  @Input() @InputNumber() nzDelay = 0;
  @Input() @InputBoolean() nzSimple = false;
  @Input() @InputBoolean() nzSpinning = true;
  private destroy$ = new Subject<void>();
  private spinning$ = new BehaviorSubject(this.nzSpinning);
  private delay$ = new BehaviorSubject(this.nzDelay);
  isLoading = true;

  constructor(public nzConfigService: NzConfigService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const loading$ = this.spinning$.pipe(
      flatMap(() => this.delay$),
      flatMap(delay => {
        if (delay === 0) {
          return this.spinning$;
        } else {
          return this.spinning$.pipe(debounceTime(delay));
        }
      }),
      takeUntil(this.destroy$)
    );
    loading$.subscribe(loading => {
      this.isLoading = loading;
      this.cdr.markForCheck();
    });
    this.nzConfigService
      .getConfigChangeEventForComponent(NZ_CONFIG_COMPONENT_NAME)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.cdr.markForCheck());
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzSpinning, nzDelay } = changes;
    if (nzSpinning) {
      this.spinning$.next(this.nzSpinning);
    }
    if (nzDelay) {
      this.delay$.next(this.nzDelay);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
