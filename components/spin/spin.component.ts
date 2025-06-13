/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation,
  booleanAttribute,
  numberAttribute,
  inject,
  DestroyRef
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, ReplaySubject, timer } from 'rxjs';
import { debounce, distinctUntilChanged, startWith, switchMap } from 'rxjs/operators';

import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { NzSafeAny, NzSizeLDSType } from 'ng-zorro-antd/core/types';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'spin';

@Component({
  selector: 'nz-spin',
  exportAs: 'nzSpin',
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
    @if (isLoading) {
      <div>
        <div
          class="ant-spin"
          [class.ant-spin-rtl]="dir === 'rtl'"
          [class.ant-spin-spinning]="isLoading"
          [class.ant-spin-lg]="nzSize === 'large'"
          [class.ant-spin-sm]="nzSize === 'small'"
          [class.ant-spin-show-text]="nzTip"
        >
          <ng-template [ngTemplateOutlet]="nzIndicator || defaultTemplate"></ng-template>
          @if (nzTip) {
            <div class="ant-spin-text">{{ nzTip }}</div>
          }
        </div>
      </div>
    }
    @if (!nzSimple) {
      <div class="ant-spin-container" [class.ant-spin-blur]="isLoading">
        <ng-content></ng-content>
      </div>
    }
  `,
  host: {
    '[class.ant-spin-nested-loading]': '!nzSimple'
  },
  imports: [NgTemplateOutlet]
})
export class NzSpinComponent implements OnChanges, OnInit {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  nzConfigService = inject(NzConfigService);
  private cdr = inject(ChangeDetectorRef);
  private directionality = inject(Directionality);
  private destroyRef = inject(DestroyRef);

  @Input() @WithConfig() nzIndicator: TemplateRef<NzSafeAny> | null = null;
  @Input() nzSize: NzSizeLDSType = 'default';
  @Input() nzTip: string | null = null;
  @Input({ transform: numberAttribute }) nzDelay = 0;
  @Input({ transform: booleanAttribute }) nzSimple = false;
  @Input({ transform: booleanAttribute }) nzSpinning = true;
  private spinning$ = new BehaviorSubject(this.nzSpinning);
  private delay$ = new ReplaySubject<number>(1);
  isLoading = false;
  dir: Direction = 'ltr';

  ngOnInit(): void {
    this.delay$
      .pipe(
        startWith(this.nzDelay),
        distinctUntilChanged(),
        switchMap(delay =>
          delay === 0 ? this.spinning$ : this.spinning$.pipe(debounce(spinning => timer(spinning ? delay : 0)))
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(loading => {
        this.isLoading = loading;
        this.cdr.markForCheck();
      });
    this.nzConfigService
      .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.cdr.markForCheck());

    this.directionality.change?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(direction => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;
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
}
