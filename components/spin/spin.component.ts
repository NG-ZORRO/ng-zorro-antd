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
  DestroyRef,
  signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Observable, of, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, startWith, switchMap } from 'rxjs/operators';

import { NzConfigKey, onConfigChangeEventForComponent, WithConfig } from 'ng-zorro-antd/core/config';
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
    @if (isLoading()) {
      <div>
        <div
          class="ant-spin ant-spin-spinning"
          [class.ant-spin-rtl]="dir === 'rtl'"
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
      <div class="ant-spin-container" [class.ant-spin-blur]="isLoading()">
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

  readonly isLoading = signal(false);

  dir: Direction = 'ltr';

  constructor() {
    onConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME, () => this.cdr.markForCheck());
  }

  ngOnInit(): void {
    this.delay$
      .pipe(
        startWith(this.nzDelay),
        distinctUntilChanged(),
        switchMap(delay =>
          // This construct is used to reduce RxJS dependencies.
          // It previously used `debounce(() => timer())`, but consumers may not
          // use these RxJS functions at all, causing them to still be bundled
          // into the main bundle unnecessarily.
          this.spinning$.pipe(
            switchMap(spinning => {
              if (delay === 0 || !spinning) {
                return of(spinning);
              }
              return new Observable<boolean>(subscriber => {
                const timeoutId = setTimeout(() => subscriber.next(spinning), delay);
                return () => clearTimeout(timeoutId);
              });
            })
          )
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(isLoading => {
        this.isLoading.set(isLoading);
      });

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
