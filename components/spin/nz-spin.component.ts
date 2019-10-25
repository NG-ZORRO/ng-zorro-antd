/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
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
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { InputBoolean, InputNumber, NzConfigService, NzSizeLDSType, WithConfig } from 'ng-zorro-antd/core';

const NZ_CONFIG_COMPONENT_NAME = 'spin';

@Component({
  selector: 'nz-spin',
  exportAs: 'nzSpin',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './nz-spin.component.html',
  host: {
    '[class.ant-spin-nested-loading]': '!nzSimple'
  },
  styles: [
    `
      nz-spin {
        display: block;
      }
    `
  ]
})
export class NzSpinComponent implements OnChanges, OnDestroy, OnInit {
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME) nzIndicator: TemplateRef<void>;
  @Input() nzSize: NzSizeLDSType = 'default';
  @Input() nzTip: string;
  @Input() @InputNumber() nzDelay = 0;
  @Input() @InputBoolean() nzSimple = false;
  @Input() @InputBoolean() nzSpinning = true;
  loading = true;
  private destroy$ = new Subject<void>();
  private spinning$ = new BehaviorSubject(this.nzSpinning);
  private loading$: Observable<boolean> = this.spinning$.pipe(debounceTime(this.nzDelay));
  private loading_: Subscription | null;

  subscribeLoading(): void {
    this.unsubscribeLoading();
    this.loading_ = this.loading$.subscribe(data => {
      this.loading = data;
      this.cdr.markForCheck();
    });
  }

  unsubscribeLoading(): void {
    if (this.loading_) {
      this.loading_.unsubscribe();
      this.loading_ = null;
    }
  }

  constructor(public nzConfigService: NzConfigService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.subscribeLoading();

    this.nzConfigService
      .getConfigChangeEventForComponent(NZ_CONFIG_COMPONENT_NAME)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.cdr.markForCheck());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzSpinning) {
      if (changes.nzSpinning.isFirstChange()) {
        this.loading = this.nzSpinning;
      }
      this.spinning$.next(this.nzSpinning);
    }
    if (changes.nzDelay) {
      this.loading$ = this.spinning$.pipe(debounceTime(this.nzDelay));
      this.subscribeLoading();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.unsubscribeLoading();
  }
}
